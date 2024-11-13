import { useNavigate } from 'react-router-dom';
import * as S from './Content.Style';
import { Skill } from '../skill/Skill';
import { Comment } from '../comment/Comment';
import { SkillProps } from '@/types/Analysis';

interface ContentProps {
  data: SkillProps;
}

export const Content = ({ data }: ContentProps) => {
  const navigate = useNavigate();

  const goToChatPage = () => {
    if (data.chatRoomId) {
      navigate(`/chat/${data.chatRoomId}`);
    }
  };

  return (
    <S.Content>
      <S.TopContent>
        <S.Title>{data.recordTitle}</S.Title>
        <S.Description>{data.recordContent}</S.Description>
      </S.TopContent>
      <S.Line />
      <S.MiddleContent>
        <S.MiddleHead>
          <S.Title>코코님의 핵심 역량</S.Title>
          <S.ChatText onClick={goToChatPage}>채팅 다시보기</S.ChatText>
        </S.MiddleHead>
        {data.abilityDtoList.map((item, index) => (
          <Skill
            key={index}
            keyword={item.keyword}
            description={item.content}
            color={index % 2 !== 0}
          />
        ))}
      </S.MiddleContent>
      <S.Line />
      <Comment comment={data.comment} />
    </S.Content>
  );
};
