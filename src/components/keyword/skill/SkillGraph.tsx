import { PieChart, Pie, Cell } from 'recharts';
import * as S from './SkillGraph.Style';
import { SkillData } from '@/types/SkillData';
import { Colors } from '@/styles/colors';

interface SkillGraphProps {
  chartData: SkillData[];
}

export const SkillGraph = ({ chartData }: SkillGraphProps) => {

  const graphData = chartData
    .sort((a: SkillData, b: SkillData) => b.percent - a.percent)
    .slice(0, 7)
    .map((skill: SkillData) => ({
      name: skill.keyword,
      value: skill.count,
      percent: skill.percent,
    }));

  const getChartColor = (percent: number) => {
    if (percent > 33) return Colors.blue200;
    if (percent > 25) return Colors.blue100;
    if (percent > 20) return Colors.yellow200;
    if (percent > 10) return Colors.yellow50;
    return Colors.gray25;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, name, fill }: { cx: number; cy: number; midAngle: number; outerRadius: number; name: string; fill: string }) => {
    const RADIAN = Math.PI / 180;

    const lineStartRadius = outerRadius;
    const xLineStart = cx + lineStartRadius * Math.cos(-midAngle * RADIAN);
    const yLineStart = cy + lineStartRadius * Math.sin(-midAngle * RADIAN);

    const lineEndRadius = outerRadius + 10;
    const xLineEnd = cx + lineEndRadius * Math.cos(-midAngle * RADIAN);
    const yLineEnd = cy + lineEndRadius * Math.sin(-midAngle * RADIAN);

    const textOffset = 10;
    const xText = xLineEnd + (xLineEnd > cx ? textOffset : -textOffset);
    const yText = yLineEnd;
    const textAnchor = xLineEnd > cx ? 'start' : 'end';

    return (
      <>
        <line
          x1={xLineStart}
          y1={yLineStart}
          x2={xLineEnd}
          y2={yLineEnd}
          stroke={fill}
          strokeWidth={2}
        />
        <text
          x={xText}
          y={yText}
          textAnchor={textAnchor}
          dominantBaseline="middle"
          style={S.CustomizedLabelStyle}
        >
          {name}
        </text>
      </>
    );
  };

  return (
    <S.GraphContainer>
      <PieChart width={S.CHART_STYLES.width} height={S.CHART_STYLES.height}>
        <Pie
          data={graphData}
          innerRadius={S.CHART_STYLES.innerRadius}
          outerRadius={S.CHART_STYLES.outerRadius}
          cornerRadius={S.CHART_STYLES.cornerRadius}
          paddingAngle={S.CHART_STYLES.paddingAngle}
          {...S.CHART_STYLES.pieProps}
          label={renderCustomizedLabel}
          labelLine={false}
        >
          {graphData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getChartColor(entry.percent)} />
          ))}
        </Pie>
      </PieChart>
    </S.GraphContainer>
  );
};
