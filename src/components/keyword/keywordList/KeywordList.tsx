import { Chip } from '../../common/chip/Chip';
import * as S from './KeywordList.Style';

interface KeywordListProps {
  chip: string;
  title: string;
  description: string;
  date: string;
  onClick: () => void;
}

/**
 *
 * @param chip - chip
 * @param title - title
 * @param description - description
 * @param date - date
 * @param onClick - 클릭 시 수행하는 함수
 * @returns
 */
export const KeywordList = ({ chip, title, description, date, onClick }: KeywordListProps) => {
  return (
    <S.KeywordList onClick={onClick}>
      <Chip color={true}>{chip}</Chip>
      <div>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
        <S.Date>{date}</S.Date>
      </div>
    </S.KeywordList>
  );
};
