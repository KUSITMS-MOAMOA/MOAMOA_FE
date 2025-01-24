import { useState } from 'react';
import UpArrowIcon from '@icons/UpArrowIcon.svg';
import * as S from './ChatBox.Style';

interface ChatBoxProps {
  onSubmit: (message: string) => void;
  isReviewMode: boolean;
  $isPC: boolean;
}

/**
 * 
 * @param onSubmit - 메세지 입력 시 호출되는 함수
 * @param isReviewMode - 리뷰 모드 여부
 * @param $isPC - PC 모드 여부
 * @returns 
 */
export const ChatBox = ({ onSubmit, isReviewMode, $isPC }: ChatBoxProps) => {
  const [message, setMessage] = useState('');

  const handleSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim()) {
      onSubmit(message);
      setMessage('');
    }
  };

  const hasMessage = message.trim().length > 0;

  return (
    <S.ChatBoxContainer $isPC={$isPC}>
      <S.ChatBoxForm onSubmit={handleSend}>
        <S.ChatBoxInput
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={isReviewMode ? '채팅을 입력할 수 없습니다.' : '내용을 입력해 주세요'}
          disabled={isReviewMode}
        />
        <S.ChatBoxButton type="submit" $hasMessage={hasMessage} disabled={isReviewMode}>
          <img src={UpArrowIcon} alt="Send" />
        </S.ChatBoxButton>
      </S.ChatBoxForm>
    </S.ChatBoxContainer>
  );
};
