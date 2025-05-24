import * as S from '../button/Button.Style';
import KakaoIcon from '@icons/KakaoIcon.svg';
import NaverIcon from '@icons/NaverIcon.svg';
import GoogleIcon from '@icons/GoogleIcon.svg';
import styled from 'styled-components';

const LoginButtonContainer = styled(S.Container)<{ $bgColor: string; $color: string }>`
  background-color: ${({ $bgColor }) => $bgColor};
  color: ${({ $color }) => $color};
`;

interface LoginButtonProps {
  type: 'kakao' | 'naver' | 'google';
  onClick: () => void;
}

const BUTTON_CONFIG = {
  kakao: {
    bgColor: 'rgba(255, 229, 0, 1)',
    color: '#3c1e1e',
    icon: KakaoIcon,
    label: '카카오로 로그인하기',
    iconSize: '1.5rem',
  },
  naver: {
    bgColor: '#03C75A',
    color: '#ffffff',
    icon: NaverIcon,
    label: '네이버로 로그인하기',
    iconSize: '1rem',
  },
  google: {
    bgColor: '#FFFFFF',
    color: '#1f1f1f',
    icon: GoogleIcon,
    label: '구글로 로그인하기',
    iconSize: '1.5rem',
  },
};

export const LoginButton = ({ type, onClick }: LoginButtonProps) => {
  const { bgColor, color, icon, label, iconSize } = BUTTON_CONFIG[type];

  return (
    <LoginButtonContainer $bgColor={bgColor} $color={color} $styleType="basic" onClick={onClick}>
      <img
        src={icon}
        alt={`${type} Icon`}
        style={{
          width: iconSize,
          height: iconSize,
          marginRight: '0.5rem',
          verticalAlign: 'middle',
        }}
      />
      {label}
    </LoginButtonContainer>
  );
};
