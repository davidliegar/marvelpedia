import {useRef, useEffect, useState, useCallback } from 'react';

function useInfiniteScroll() {
  const loadMoreRef = useRef(null);
  const [hasIntersect, setHasIntersect ] = useState(false)
  
  const intersectionCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    setHasIntersect(target.isIntersecting)
  }, [])
  
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    };

    const observer = new IntersectionObserver(intersectionCallback, option);

    const currentLoader = loadMoreRef.current;
    
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loadMoreRef, intersectionCallback]);

  return { loadMoreRef, hasIntersect, setHasIntersect };
}

export default useInfiniteScroll;