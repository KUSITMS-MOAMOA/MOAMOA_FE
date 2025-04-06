import { useNavigate } from 'react-router-dom';
import * as S from './Content.Style';
import { List } from '../../common/list/List';
import { useEffect, useState } from 'react';
import { getRecords } from '@/api/Home';
import { Empty } from '@/components/common/empty/Empty';

interface LISTPROPS {
  title: string;
  keywordList: string[];
  createdAt: string;
  folder: string;
  analysisId: number;
}
export const Content = () => {
  const navigate = useNavigate();
  const [listData, setListData] = useState<LISTPROPS[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRecords();
      if (data) {
        setListData(data);
      }
      setIsLoading(false); // 여기!
    };
    fetchData();
  }, []);

  return (
    <S.Content>
      <S.TextContainer>
        <S.Text>최근 작성된 경험을 모았어요</S.Text>
        <S.Plus
          onClick={() => {
            navigate('/list');
          }}
        >
          더보기
        </S.Plus>
      </S.TextContainer>
      <S.ListContainer $isEmpty={!isLoading && listData.length === 0}>
        {isLoading ? (
          <div />
        ) : listData.length === 0 ? (
          <Empty />
        ) : (
          listData.map((item, index) => (
            <List
              key={index}
              title={item.title}
              folder={item.folder}
              chips={item.keywordList}
              date={item.createdAt}
              onClick={() => {
                navigate(`/report/${item.analysisId}`);
              }}
            />
          ))
        )}
      </S.ListContainer>
    </S.Content>
  );
};
