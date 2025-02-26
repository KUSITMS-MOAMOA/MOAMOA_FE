import { useState } from 'react';
import UpArrowIcon from '@icons/UpArrowIcon.svg';
import * as S from './ChatBox.Style';
import ToastMessage from '@/components/chat/ToastMessage';

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
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handelChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setMessage(value);
    } else {
      setIsToastVisible(true);
    }
  };

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
          onChange={handelChage}
          placeholder={isReviewMode ? '채팅을 입력할 수 없습니다.' : '내용을 입력해 주세요'}
          disabled={isReviewMode}
        />
        <S.ChatBoxButton type="submit" $hasMessage={hasMessage} disabled={isReviewMode}>
          <img src={UpArrowIcon} alt="Send" />
        </S.ChatBoxButton>
      </S.ChatBoxForm>
      {isToastVisible && (
        <ToastMessage
          text="메시지는 500자 이하로 입력해주세요."
          onClose={() => setIsToastVisible(false)}
        />
      )}
    </S.ChatBoxContainer>
  );
};
