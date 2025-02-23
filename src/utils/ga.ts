import ReactGA from "react-ga4";

// 환경 변수가 없을 경우를 대비한 fallback 값 설정
const gaTrackingId = import.meta.env.VITE_APP_GA_TRACKING_ID || 'G-2VSM2059HW';

/**
 * Google Analytics 초기화 함수
 */
export const initializeGA = () => {
  try {
    ReactGA.initialize(gaTrackingId);
    console.log('GA initialized successfully');
  } catch (error) {
    console.error('Failed to initialize GA:', error);
  }
};

/**
 * 페이지뷰 트래킹 함수
 * @param path 트래킹할 페이지 경로
 */
export const trackPageView = (path: string) => {
  try {
    ReactGA.send({ hitType: "pageview", page: path });
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
};

/**
 * 특정 이벤트 트래킹 함수 (선택)
 * @param category 이벤트 카테고리 (예: 'User', 'Button Click')
 * @param action 이벤트 액션 (예: 'Clicked Login')
 * @param label (선택) 추가 라벨 정보
 */
export const trackEvent = (category: string, action: string, label?: string) => {
  try {
    ReactGA.event({
      category,
      action,
      label,
    });
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};
