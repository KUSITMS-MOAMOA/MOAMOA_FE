import { ChangeEvent, useState } from 'react';
import { Button } from '../button/Button';
import { Input } from '../input/Input';
import { BottomSheet } from '../bottomSheet/BottomSheet';
import * as S from './FolderPopUp.Style';
import CloseIcon from '@icons/CloseIcon.svg';
import { postNewFolder } from '@/api/Folder';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Modal } from '../modal/Modal';

interface FolderPopUpProps {
  onClick: (newFolder?: { folderId: number; title: string }) => void;
}

/**
 *
 * @param onClick - BottomSheet 열고 닫는 함수
 * @returns
 */
export const FolderPopUp = ({ onClick }: FolderPopUpProps) => {
  const [folderName, setFolderName] = useState('');
  const [isError, setIsError] = useState(false);

  const isMobile = useMediaQuery('(max-width: 1048px)');

  const changeFolderName = (e: ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
    if (e.target.value.length > 15) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  const handleClickButton = async () => {
    const response = await postNewFolder(folderName);
    if (response.is_success) {
      // 생성된 폴더 정보를 부모 컴포넌트에 전달
      const newFolder = {
        folderId: response.data.folderDtoList[0].folderId,
        title: folderName,
      };
      onClick(newFolder);
    }
  };

  const Content = (
    <>
      <S.Header>
        <S.Title>새 폴더 추가하기</S.Title>
        <S.Icon src={CloseIcon} alt="closeIcon" onClick={() => onClick()} />
      </S.Header>
      <S.SheetContent>
        추가할 폴더의 이름을 적어주세요.
        <Input
          isError={isError}
          errorMessage="15자 이내의 폴더 이름을 입력해주세요"
          placeholder="최대 15자까지 입력할 수 있어요"
          value={folderName}
          onChange={changeFolderName}
        />
        <Button
          styleType="basic"
          disabled={folderName === '' || isError}
          onClick={handleClickButton}
        >
          완료
        </Button>
      </S.SheetContent>
    </>
  );

  return (
    <>
      {isMobile ? (
        <BottomSheet onClick={onClick}>{Content}</BottomSheet>
      ) : (
        <Modal onClick={onClick} isPC={true}>
          {Content}
        </Modal>
      )}
    </>
  );
};
