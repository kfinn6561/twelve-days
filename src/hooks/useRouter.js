import { useState, useEffect } from 'react';

export function useRouter() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  return { currentPath, navigate };
}

export function matchRoute(path) {
  if (path === '/' || path === '') {
    return { type: 'home' };
  }

  const detailMatch = path.match(/^\/gift\/(\d+)$/);
  if (detailMatch) {
    const id = parseInt(detailMatch[1], 10);
    if (id >= 1 && id <= 12) {
      return { type: 'detail', id };
    }
  }

  return { type: 'notfound' };
}
