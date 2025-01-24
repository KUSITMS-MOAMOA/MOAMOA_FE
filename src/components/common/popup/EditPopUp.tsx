import { BottomSheet } from '../bottomSheet/BottomSheet';
import * as S from './EditPopUp.Style';
import DeleteIcon from '@icons/ReportDeleteIcon.svg';
import ChangeIcon from '@icons/ChangeFolderIcon.svg';
import CloseIcon from '@icons/CloseIcon.svg';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface EditPopUpProps {
  onClick: () => void;
  onClickDelete: () => void;
  onClickChange: () => void;
}

const EDIT_ITEM = [
  {
    icon: DeleteIcon,
    label: '삭제하기',
    actionKey: 'onClickDelete',
    isDelete: true,
  },
  { icon: ChangeIcon, label: '경험 폴더 변경하기', actionKey: 'onClickChange' },
];

/**
 *
 * @param onClick - 팝업 클릭 시 수행하는 함수
 * @param onClickDelete - delete 함수
 * @param onClickChange - change 함수
 * @returns
 */
export const EditPopUp = ({ onClick, onClickDelete, onClickChange }: EditPopUpProps) => {
  const actions: Record<'onClickDelete' | 'onClickChange', () => void> = {
    onClickDelete,
    onClickChange,
  };

  const isMobile = useMediaQuery('(max-width: 1048px)');

  return (
    <>
      {isMobile ? (
        <BottomSheet onClick={onClick}>
          <S.Header>
            <S.CloseIcon src={CloseIcon} alt="closeIcon" onClick={onClick} />
          </S.Header>
          <S.SheetContent>
            {EDIT_ITEM.map(({ icon, label, actionKey, isDelete }) => (
              <S.SheetItem
                key={label}
                $isDelete={isDelete}
                onClick={actions[actionKey as keyof typeof actions]}
              >
                <S.Icon src={icon} />
                {label}
              </S.SheetItem>
            ))}
          </S.SheetContent>
        </BottomSheet>
      ) : (
        <S.PopUp>
          <S.SheetContent>
            <S.CloseIcon src={CloseIcon} alt="closeIcon" onClick={onClick} />
            {EDIT_ITEM.map(({ icon, label, actionKey, isDelete }) => (
              <S.SheetItem
                key={label}
                $isDelete={isDelete}
                onClick={actions[actionKey as keyof typeof actions]}
              >
                <S.Icon src={icon} />
                {label}
              </S.SheetItem>
            ))}
          </S.SheetContent>
        </S.PopUp>
      )}
    </>
  );
};
