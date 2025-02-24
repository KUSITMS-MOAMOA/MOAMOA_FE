import { useState, useEffect } from 'react';
import { HomeHeader } from '@components/home/header/Header';
import { Content } from '@components/home/content/Content';
import { RecordBottomSheet } from '@components/common/bottomSheet/RecordBottomSheet';
import { SideBar } from '@/components/common/sideBar/SideBar';
import { FloatingButton } from '@/components/common/button/FloatingButton';
import * as S from './HomePage.Style';
import { useLocation, useNavigate } from 'react-router-dom';
import { FeedbackModal } from '../feedbackPage/FeedbackModal';

export const HomePage = () => {
  const [openBottom, setOpenBottom] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  useEffect(() => {

    if (location.state?.recordType === 'CHAT' &&
      [1, 5, 10].includes(location.state?.chatRecordCount)) {
      setShowFeedbackModal(true);
      navigate('.', {
        replace: true,
        state: { recordId: location.state?.recordId },
      });
    }
  }, [location, navigate]);

  const toggleBottomSheet = () => {
    setOpenBottom((prev) => !prev);
  };

  const toggleSideBar = () => {
    setOpenSideBar((prev) => !prev);
  };

  return (
    <S.Container>
      <HomeHeader onClickSideBar={toggleSideBar} />
      <Content />
      <FloatingButton onClick={toggleBottomSheet} />
      {openBottom && <RecordBottomSheet onClick={toggleBottomSheet} />}
      {openSideBar && <SideBar onClick={toggleSideBar} />}
      {showFeedbackModal && <FeedbackModal onClose={() => setShowFeedbackModal(false)} recordId={state?.recordId} />}
    </S.Container>
  );
};
