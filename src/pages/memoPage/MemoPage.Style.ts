import styled from 'styled-components';
import { Input as OriginalInput } from '@components/common/input/Input';
import { Colors } from '@/styles/colors';

interface ReviewModeProps {
  $isReviewMode: boolean;
  $isPC: boolean;
}

export const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const Container = styled.div<ReviewModeProps>`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  position: relative;
  height: 100%;
  align-items: center;
  width: 100%;
  margin: 0 auto;

  ${(props) => props.theme.breakpoints.min} {
    width: 60%;
  }
`;

export const HeaderContainer = styled.div`
  height: 14.5rem;
  background-image: url('/images/MemoHeaderImage.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  ${(props) => props.theme.breakpoints.min} {
    background-image: none;
    margin-top: 2rem;
  }
`;

export const HeaderIcon = styled.div`
${(props) => props.theme.breakpoints.min} {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;

  img {
    width: 200px;
    height: 100px;
  }
}
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.5rem;

  ${(props) => props.theme.breakpoints.min} {
    margin-bottom: 1.25rem;
  }
`;

export const Form = styled.form<ReviewModeProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.625rem;
  width: 100%;
  padding: 0 1.25rem;
  position: relative;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

export const BackButton = styled.button`
  position: absolute;
  width: 2.5rem;
  height: 2.5rem;
  background: none;
  border: none;
  cursor: pointer;
  top: 2.8125rem;
  left: 1.25rem;
`;

export const Title = styled.p`
  font-size: 1.25rem;
  font-weight: 200;
  line-height: 135%;
  margin-top: 7.8125rem;
  margin-left: 1.25rem;
  white-space: pre-wrap;
`;

export const SubTitle = styled.h4`
  line-height: 135%;
  margin-left: 1.25rem;
  white-space: pre-wrap;
`;

export const Label = styled.p<ReviewModeProps>`
  color: ${Colors.gray900};
  font-size: 1rem;
  font-weight: 600;
  line-height: 145%;
  ${({ $isReviewMode }) => $isReviewMode && 'display: none;'}
`;

export const InputTitle = styled(OriginalInput)`
  width: 100%;
  margin: 0;
  font-weight: 400;
  padding-left: 0.375rem;
  padding-bottom: 0;
  border: none;
  background-color: ${({ disabled }) => (disabled ? Colors.white : 'inherit')};
  &:focus {
    border: none;
  }
`;

export const Line = styled.div`
  width: 100%;
  border: 0.0625rem solid ${Colors.gray50};
  align-self: center;
  margin-bottom: 0.625rem;
`;

export const Content = styled.textarea<ReviewModeProps>`
  font-family: 'Pretendard';
  font-size: 1rem;
  font-weight: 400;
  line-height: 145%;
  width: 96%;
  min-height: ${({ $isReviewMode }) => ($isReviewMode ? '10rem' : '16rem')};
  height: 100%;
  border: none;
  outline: none;
  padding: 0.5rem;
  resize: none;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  background-color: ${({ disabled }) => (disabled ? 'white' : 'inherit')};

  &::-webkit-scrollbar {
    display: none;
  }
  &::placeholder {
    color: ${Colors.gray200};
    font-size: 1rem;
    font-weight: 400;
    line-height: 145%;
  }

  ${(props) => props.theme.breakpoints.min} {
    font-size: 1.125rem;
    height: 15rem;
  }
`;

export const WarningCountContainer = styled.div`
  width: 95%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
`;

export const Warning = styled.p`
  width: 100%;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 130%;
  color: #ff4d4d;
`;

export const Count = styled.p`
  width: 3.125rem;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 130%;
  color: ${Colors.gray500};

  ${(props) => props.theme.breakpoints.min} {
    font-size: 0.875rem;
  }
`;

export const ButtonWrapper = styled.div<ReviewModeProps>`
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 1.25rem;
  margin-left: auto;

  ${(props) => props.theme.breakpoints.min} {
    width: 11rem;
    margin-top: 5rem;
  }
`;

export const CategoryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
`;

export const Icon = styled.svg`
  width: 38px;
  height: 38px;
`;

export const InfoButtonWrapper = styled.div`
  position: absolute;
  top: 70px;
  right: 0;
  margin-right: 30px;
`;