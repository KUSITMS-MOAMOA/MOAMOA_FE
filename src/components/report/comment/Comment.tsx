import * as S from './Comment.Style';
import ChatProfileIcon from '@icons/ChatProfileIcon.svg';

interface CommentProps {
  comment: string;
}

/**
 *
 * @param comment - comment
 * @returns
 */
export const Comment = ({ comment }: CommentProps) => {
  return (
    <S.Comment>
      <S.Title>이렇게 해보는 건 어때요?</S.Title>
      <S.Container>
        <S.Icon src={ChatProfileIcon} alt="코멘트 아이콘" />
        <S.Description>{comment}</S.Description>
      </S.Container>
    </S.Comment>
  );
};
