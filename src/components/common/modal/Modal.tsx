import { Portal } from '../portal/Portal';
import * as S from './Modal.Style';
import CloseIcon from '@icons/CloseIcon.svg';

interface ModalProps {
  children: React.ReactNode;
  onClick: () => void;
  isIcon?: boolean;
  isPC?: boolean;
}

/**
 *
 * @param children - 모달 안의 children
 * @param onClick - 모달 클릭 시 수행하는 함수
 * @param isIcon - 아이콘 유무
 * @param isPC - PC 사이즈인지 확인하는 변수
 * @returns
 */
export const Modal = ({ children, onClick, isIcon, isPC }: ModalProps) => {
  return (
    <Portal>
      <S.Background onClick={onClick}>
        <S.Modal $isPC={isPC} onClick={(e) => e.stopPropagation()}>
          {isIcon && <S.Icon src={CloseIcon} alt="closeIcon" onClick={onClick} />}
          {children}
        </S.Modal>
      </S.Background>
    </Portal>
  );
};
