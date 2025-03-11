import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './SignUpPage.Style';
import { Input } from '@components/common/input/Input';
import { SelectBox } from '@components/common/selectbox/SelectBox';
import { Button } from '@components/common/button/Button';
import { TabBar } from '@components/layout/tabBar/TabBar';
import { registerUser } from '../../api/Oauth';
import { useNicknameValidation } from '@/hooks/useNicknameValidation';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const statusOptions = ['대학생', '대학원생', '취업 준비생', '인턴', '재직 중'];

export const SignUpPage = () => {
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const { nickname, isError, errorMessage, onChangeNickname } = useNicknameValidation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const isPC = useMediaQuery('(min-width: 768px)');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    if (!token) {
      console.error('등록 토큰이 없습니다.');
      return;
    }

    setIsSubmitting(true);

    try {
      const apiResponse = await registerUser(token, nickname, status);
      if (apiResponse.is_success) {
        if (apiResponse.data.nickname) {
          localStorage.setItem('nickname', apiResponse.data.nickname);
          navigate('/login-success');
        }
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
    } finally {
      setIsSubmitting(false); // 회원가입 완료 후 버튼 비활성화 해제 (API 요청 실패 시 재시도 가능)
    }
  };

  return (
    <S.PageContainer $isPC={isPC}>
      {!isPC && <TabBar leftText="회원가입" />}
      <S.ContentWrapper>
        <S.Container $isPC={isPC}>
          <S.Title>추가 정보 작성</S.Title>
          <S.Form onSubmit={handleSubmit}>
            <S.InputWrapper $isPC={isPC}>
              <S.Label>닉네임</S.Label>
              <Input
                placeholder="10자 이내로 입력해주세요."
                value={nickname}
                onChange={onChangeNickname}
                required
                maxLength={11}
                isError={isError}
                errorMessage={errorMessage}
              />
            </S.InputWrapper>
            <S.InputWrapper $isPC={isPC}>
              <S.Label>현소속</S.Label>
              <SelectBox select={status} onChange={setStatus} statusData={statusOptions} placeholder="선택하기" />
            </S.InputWrapper>
            <S.ButtonWrapper>
              <Button styleType="basic" disabled={isError || !nickname || !status || isSubmitting}>
                완료
              </Button>
            </S.ButtonWrapper>
          </S.Form>
        </S.Container>
      </S.ContentWrapper>
    </S.PageContainer>
  );
};
