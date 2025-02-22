import { Modal } from "../../components/common/modal/Modal";
import * as S from './SelectDislikeModal.Style'
import CloseIcon from "@icons/CloseIcon.svg";
import ChatImg from '/images/ChatImg.png';
import MemoImg from '/images/MemoImg.png';
import { useState } from "react";
import { DislikeOptionModal } from './DislikeOptionModal'

interface SelectDislikeModalProps {
  onClose: () => void;
}

export const SelectDislikeModal = ({ onClose }: SelectDislikeModalProps) => {
  const [selectedFeedbackType, setSelectedFeedbackType] = useState<'CHAT' | 'ANALYSIS' | null>(null);
  const [dislikeOptionModal, setDislikeOptionModal] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleLeftClick = () => {
    setSelectedFeedbackType("CHAT")
    setDislikeOptionModal(true);
  };

  const handleRightClick = () => {
    setSelectedFeedbackType("ANALYSIS");
    setDislikeOptionModal(true);
  };

  return (
    <Modal onClick={handleClose}>
      <S.Content>
        <S.Icon src={CloseIcon} alt="close" onClick={handleClose} />
        <S.Text>
          {`어떤 점이\n
          아쉬웠나요?`}
        </S.Text>
        <S.ButtonContainer>
          <S.Button onClick={handleLeftClick}>
            <S.ButtonText>{`AI 채팅이\n아쉬웠어요`}</S.ButtonText>
            <img src={ChatImg} alt="chat" />
          </S.Button>
          <S.Button onClick={handleRightClick}>
            <S.ButtonText>{`AI 분석이\n아쉬웠어요`}</S.ButtonText>
            <img src={MemoImg} alt="memo" />
          </S.Button>
        </S.ButtonContainer>
      </S.Content>
      {dislikeOptionModal && selectedFeedbackType && (
        <DislikeOptionModal
          onClose={() => setDislikeOptionModal(false)}
          feedbackType={selectedFeedbackType}
        />
      )}
    </Modal>
  )
};