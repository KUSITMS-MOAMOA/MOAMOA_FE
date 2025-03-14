import { Modal } from '@/components/common/modal/Modal';
import { SelectDislikeModal } from '@/pages/feedbackPage/SelectDislikeModal';
import * as S from './FeedbackModal.Style';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/button/Button';
import CloseIcon from '@icons/CloseIcon.svg';
import FeedbackIcon from '@icons/FeedbackIcon.svg';
import { submitFeedback } from '@/api/Feedback';
import ToastMessage from '@/components/chat/ToastMessage';

interface FeedbackModalProps {
  onClose: () => void;
  recordId: number;
}

export const FeedbackModal = ({ onClose, recordId }: FeedbackModalProps) => {
  const navigate = useNavigate();
  const [selectDislikeModal, setSelectDislikeModal] = useState(false);
  const [satisfaction, setSatisfaction] = useState<'GOOD' | 'BAD' | null>(null);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const handleClose = () => {
    onClose();
  };

  const handleLeftClick = async () => {
    setSatisfaction("BAD");
    setSelectDislikeModal(true);
  };

  const handleRightClick = async () => {
    try {
      await submitFeedback({ recordId, satisfaction: "GOOD" })
      setIsToastVisible(true);

      setTimeout(() => {
        onClose();
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }, 2000);
    } catch (error) {
      console.error('피드백 제출 중 오류 발생:', error);
    }
  };

  return (
    <Modal onClick={handleClose}>
      <S.Content>
        <S.Icon src={CloseIcon} alt="close" onClick={handleClose} />
        <S.Image src={FeedbackIcon} alt="feedback" />
        <S.Text>
          {`모아모아가 정리한 경험,
          \n어떠셨나요?`}
        </S.Text>
        <S.ButtonContainer>
          <S.StyledButton styleType="popupLeft" onClick={handleLeftClick}>
            아쉬워요
          </S.StyledButton>
          <Button styleType="popupRight" onClick={handleRightClick}>
            만족해요
          </Button>
        </S.ButtonContainer>
      </S.Content>
      {selectDislikeModal && satisfaction && (
        <SelectDislikeModal
          onClose={() => setSelectDislikeModal(false)}
          parentClose={onClose}
          recordId={recordId}
          satisfaction={satisfaction}
        />
      )}
      {isToastVisible && (
        <ToastMessage
          text="소중한 의견 감사합니다 :)"
          onClose={() => setIsToastVisible(false)}
        />
      )}
    </Modal>
  );
};