import { Modal } from "./Modal";
import * as S from './SelectDislikeModal.Style'
import CloseIcon from "@icons/CloseIcon.svg";
import ChatImg from '/images/ChatImg.png';
import MemoImg from '/images/MemoImg.png';

interface SelectDislikeModalProps {
  onClose: () => void;
}

export const SelectDislikeModal = ({ onClose }: SelectDislikeModalProps) => {
  const handleClose = () => {
    onClose();
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
          <S.Button>
            <S.ButtonText>{`AI 채팅이\n아쉬웠어요`}</S.ButtonText>
            <img src={ChatImg} alt="chat" />
          </S.Button>
          <S.Button>
            <S.ButtonText>{`AI 분석이\n아쉬웠어요`}</S.ButtonText>
            <img src={MemoImg} alt="memo" />
          </S.Button>
        </S.ButtonContainer>

      </S.Content>
    </Modal>
  )
};