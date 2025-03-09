import { useNavigate } from 'react-router-dom';
import * as S from './Header.Style';
import { CategoryChip } from '../../common/chip/CategoryChip';
import FolderIcon from '@icons/FolderIcon.svg';
import { Header } from '@/components/layout/header/Header';
import { FolderListProps } from '@/types/Folder';
import ListPageIcon from '@/assets/icons/ListPageIcon.svg';

interface ListHeaderProps {
  folderData: FolderListProps[];
  selectFolder: string;
  onClick: (folderName: string) => void;
  onClickSideBar: () => void;
}

/**
 *
 * @param folderData - 폴더 리스트 | null
 * @param selectFolder - 선택된 폴더 값
 * @param onClick - 폴더를 선택하는 함수
 * @param onClickSideBar - 사이드바 핸들링 함수
 * @returns
 */
export const ListHeader = ({
  folderData,
  selectFolder,
  onClick,
  onClickSideBar,
}: ListHeaderProps) => {
  const navigate = useNavigate();
  const nickname = localStorage.getItem('nickname');

  const goToFolderPage = () => {
    navigate('/folder');
  };

  return (
    <S.Header>
      <Header onClick={onClickSideBar} />
      <S.Title>{nickname}님의 경험 모아보기</S.Title>
      <S.Image src={ListPageIcon} />
      <S.FolderContainer>
        <S.ChipContainer>
          <S.FolderIcon onClick={goToFolderPage}>
            <S.Icon src={FolderIcon} alt="FolderIcon" />
          </S.FolderIcon>
          <CategoryChip isSelected={selectFolder === 'all'} onClick={() => onClick('all')}>
            전체
          </CategoryChip>
          {folderData &&
            folderData.map((item) => (
              <CategoryChip
                key={item.folderId}
                isSelected={item.title === selectFolder}
                onClick={() => onClick(item.title)}
              >
                {item.title}
              </CategoryChip>
            ))}
        </S.ChipContainer>
      </S.FolderContainer>
    </S.Header>
  );
};
