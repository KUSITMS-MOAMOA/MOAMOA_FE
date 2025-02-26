import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CategoryChip } from '@/components/common/chip/CategoryChip';
import { Button } from '@/components/common/button/Button';
import { FolderPopUp } from '@/components/common/popup/FolderPopUp';
import * as S from './RecordCompletePage.Style';
import { getFormattedDate } from '@/utils/dateUtils';
import FolderIcon from '@icons/FolderIcon.svg';
import RecordCompletePageIcon from '@/assets/icons/MemoPageIcon.png';
import { getFolders } from '@/api/Folder';
import { FolderListProps } from '@/types/Folder';
import { postRecord } from '@/api/Record';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { LoadingScreen } from '@/components/common/loading/LoadingScreen';
import { useOutletContext } from 'react-router-dom';

export const RecordCompletePage = () => {
  const [folders, setFolders] = useState<FolderListProps[]>([]);
  const [title, setTitle] = useState(getFormattedDate());
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const nickname = localStorage.getItem('nickname');
  const isPC = useMediaQuery('(min-width: 1048px)');
  const [isLoading, setIsLocalLoading] = useState(false);
  const { setIsLoading } = useOutletContext<{ setIsLoading: (loading: boolean) => void }>();

  useEffect(() => {
    if (state?.summary) {
      setContent(state.summary);
    }
    if (state?.title) {
      setTitle(state.title || getFormattedDate());
    }
  }, [state]);

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
  }, [isBottomSheetOpen]);

  const handleSaveButton = async () => {
    try {
      setIsLocalLoading(true);
      setIsLoading(true);
      if (!state?.chatRoomId) {
        throw new Error('채팅방 ID가 없습니다.');
      }
      if (!selectedCategory) {
        throw new Error('카테고리를 선택해주세요.');
      }

      const folderId = folders.find((folder) => folder.title === selectedCategory)?.folderId;
      if (!folderId) {
        throw new Error('유효하지 않은 폴더입니다.');
      }

      try {
        const response = await postRecord({
          title,
          content,
          folderId,
          recordType: 'CHAT',
          chatRoomId: state.chatRoomId,
        });
        if (response?.is_success) {
          const id = response.data.analysisDto.analysisId;
          navigate(`/report/${id}`, { state: { chatRecordCount: response.data.chatRecordCount } });
          return true;
        }
      } catch (error) {
        const errorCode = (error as { code: string }).code;
        switch (errorCode) {
          case 'E0500_OVERFLOW_COMMENT':
          case 'E0500_OVERFLOW_KEYWORD_CONTENT':
          case 'E500_INVALID_ANALYSIS': {
            // 1초 대기 후 재시도
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const retryResponse = await postRecord({
              title,
              content,
              folderId,
              recordType: 'CHAT',
              chatRoomId: state.chatRoomId,
            });
            if (retryResponse?.is_success) {
              const id = retryResponse.data.analysisDto.analysisId;
              navigate(`/report/${id}`);
              return;
            }
            break;
          }
          default:
            throw error; // 예상하지 못한 에러
        }
      }
    } finally {
      setIsLocalLoading(false);
      setIsLoading(false);
    }
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleChangeCategory = (category: string, isAddFolder = false) => {
    if (isAddFolder) {
      setIsBottomSheetOpen(true);
    } else {
      setSelectedCategory(category);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const isSaveDisabled = !state?.title || !state?.summary || !selectedCategory;

  return (
    <>
      {isLoading ? (
        <LoadingScreen labelText="모아모아가 경험을 정리하고 있어요" />
      ) : (
        <S.PageContainer>
          <S.Container $isPC={isPC}>
            <S.HeaderContainer>
              <S.TitleContainer>
                <S.Title>경험 기록이 완료되었어요!</S.Title>
                <S.SubTitle>{nickname}님의 경험을 보기 쉽게 요약했어요</S.SubTitle>
              </S.TitleContainer>
              {isPC && (
                <S.HeaderIcon>
                  <img src={RecordCompletePageIcon} alt="경험 완료 헤더 아이콘" />
                </S.HeaderIcon>
              )}
            </S.HeaderContainer>

            <S.Form onSubmit={handleSubmit} $isPC={isPC}>
              <S.InputTitle
                placeholder={getFormattedDate()}
                value={title}
                onChange={handleChangeTitle}
                isError={false}
              />
              <S.Line />
              <S.TextArea value={content} onChange={handleChangeContent} $isPC={isPC} />
              <S.Line />

              <S.Label>경험 폴더를 선택해주세요.</S.Label>
              <S.CategoryContainer>
                {folders.map((folder) => (
                  <CategoryChip
                    key={folder.folderId}
                    children={folder.title}
                    isSelected={selectedCategory === folder.title}
                    onClick={() => handleChangeCategory(folder.title)}
                  />
                ))}
                <CategoryChip onClick={() => handleChangeCategory('', true)} isSelected={false}>
                  <img src={FolderIcon} alt="changeFolder" />
                </CategoryChip>
              </S.CategoryContainer>

              <S.ButtonWrapper $isPC={isPC}>
                <Button
                  type="submit"
                  onClick={handleSaveButton}
                  styleType="basic"
                  disabled={isSaveDisabled}
                >
                  저장하기
                </Button>
              </S.ButtonWrapper>
            </S.Form>

            {isBottomSheetOpen && <FolderPopUp onClick={() => setIsBottomSheetOpen(false)} />}
          </S.Container>
        </S.PageContainer>
      )}
    </>
  );
};
