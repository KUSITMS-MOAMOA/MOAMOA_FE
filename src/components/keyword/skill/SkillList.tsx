import * as S from './SkillList.Style';
import { SkillData } from '@/types/SkillData';

interface SkillListProps {
  chartData: SkillData[];
  onClick: () => void;
  setSelectedKeyword: React.Dispatch<React.SetStateAction<string | undefined>>;
}

/**
 *
 * @param onClick - 클릭 시 수행하는 함수
 * @param setSelectedKeyword - setSelectedKeyword
 * @returns
 */
export const SkillList = ({ chartData, onClick, setSelectedKeyword }: SkillListProps) => {

  const topSkills = chartData
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 7);

  return (
    <S.Container>
      <S.Line />
      <S.ListItemContainer>
        {topSkills.map((skill) => (
          <S.ListItem
            key={skill.keyword}
            $percent={skill.percent}
            onClick={() => {
              setSelectedKeyword(skill.keyword);
              onClick();
            }}
          >
            <S.TitleWrapper>
              <S.Title>{skill.keyword}</S.Title>
              <S.Percent>{skill.percent}%</S.Percent>
            </S.TitleWrapper>
            <S.CountCircle $percent={skill.percent}>
              <S.Count>{skill.count}</S.Count>
            </S.CountCircle>
          </S.ListItem>
        ))}
      </S.ListItemContainer>
    </S.Container>
  );
};
