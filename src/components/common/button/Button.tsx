import * as S from './Button.Style';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: string;
  styleType: 'basic' | 'popupRight' | 'popupLeft';
}

/**
 *
 * @param children - 버튼 안의 글씨
 * @param icon - (optional) 버튼 옆 아이콘
 * @param styleType - 버튼의 스타일 'basic' | 'popupRight' | 'popupLeft'
 * @returns
 */
export const Button = ({ children, icon, styleType, ...props }: ButtonProps) => {
  return (
    <S.Container $styleType={styleType} {...props}>
      {children}
      {icon && <S.Icon src={icon} alt="icon" />}
    </S.Container>
  );
};
