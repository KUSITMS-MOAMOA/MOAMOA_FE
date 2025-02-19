import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Router } from './Router';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={Router} />
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker 등록 성공:', registration);
      })
      .catch((error) => {
        console.error('Service Worker 등록 실패:', error);
      });
  });
}