import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, matchPath } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/global';
import { theme } from './styles/theme';
import { SideBarItem } from './components/common/sideBar/SideBarItem';
import * as S from './App.Style';
import { initializeGA, trackPageView } from './utils/ga';

export const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hideSideBarPath = ['/oauth', '/login', '/register', '/login-success', '/chat/:id', '/review-chat/:id', '/404']; // router 확정되면 추후 수정

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    initializeGA();
  }, []);

  useEffect(() => {
    // 첫번째 경로 세그먼트만 추출
    const trackPath = '/' + location.pathname.split('/')[1];
    trackPageView(trackPath);
  }, [location.pathname]);

  useEffect(() => {
    const unprotectedPaths = ['/oauth', '/login', '/register', '/login-success'];
    const accessToken = localStorage.getItem('nickname');

    if (!accessToken && !unprotectedPaths.includes(location.pathname)) {
      navigate('/oauth');
    }
  }, [location, navigate]);

  const showSideBar = !isLoading && !hideSideBarPath.some((path) => matchPath(path, location.pathname));

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <S.Container>
          {showSideBar && (
            <S.SideBar>
              <SideBarItem />
            </S.SideBar>
          )}
          <S.ContentWrapper>
            <Outlet context={{ setIsLoading }} />
          </S.ContentWrapper>
        </S.Container>
      </>
    </ThemeProvider>
  );
};

export default App;
