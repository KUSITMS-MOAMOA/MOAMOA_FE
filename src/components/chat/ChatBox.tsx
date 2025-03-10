import { useState, useRef, useEffect } from 'react';
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isSendingRef = useRef(false);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '2.25rem';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [message]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setMessage(value);
    } else {
      setIsToastVisible(true);
    }
  };

  const handleSend = (event: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault();

    if (isSendingRef.current) return; // 실행 중이면 무시
    isSendingRef.current = true; // 실행 상태로 변경

    if (message.trim()) {
      console.log('Sending message:', message);
      onSubmit(message);

      // 메시지 전송 후 100ms 뒤에 입력창 초기화
      setTimeout(() => {
        setMessage('');
        isSendingRef.current = false;
      }, 100);
    } else {
      isSendingRef.current = false;
    }

  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {

    // 한글 입력 시 Enter 이벤트 방지 & 줄바꿈 정상 동작
    if (event.nativeEvent.isComposing) return;

    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // 기본 Enter 이벤트 방지
      event.stopPropagation(); // 이벤트 전파 방지

      if (!event.repeat) { // 키가 반복 입력되는 경우 방지
        handleSend(event as unknown as React.FormEvent<HTMLFormElement>);
      }
    }
  };

  const hasMessage = message.trim().length > 0;

  return (
    <S.ChatBoxContainer $isPC={$isPC}>
      <S.ChatBoxForm onSubmit={handleSend}>
        <S.ChatBoxInput
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
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
