import { Modal } from './Modal';
import { SelectDislikeModal } from './SelectDislikeModal';
import * as S from './FeedbackModal.Style';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../button/Button';
import CloseIcon from '@icons/CloseIcon.svg';
import FeedbackIcon from '@icons/FeedbackIcon.svg';

interface FeedbackModalProps {
  onClose: () => void;
}

export const FeedbackModal = ({ onClose }: FeedbackModalProps) => {
  const navigate = useNavigate();
  const [showDislikeModal, setShowDislikeModal] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleLeftClick = () => {
    setShowDislikeModal(true);
  };

  const handleRightClick = () => {
    navigate('/');
  };

  return (
    <Modal onClick={handleClose}>
      <S.Content>
        <S.Icon src={CloseIcon} alt="close" onClick={handleClose} />
        <S.Image src={FeedbackIcon} alt="feedback" />
        <S.Text>
          {`모아모아가 정리한 경험,\n
          어떠셨나요?`}
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
      {showDislikeModal && <SelectDislikeModal />}
    </Modal>
  );
};