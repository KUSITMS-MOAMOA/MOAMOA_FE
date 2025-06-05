import { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DetailModal } from '@components/common/modal/DetailModal';
import * as S from './MemoPage.Style';
import { getFormattedDate } from '@/utils/dateUtils';
import { Button } from '@/components/common/button/Button';
import { FolderPopUp } from '@/components/common/popup/FolderPopUp';
import BackIcon from '@icons/ArrowIcon.svg';
import FolderIcon from '@icons/AddFolderIcon.svg';
import MemoPageIcon from '@/assets/icons/MemoPageIcon.png';
import { CategoryChip } from '@/components/common/chip/CategoryChip';
import { FolderListProps } from '@/types/Folder';
import { postRecord } from '@/api/Record';
import { getFolders } from '@/api/Folder';
import { getMemo, getTempMemo, postTempMemo } from '@/api/Memo';
import ToastMessage from '@/components/chat/ToastMessage';
import { LoadingScreen } from '@/components/common/loading/LoadingScreen';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { AxiosError } from 'axios';
import { useOutletContext } from 'react-router-dom';
import { useValidatePathId } from '@/hooks/useValidatePathId';
import { InfoButton } from '@/components/memo/InfoButton';

interface FolderType {
  folderId: number;
  title: string;
}

export const MemoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [folders, setFolders] = useState<FolderListProps[]>([]);
  const [tempMemo, setTempMemo] = useState({
    title: '',
    category: '',
    folderId: 0,
    memo: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [showTempDataModal, setShowTempDataModal] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [contentWarning, setContentWarning] = useState<string>('');
  const [titleWarning, setTitleWarning] = useState<string>('');
  const [reviewFolder, setReviewFolder] = useState<FolderType | null>(null);
  const [isLoading, setIsLocalLoading] = useState(false);
  const { setIsLoading } = useOutletContext<{ setIsLoading: (loading: boolean) => void }>();
  const isPC = useMediaQuery('(min-width: 1048px)');
  const isReviewMode = window.location.pathname.startsWith('/review-memo');
  useValidatePathId(isReviewMode);

  useEffect(() => {
    if (!isBottomSheetOpen) {
      const fetchFolders = async () => {
        const folderList = await getFolders();
        if (folderList) {
          setFolders(folderList);
        }
      };
      fetchFolders();
    }

    const fetchTempMemo = async () => {
      try {
        if (isReviewMode) return;

        const tempMemoData = await getTempMemo();
        if (tempMemoData.isExist) {
          setTempMemo({
            title: tempMemoData.title || '',
            category: '',
            folderId: 0,
            memo: tempMemoData.content || '',
          });
          setShowTempDataModal(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTempMemo();

    if (location.state?.memoData) {
      const memoData = location.state.memoData;
      setTempMemo({
        title: memoData.title || '',
        category: '',
        folderId: memoData.folderId || 0,
        memo: memoData.content || '',
      });

      const fetchMemoFolder = async () => {
        try {
          const memoDetails = await getMemo(location.state.memoData.recordId);
          if (memoDetails) {
            setReviewFolder({
              folderId: memoDetails.folderId,
              title: memoDetails.folder,
            });
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchMemoFolder();
    }
  }, [isBottomSheetOpen, location.state, isReviewMode]);

  const handleBackButton = () => {
    if (isReviewMode) {
      navigate(-1);
    } else if ((tempMemo.title || getFormattedDate()) && tempMemo.memo) {
      setShowModal(true);
    } else {
      navigate(-1);
    }
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTempMemo((prev) => ({ ...prev, title: newTitle }));

    if (newTitle.length > 49) {
      setTitleWarning('50자 이하로 입력해주세요.');
    } else {
      setTitleWarning('');
    }
  };

  const handleChangeCategory = (category: string, folder?: FolderType) => {
    if (!folder) {
      setIsBottomSheetOpen(true);
      return;
    }
    setTempMemo((prev) => ({
      ...prev,
      category,
      folderId: folder.folderId,
    }));
  };

  const handleFolderPopUpClose = (newFolder?: { folderId: number; title: string }) => {
    setIsBottomSheetOpen(false);

    if (newFolder) {
      setTempMemo((prev) => ({
        ...prev,
        category: newFolder.title,
        folderId: newFolder.folderId,
      }));

      const fetchFolders = async () => {
        const folderList = await getFolders();
        if (folderList) {
          setFolders(folderList);
        }
      };
      fetchFolders();
    }
  };

  const handleChangeMemo = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newMemo = e.target.value;
    if (newMemo.length > 1000) {
      return;
    }
    setTempMemo((prev) => ({ ...prev, memo: newMemo }));

    if (newMemo.length < 50) {
      setContentWarning('50자 이상 입력해주세요.');
      return;
    } else {
      setContentWarning('');
    }
  };

  const handleSaveButton = async () => {
    try {
      setIsLocalLoading(true);
      setIsLoading(true);

      const response = await postRecord({
        title: tempMemo.title || getFormattedDate(),
        content: tempMemo.memo,
        folderId: tempMemo.folderId,
        recordType: 'MEMO',
      });

      if (response) {
        const id = response.data.analysisDto.analysisId;
        clearTempMemo();
        navigate(`/report/${id}`);
      }
      if (!tempMemo.memo) {
        alert('내용을 입력해주세요.');
        return;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorCode = error.response?.data?.code || 'UNKNOWN_ERROR';

        switch (errorCode) {
          case 'E0500_OVERFLOW_COMMENT':
          case 'E0500_OVERFLOW_KEYWORD_CONTENT':
          case 'E500_INVALID_ANALYSIS': {
            console.log('재시도 준비 중');
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log('재시도 시작');
            const retryResponse = await postRecord({
              title: tempMemo.title || getFormattedDate(),
              content: tempMemo.memo,
              folderId: tempMemo.folderId,
              recordType: 'MEMO',
            });
            if (retryResponse) {
              const id = retryResponse.data.analysisDto.analysisId;
              console.log('postRecord 재요청 성공');
              clearTempMemo();
              navigate(`/report/${id}`);
            }
            break;
          }
          case 'E0400_NO_RECORD': {
            const nickname = localStorage.getItem('nickname');
            alert(`경험을 분석하기에 내용이 충분하지 않아요. ${nickname}님의 행동을 자세히 작성해주세요!`);
            break;
          }
          default:
            alert('기록 저장 중 오류가 발생했습니다.');
            console.error(error);
        }
      } else {
        alert('알 수 없는 오류가 발생했습니다.');
        console.error('AxiosError가 아닌 에러:', error);
      }
    } finally {
      setIsLocalLoading(false);
      setIsLoading(false);
    }
  };

  const saveTempMemo = async () => {
    if (tempMemo.memo.length < 50) {
      alert('내용은 최소 50자 이상 입력해야 임시 저장할 수 있습니다.');
      return;
    }
    try {
      await postTempMemo(tempMemo.title || getFormattedDate(), tempMemo.memo);
      setShowModal(false);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const clearTempMemo = () => {
    setTempMemo({ title: '', category: '', folderId: 0, memo: '' });
    setShowModal(false);
    navigate('/');
  };

  const handleNewMemo = () => {
    setTempMemo({ title: '', category: '', folderId: 0, memo: '' });
    setShowTempDataModal(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const isSaveDisabled = !tempMemo.memo || tempMemo.memo.length < 50 || tempMemo.folderId === 0;

  return (
    <>
      {isLoading ? (
        <LoadingScreen labelText="모아모아가 경험을 정리하고 있어요" />
      ) : (
        <S.PageContainer>
          <S.Container $isReviewMode={isReviewMode} $isPC={isPC}>
            <S.HeaderContainer>
              <S.BackButton onClick={handleBackButton} type="button">
                <img src={BackIcon} alt="뒤로가기" />
              </S.BackButton>
              <S.TitleContainer>
                <S.Title>간편하고 빠르게</S.Title>
                <S.SubTitle>메모기록</S.SubTitle>
              </S.TitleContainer>
              {isPC && (
                <S.HeaderIcon >
                  <img src={MemoPageIcon} alt="메모 헤더 아이콘" />
                </S.HeaderIcon>
              )}
            </S.HeaderContainer>

            <S.Form onSubmit={handleSubmit} $isReviewMode={isReviewMode} $isPC={isPC}>

              <S.ContentWrapper>
                <S.InputTitle
                  placeholder={getFormattedDate()}
                  value={tempMemo.title}
                  onChange={handleChangeTitle}
                  maxLength={50}
                  isError={!!titleWarning}
                  disabled={isReviewMode}
                />
                <S.WarningCountContainer>
                  {titleWarning && <S.Warning>{titleWarning}</S.Warning>}
                </S.WarningCountContainer>
                <S.Line />
                <S.InfoButtonWrapper>
                  <InfoButton
                    content={
                      <>
                        <p>✏️ 어떤 경험을 했나요?</p>
                        <p>마주한 상황과 문제를 해결하기 위한 과정을 적어보세요.</p>
                        <br />
                        <p>📌 이런 내용이 포함되면 좋아요!</p>
                        <ul>
                          <li>- 주어진 목표</li>
                          <li>- 문제를 해결하기 위한 노력과 결과</li>
                        </ul>
                        <br />
                        <p>📑 작성 예시:</p>
                        <p>
                          캡스톤 디자인 프로젝트 기획안 발표를 했다. 나는 기획 파트를 담당해서 서비스 IA 구조를 정리하고 플로우 차트를 그렸다. 각 단계에서 유저가 어떻게 행동할지 예상하며 꼼꼼하게 확인했다. 그리고 교수님께 서비스 흐름을 이해하기 쉽다는 피드백을 받았다.
                        </p>
                      </>
                    }
                    $isPc={isPC}
                  />
                </S.InfoButtonWrapper>
                <S.Content
                  $isPC={isPC}
                  $isReviewMode={isReviewMode}
                  placeholder={`어떤 상황에서 무엇을 했나요? 결과는 어땠나요?\n\n일단 기록해 보세요!\n음성으로 입력하거나 오타를 내도 괜찮아요.\n모아모아가 알아서 정리해드려요.`}
                  value={tempMemo.memo}
                  onChange={handleChangeMemo}
                  maxLength={1000}
                  disabled={isReviewMode}
                />
                <S.WarningCountContainer>
                  {contentWarning && <S.Warning>{contentWarning}</S.Warning>}
                  {!isReviewMode && <S.Count>{tempMemo.memo.length}/1000</S.Count>}
                </S.WarningCountContainer>
                <S.Line />
              </S.ContentWrapper>

              <S.Label $isReviewMode={isReviewMode} $isPC={isPC}>경험 폴더를 선택해주세요</S.Label>

              <S.CategoryContainer>
                {!isReviewMode &&
                  folders.map((folder) => (
                    <CategoryChip
                      key={folder.folderId}
                      children={folder.title}
                      isSelected={tempMemo.category === folder.title}
                      onClick={() => handleChangeCategory(folder.title, folder)}
                    />
                  ))}
                {!isReviewMode && (
                  <CategoryChip onClick={() => handleChangeCategory('', undefined)} isSelected={false}>
                    <img src={FolderIcon} alt="changeFolder" />
                  </CategoryChip>
                )}
                {isReviewMode && reviewFolder && (
                  <CategoryChip
                    key={reviewFolder.folderId}
                    children={reviewFolder.title}
                    isSelected={true}
                  />
                )}
              </S.CategoryContainer>

              {!isReviewMode && (
                <S.ButtonWrapper $isReviewMode={isReviewMode} $isPC={isPC}>
                  <Button
                    type="button"
                    onClick={handleSaveButton}
                    styleType={'basic'}
                    disabled={isSaveDisabled}
                  >
                    저장하기
                  </Button>
                </S.ButtonWrapper>
              )}
            </S.Form>

            {showTempDataModal && (
              <DetailModal
                text={`최근 작성 내용이 있어요\n이어서 작성하시겠어요?`}
                description="새로 작성하면 기존 기록은 모두 삭제돼요."
                leftButtonText="새로 작성하기"
                rightButtonText="이어서 작성하기"
                onClickBackground={() => setShowTempDataModal(false)}
                onClickLeft={handleNewMemo}
                onClickRight={() => {
                  setShowTempDataModal(false);
                }}
              />
            )}
            {showModal && !isReviewMode && (
              <DetailModal
                text="작성 중인 내용을 임시 저장할까요?"
                description="새로 작성하면 기존 기록은 삭제돼요."
                leftButtonText="나가기"
                rightButtonText="저장하기"
                onClickBackground={() => setShowModal(false)}
                onClickLeft={clearTempMemo}
                onClickRight={saveTempMemo}
              />
            )}
            {showToast && (
              <ToastMessage text="경험이 임시저장 되었어요" onClose={() => setShowToast(false)} />
            )}
            {isBottomSheetOpen && <FolderPopUp onClick={handleFolderPopUpClose} />}
          </S.Container>
        </S.PageContainer>
      )}
    </>
  );
};
