import {useCallback, useEffect, useRef, useState } from 'react';

function useInfiniteScroll() {
  const loadMoreRef = useRef(null),
   [hasIntersect, setHasIntersect ] = useState(false),
  
   intersectionCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    setHasIntersect(target.isIntersecting)
  }, [])
  
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    },

     observer = new IntersectionObserver(intersectionCallback, option),

     currentLoader = loadMoreRef.current;
    
    if (currentLoader) {observer.observe(currentLoader);}

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loadMoreRef, intersectionCallback]);

  return { loadMoreRef, hasIntersect, setHasIntersect };
}

export default useInfiniteScroll;