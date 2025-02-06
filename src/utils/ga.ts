import ReactGA from "react-ga4";

const gaTrackingId = import.meta.env.VITE_APP_GA_TRACKING_ID;

/**
 * Google Analytics 초기화 함수
 */
export const initializeGA = () => {
  if (!gaTrackingId) {
    console.error("GA Tracking ID가 설정되지 않았습니다.");
    return;
  }
  ReactGA.initialize(gaTrackingId);
};

/**
 * 페이지뷰 트래킹 함수
 * @param path 트래킹할 페이지 경로
 */
export const trackPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

/**
 * 특정 이벤트 트래킹 함수 (선택)
 * @param category 이벤트 카테고리 (예: 'User', 'Button Click')
 * @param action 이벤트 액션 (예: 'Clicked Login')
 * @param label (선택) 추가 라벨 정보
 */
export const trackEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};
