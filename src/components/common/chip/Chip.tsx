import * as S from './Chip.Style';

interface ChipProps {
  children: React.ReactNode;
  color?: boolean;
  size?: 'small' | 'large';
}

/**
 *
 * @param children - chip에 들어갈 글씨
 * @param color - (optional) true일 경우 회색
 * @param size - chip의 크기
 * @returns
 */
export const Chip = ({ children, color, size = 'small' }: ChipProps) => {
  return (
    <S.Chip size={size} $color={color}>
      {children}
    </S.Chip>
  );
};
