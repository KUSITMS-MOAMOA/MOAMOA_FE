import { Chip } from '../chip/Chip';
import * as S from './List.Style';

interface ListProps {
  title: string;
  chips: string[];
  date: string;
  folder: string;
  onClick: () => void;
}

/**
 *
 * @param title - 제목
 * @param cihps - 역량 chip의 배열
 * @param date - 날짜
 * @param folder - 폴더
 * @param onClick - 클릭하면 이동할 곳
 * @returns
 */
export const List = ({ title, chips, date, folder, onClick }: ListProps) => {
  return (
    <S.List onClick={onClick}>
      <S.ChipContainer>
        {chips.map((chip) => (
          <Chip key={chip}>{chip}</Chip>
        ))}
      </S.ChipContainer>
      <S.Title>{title}</S.Title>
      <S.bottomContainer>
        <Chip color={true}>{folder}</Chip>
        <S.DateText>{date}</S.DateText>
      </S.bottomContainer>
    </S.List>
  );
};
