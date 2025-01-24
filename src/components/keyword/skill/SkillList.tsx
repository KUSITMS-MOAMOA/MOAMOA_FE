import * as S from './SkillList.Style';
import { getGraph } from '@/api/Graph';
import { SkillData } from '@/types/SkillData';
import { useState, useEffect } from 'react';

interface SkillListProps {
  onClick: () => void;
  setSelectedKeyword: React.Dispatch<React.SetStateAction<string | undefined>>;
}

/**
 *
 * @param onClick - 클릭 시 수행하는 함수
 * @param setSelectedKeyword - setSelectedKeyword
 * @returns
 */
export const SkillList = ({ onClick, setSelectedKeyword }: SkillListProps) => {
  const [chartData, setChartData] = useState<SkillData[]>([]);

  useEffect(() => {
    const fetchGraphData = async () => {
      const data = await getGraph();
      if (data) {
        const topSkills = data
          .sort((a: SkillData, b: SkillData) => b.percent - a.percent)
          .slice(0, 7);

        setChartData(
          topSkills.map((skill: SkillData) => ({
            keyword: skill.keyword,
            count: skill.count,
            percent: skill.percent,
          })),
        );
      }
    };
    fetchGraphData();
  }, []);

  return (
    <S.Container>
      <S.Line />
      <S.ListItemContainer>
        {chartData.map((skill) => (
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
