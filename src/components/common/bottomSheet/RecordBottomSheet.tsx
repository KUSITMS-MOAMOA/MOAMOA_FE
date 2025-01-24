import { SheetItem, SheetItemProps } from '../../home/sheetItem/SheetItem';
import { BottomSheet } from './BottomSheet';
import * as S from './RecordBottomSheet.Style';
import CloseIcon from '@icons/CloseIcon.svg';
import Memo from '/images/MemoImg.png';
import Chat from '/images/ChatImg.png';

const SHEET_ITEMS: SheetItemProps[] = [
  {
    title: '메모 기록',
    subTitle: '빠르고 간편하게',
    icon: Memo,
  },
  {
    title: 'AI 채팅 기록',
    subTitle: 'AI 대화로 쉽게',
    icon: Chat,
  },
];

interface RecordBottomSheetProps {
  onClick: () => void;
}

/**
 *
 * @param onClick - 아이콘 클릭 시 수행하는 함수
 * @returns
 */
export const RecordBottomSheet = ({ onClick }: RecordBottomSheetProps) => {
  return (
    <BottomSheet onClick={onClick}>
      <S.Header>
        <S.Title>경험 기록하기</S.Title>
        <S.Icon src={CloseIcon} alt="closeIcon" onClick={onClick} />
      </S.Header>
      <S.SheetContent>
        {SHEET_ITEMS.map((item, index) => (
          <SheetItem key={index} title={item.title} subTitle={item.subTitle} icon={item.icon} />
        ))}
      </S.SheetContent>
    </BottomSheet>
  );
};
