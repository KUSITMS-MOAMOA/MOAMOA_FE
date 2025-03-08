export const register = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js", {
        scope: '/',
      })
      .then((registration) => {
        console.log("Service worker registration succeeded", registration);

        // 서비스 워커 업데이트 감지
        registration.onupdatefound = () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.onstatechange = () => {
              if (newWorker.state === "installed") {
                console.log("New service worker available. Refreshing...");
                newWorker.postMessage({ type: "SKIP_WAITING" });
              }
            };
          }
        };
      })
      .catch((error) => {
        console.error("Service worker registration failed: ", error);
      });
  } else {
    console.log("Service workers are not supported.");
  }
}
