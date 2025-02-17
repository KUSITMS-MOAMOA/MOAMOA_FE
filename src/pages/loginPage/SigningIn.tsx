import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getTokensWithTmpToken } from '../../api/Oauth';
import { LoadingScreen } from '@components/common/loading/LoadingScreen';

export const SigningIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        console.error('등록 토큰이 없습니다.');
        navigate('/oauth');
        return;
      }
      try {
        const apiResponse = await getTokensWithTmpToken(token);

        if (apiResponse.is_success) {
          if (apiResponse.data.nickname) {
            localStorage.setItem('nickname', apiResponse.data.nickname);
            navigate('/home');
          }
        }
      } catch (error) {
        console.error('로그인 실패:', error);
      }
    };

    fetchData();
  }, [token, navigate]);

  return <LoadingScreen showLabel={false} />;
};
