import { useCallback, useEffect, useRef, useState } from 'react';
import { ListHeader } from '@components/list/header/Header';
import { Content } from '@components/list/content/Content';
import * as S from './ListPage.Style';
import { RecordBottomSheet } from '@components/common/bottomSheet/RecordBottomSheet';
import { SideBar } from '@/components/common/sideBar/SideBar';
import { FloatingButton } from '@/components/common/button/FloatingButton';
import { getFolderLists, getFolders } from '@/api/Folder';
import { FolderListProps, ListProps } from '@/types/Folder';

export const ListPage = () => {
  const [selectFolder, setSelectFolder] = useState('all');
  const [lastRecordId, setLastRecordId] = useState(0);
  const [openBottom, setOpenBottom] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [folderList, setFolderList] = useState<FolderListProps[]>([]);
  const [listData, setListData] = useState<ListProps[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  // 폴더 데이터 및 리스트 데이터 가져오기
  const getFolderData = async (folder: string, recordId: number) => {
    if (isFetching) return; // 이미 데이터 로딩 중이면 중지
    setIsFetching(true);
    try {
      const listResponse = await getFolderLists(folder, recordId);
      if (listResponse?.recordDtoList && listResponse.recordDtoList.length > 0) {
        setListData((prev) =>
          recordId === 0 ? listResponse.recordDtoList : [...prev, ...listResponse.recordDtoList],
        );
        setLastRecordId(
          listResponse.recordDtoList[listResponse.recordDtoList.length - 1]?.recordId || 0,
        );
        setHasNext(listResponse.hasNext);
      } else {
        setHasNext(false);
      }
    } finally {
      setIsFetching(false);
    }
  };

  // 폴더 목록 가져오기
  const fetchFolderList = async () => {
    const folderResponse = await getFolders();
    if (folderResponse) setFolderList(folderResponse);
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchFolderList();
    getFolderData(selectFolder, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectFolder]);

  const fetchMoreData = useCallback(async () => {
    // 데이터가 이미 로딩 중이거나 더 이상 데이터가 없을 경우 요청 중지
    if (isFetching || !hasNext) return;

    setIsFetching(true);
    await getFolderData(selectFolder, lastRecordId);
    setIsFetching(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectFolder, lastRecordId, hasNext, isFetching]);

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching && hasNext) {
          fetchMoreData();
        }
      },
      { rootMargin: '200px', threshold: 0.1 },
    );

    if (observerRef.current && hasNext) {
      observer.observe(observerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [fetchMoreData, isFetching, hasNext]);

  const handleSelectFolder = useCallback((folderName: string) => {
    if (folderName === 'all') {
      setSelectFolder('all');
    } else {
      setSelectFolder(folderName);
    }
    setListData([]);
    setLastRecordId(0);
  }, []);

  const handleToggleBottomSheet = useCallback(() => {
    setOpenBottom((prev) => !prev);
  }, []);

  const handleToggleSideBar = useCallback(() => {
    setOpenSideBar((prev) => !prev);
  }, []);

  return (
    <S.ListPage>
      <ListHeader
        nickname="코코"
        folderData={folderList}
        selectFolder={selectFolder}
        onClick={handleSelectFolder}
        onClickSideBar={handleToggleSideBar}
      />
      <S.Content>
        <Content listData={listData} />
        <div ref={observerRef} style={{ height: '20px' }} />
      </S.Content>
      <FloatingButton onClick={handleToggleBottomSheet} />
      {openBottom && <RecordBottomSheet onClick={handleToggleBottomSheet} />}
      {openSideBar && <SideBar onClick={handleToggleSideBar} />}
    </S.ListPage>
  );
};
