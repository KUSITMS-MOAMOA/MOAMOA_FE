import * as S from './Skill.Style';

interface SkillProps {
  keyword: string;
  description: string;
  color?: boolean;
}

/**
 *
 * @param keyword - keyword
 * @param description - description
 * @param color - line의 color
 * @returns
 */
export const Skill = ({ keyword, description, color }: SkillProps) => {
  return (
    <S.Skill $color={color}>
      <S.Keyword>{keyword}</S.Keyword>
      <S.Line $color={color} />
      <S.Description>{description}</S.Description>
    </S.Skill>
  );
};
