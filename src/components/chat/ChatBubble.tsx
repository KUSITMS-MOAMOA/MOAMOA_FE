import ChatProfileIcon from '@icons/ChatProfileIcon.svg';
import { LoadingDots } from './LodingDots';
import * as S from './ChatBubble.Style';

interface ChatBubbleProps {
  message: string | React.ReactNode;
  isMe: boolean;
  isLoading?: boolean;
  $isPC?: boolean;
}

/**
 * 
 * @param message - 표시할 메세지
 * @param isMe - 유저 여부
 * @param isLoading - 로딩 여부
 * @param $isPC - PC 여부
 * @returns 
 */
export const ChatBubble = ({ message, isMe, isLoading, $isPC }: ChatBubbleProps) => {
  return (
    <S.ChatBubbleWrapper $isMe={isMe} $isPC={$isPC}>
      {!isMe && <S.ProfileIcon src={ChatProfileIcon} alt="Profile" />}
      <S.Bubble $isMe={isMe} $isPC={$isPC}>
        {isLoading ? (
          <LoadingDots />
        ) : (
          typeof message === 'string' ? (
            <S.Message $isMe={isMe} $isPC={$isPC} dangerouslySetInnerHTML={{ __html: message }} />
          ) : (
            <S.Message $isMe={isMe} $isPC={$isPC}>{message}</S.Message>
          )
        )}
      </S.Bubble>
    </S.ChatBubbleWrapper>
  );
};
