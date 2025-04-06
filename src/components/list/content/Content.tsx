import { useNavigate } from 'react-router-dom';
import { List } from '../../common/list/List';
import { Empty } from '@/components/common/empty/Empty';
import { ListProps } from '@/types/Folder';
import { FloatingButton } from '@/components/common/button/FloatingButton';

interface ContentProps {
  listData: ListProps[];
  onClick: () => void;
  isLoading: boolean;
}

/**
 *
 * @param listData - listData
 * @param onClick - 클릭 시 수행하는 함수
 * @param isLoading - 로딩
 * @returns
 */
export const Content = ({ listData, onClick, isLoading }: ContentProps) => {
  const navigate = useNavigate();

  return (
    <>
      {isLoading ? (
        <div />
      ) : listData.length > 0 ? (
        listData.map((item) => (
          <List
            key={item.analysisId}
            title={item.title}
            chips={item.keywordList}
            date={item.createdAt}
            folder={item.folder}
            onClick={() => {
              navigate(`/report/${item.analysisId}`);
            }}
          />
        ))
      ) : (
        <Empty />
      )}
      <FloatingButton onClick={onClick} />
    </>
  );
};
