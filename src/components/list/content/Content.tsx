import { useNavigate } from 'react-router-dom';
import { List } from '../../common/list/List';
import { Empty } from '@/components/common/empty/Empty';
import { ListProps } from '@/types/Folder';
import { FloatingButton } from '@/components/common/button/FloatingButton';

interface ContentProps {
  listData: ListProps[];
  onClick: () => void;
}

/**
 *
 * @param listData - listData
 * @param onClick - 클릭 시 수행하는 함수
 * @returns
 */
export const Content = ({ listData, onClick }: ContentProps) => {
  const navigate = useNavigate();

  return (
    <>
      {listData.length > 0 ? (
        listData.map((item) => (
          <List
            key={item.analysisId}
            title={item.title}
            chips={item.keywordList}
            date={item.createdAt}
            onClick={() => {
              navigate(`/report/${item.analysisId}`);
            }}
          />
        ))
      ) : (
        <>
          <Empty />
        </>
      )}
      <FloatingButton onClick={onClick} />
    </>
  );
};
