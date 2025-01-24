import * as S from './Folder.Style';

interface FolderProps {
  children: React.ReactNode;
  type: 'folder' | 'plus';
  onClick?: () => void;
}

/**
 *
 * @param children - Folder의 children
 * @param type - Folder의 type, 'folder' | 'plus'
 * @param onClick - 클릭 시 수행하는 함수
 * @returns
 */
export const Folder = ({ children, type, onClick }: FolderProps) => {
  return (
    <S.Folder $type={type} onClick={onClick}>
      {children}
    </S.Folder>
  );
};
