import { useEffect, useState } from 'react';
import { TabBar } from '@components/layout/tabBar/TabBar';
import { Content } from '@components/report/content/Content';
import { EditPopUp } from '@/components/common/popup/EditPopUp';
import { BasicModal } from '@components/common/modal/BasicModal';
import { ReportPopUp } from '@/components/common/popup/reportPopup/ReportPopUp';
import { AbilityProps, AnalysisProps, SkillProps } from '@/types/Analysis';
import { deleteAnaylsis, getAnalysis, patchAnalysis } from '@/api/Analysis';
import { useNavigate, useParams } from 'react-router-dom';
import { FolderChangePopUp } from '@/components/common/popup/FolderChangePopUp';
import EditIcon from '@icons/EditIcon.svg';
import KebabIcon from '@icons/KebabIcon.svg';
import * as S from './ReportPage.Style';
import ToastMessage from '@/components/chat/ToastMessage';
import { useValidatePathId } from '@/hooks/useValidatePathId';
import { FeedbackModal } from '@/pages/feedbackPage/FeedbackModal';

export const ReportPage = () => {
  const { id } = useParams<{ id?: string }>();
  const [data, setData] = useState<SkillProps | null>(null);
  const [newData, setNewData] = useState<AnalysisProps | null>(null);
  const [openBottom, setOpenBottom] = useState(false);
  const [openEditBottom, setOpenEditBottom] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openChangeBottom, setOpenChangeBottom] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const navigate = useNavigate();

  const analysisId = id ? parseInt(id, 10) : undefined;

  useValidatePathId(true);

  useEffect(() => {
    const fetchSkill = async () => {
      if (analysisId) {
        const skillData = await getAnalysis(analysisId);
        if (skillData) {
          setData(skillData);
          setNewData({
            analysisId,
            title: skillData.recordTitle,
            content: skillData.recordContent,
            abilityMap: skillData.abilityDtoList.reduce(
              (acc: { [key: string]: string }, ability: AbilityProps) => ({
                ...acc,
                [ability.keyword]: ability.content,
              }),
              {},
            ),
          });

          if (skillData.recordType === 'CHAT' && [1, 5, 10].includes(skillData.chatRecordCount)) {
            setShowFeedbackModal(true);
          }
        }
      }
    };

    fetchSkill();
  }, [analysisId, openEditBottom, openChangeBottom]);

  const handleDataChange = (key: keyof AnalysisProps, value: string) => {
    if (newData) {
      setNewData({ ...newData, [key]: value });
      setHasChanges(true);
    }
  };

  const handleAbilityChange = (index: number, value: string) => {
    if (newData && data) {
      const updatedAbilityMap = { ...newData.abilityMap };
      const abilityKey = data.abilityDtoList[index].keyword;
      if (updatedAbilityMap) {
        updatedAbilityMap[abilityKey] = value;
        setNewData({ ...newData, abilityMap: updatedAbilityMap });
      }
    }
  };

  const handleDeleteUser = async () => {
    if (analysisId === undefined) return;
    const response = await deleteAnaylsis(analysisId);
    if (response.is_success) {
      navigate(-1);
    }
  };

  const handleSubmit = async () => {
    if (newData?.title && newData.title.length > 50) {
      return;
    }

    if (analysisId && newData) {
      const { title, content, abilityMap } = newData;
      const response = await patchAnalysis({
        analysisId,
        title,
        content,
        abilityMap,
      });

      if (response.is_success) {
        toggleEditBottomSheet();
        toggleShowToast();
      }
    }
  };

  const toggleBottomSheet = () => {
    setOpenBottom((prev) => !prev);
  };

  const toggleEditBottomSheet = () => {
    setOpenBottom(false);
    setOpenEditBottom((prev) => !prev);
  };

  const toggleModal = () => {
    setOpenBottom(false);
    setOpenDelete((prev) => !prev);
  };

  const toggleChangeFoler = () => {
    setOpenBottom(false);
    setOpenChangeBottom((prev) => !prev);
  };

  const toggleShowToast = () => {
    setShowToast((prev) => !prev);
  };

  const handleCloseFeedbackModal = () => {
    setShowFeedbackModal(false);
  };

  return (
    <>
      <S.MobileHeader>
        <TabBar
          centerText="AI 역량 분석"
          onClick={toggleBottomSheet}
          isEditable={true}
          onClickEditIcon={toggleEditBottomSheet}
        />
      </S.MobileHeader>
      <S.PcHeader>
        AI 역량 분석
        <S.IconContainer>
          <S.Icon src={EditIcon} alt="편집" onClick={toggleEditBottomSheet} />
          <S.Icon src={KebabIcon} alt="케밥" onClick={toggleBottomSheet} />
        </S.IconContainer>
      </S.PcHeader>
      {data && <Content data={data} />}
      {openBottom && (
        <EditPopUp
          onClick={toggleBottomSheet}
          onClickDelete={toggleModal}
          onClickChange={toggleChangeFoler}
        />
      )}
      {openEditBottom && data && (
        <ReportPopUp
          onClick={toggleEditBottomSheet}
          onClickStore={handleSubmit}
          data={newData}
          onChange={handleDataChange}
          onAbilityChange={handleAbilityChange}
          hasChanges={hasChanges}
        />
      )}
      {openDelete && (
        <BasicModal
          text="분석한 내용을 삭제하시겠어요?"
          leftButtonText="돌아가기"
          rightButtonText="삭제하기"
          onClickBackground={toggleModal}
          onClickLeft={toggleModal}
          onClickRight={handleDeleteUser}
        />
      )}
      {openChangeBottom && data && (
        <FolderChangePopUp
          recordId={data.recordId}
          onClick={toggleChangeFoler}
          intialfolderName={data.folderName}
          showToast={toggleShowToast}
        />
      )}
      {showFeedbackModal && data && (
        <FeedbackModal onClose={handleCloseFeedbackModal} recordId={data.recordId} />
      )}
      {showToast && <ToastMessage text="변경 내용이 저장되었어요! " onClose={toggleShowToast} />}
    </>
  );
};
