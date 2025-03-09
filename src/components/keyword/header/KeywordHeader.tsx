import { Header } from '@/components/layout/header/Header';
import * as S from './KeywordHeader.style';
import KeywordIcon from '@/assets/icons/KeywordPageIcon.svg';

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
      <S.Image src={KeywordIcon} />
      <S.Content>
        {nickname}님의 경험의 역량 키워드
        <S.Description>경험을 역량 키워드로 모아볼 수 있어요</S.Description>
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
