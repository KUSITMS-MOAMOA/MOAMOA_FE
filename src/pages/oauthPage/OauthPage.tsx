import { LoginButton } from '@components/common/login/LoginButton';
import * as S from './OauthPage.Style';

export const OauthPage = () => {
  const handleOauth = () => {
    window.location.href = 'https://api.moamoa.site/oauth2/authorization/kakao';
  };

  return (
    <S.Container>
      <S.Logo>MOAMOA</S.Logo>
      <S.Subtitle>차곡차곡 모아보는 경험 기록</S.Subtitle>
      <S.LogoImage src="/images/LogoImage.png" alt="logo" />
      <S.ButtonWrapper>
        <LoginButton onClick={handleOauth} />
      </S.ButtonWrapper>
    </S.Container>
  );
};
