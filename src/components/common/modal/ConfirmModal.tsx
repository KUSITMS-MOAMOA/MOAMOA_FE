import { Modal } from './Modal';
import * as S from './ConfirmModal.Style';
import { Button } from '../button/Button';
import { useState } from 'react';
import CheckIcon from '@icons/CheckIcon.svg';
import { deleteUser } from '@/api/My';
import { useNavigate } from 'react-router-dom';

interface ConfirmModalProps {
  onClick: () => void;
}

/**
 *
 * @param onClick - 모달 클릭 시 수행하는 함수
 * @returns
 */
export const ConfirmModal = ({ onClick }: ConfirmModalProps) => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [isCheck, setIsCheck] = useState(false);

  const checkMessage = () => {
    setIsCheck((prev) => !prev);
    setDisabled((prev) => !prev);
  };

  const handleDeleteUser = async () => {
    const response = await deleteUser();
    if (response.is_success) {
      localStorage.removeItem('nickname');
      navigate('/oauth');
    }
  };

  return (
    <Modal isIcon={true} onClick={onClick}>
      <S.Content>
        <S.Text>
          회원 탈퇴시 개인정보 보호를 위해 <br /> 모든 데이터가 삭제됩니다. <br /> 이에
          동의하시나요?
        </S.Text>
        <S.MessageContainer>
          <S.IconContainer $isCheck={isCheck} onClick={checkMessage}>
            <S.Icon src={CheckIcon} alt="checkIcon" />
          </S.IconContainer>
          <S.Message>동의합니다.</S.Message>
        </S.MessageContainer>
        <Button styleType="basic" disabled={disabled} onClick={handleDeleteUser}>
          회원 탈퇴하기
        </Button>
      </S.Content>
    </Modal>
  );
};
