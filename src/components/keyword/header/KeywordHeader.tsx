import { Header } from '@/components/layout/header/Header';
import * as S from './KeywordHeader.style';

interface KeywordHeaderProps {
  currentTabBar: string;
  onClickSideBar: () => void;
  onClickTabBar: (item: string) => void;
}

/**
 *
 * @param currentTabBar - 현재 TabBar
 * @param onClickSideBar - SideBar 클릭 시 수행하는 함수
 * @param onClickTabBar - TabBar 클릭 시 수행하는 함수
 * @returns
 */
export const KeywordHeader = ({
  currentTabBar,
  onClickSideBar,
  onClickTabBar,
}: KeywordHeaderProps) => {
  const nickname = localStorage.getItem('nickname');

  return (
    <S.Header>
      <Header onClick={onClickSideBar} />
      <S.Content>
        {nickname}님의 경험을 <br /> 키워드로 모아봤어요
      </S.Content>
      <S.TabBar>
        <S.Item
          $isSelected={currentTabBar === '역량 키워드'}
          onClick={() => onClickTabBar('역량 키워드')}
        >
          역량 키워드
        </S.Item>
        <S.Item
          $isSelected={currentTabBar === '역량 그래프'}
          onClick={() => onClickTabBar('역량 그래프')}
        >
          역량 그래프
        </S.Item>
      </S.TabBar>
    </S.Header>
  );
};
