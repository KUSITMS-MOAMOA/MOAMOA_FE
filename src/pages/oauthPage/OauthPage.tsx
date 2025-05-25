import { LoginButton } from '@components/common/login/LoginButton';
import * as S from './OauthPage.Style';

export const OauthPage = () => {
  const handleKakaoOauth = () => {
    window.location.href = 'https://api.moamoa.site/oauth2/authorization/kakao';
  };

  const handleNaverOauth = () => {
    window.location.href = 'https://api.moamoa.site/oauth2/authorization/naver';
  };

  const handleGoogleOauth = () => {
    window.location.href = 'https://api.moamoa.site/oauth2/authorization/google';
  };

  return (
    <S.Container>
      <S.Logo>MOAMOA</S.Logo>
      <S.Subtitle>차곡차곡 모아보는 경험 기록</S.Subtitle>
      <S.LogoImage src="/images/LogoImage.png" alt="logo" />
      <S.ButtonWrapper>
        <LoginButton type="kakao" onClick={handleKakaoOauth} />
        <LoginButton type="naver" onClick={handleNaverOauth} />
        <LoginButton type="google" onClick={handleGoogleOauth} />
      </S.ButtonWrapper>
    </S.Container>
  );
};
