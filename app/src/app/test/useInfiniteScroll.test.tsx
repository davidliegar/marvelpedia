import { act, renderHook } from '@testing-library/react';
import useInfiniteScroll from '../useInfiniteScroll';

describe('useInfiniteScroll Hook', () => {
  beforeEach(() => {
    // Mock IntersectionObserver globally
    global.IntersectionObserver = class {
      callback: () => void

      constructor(callback: () => void) {
        this.callback = callback;
      }

      observe() { }
      unobserve() { }
      disconnect() { }

    } as any; //eslint-disable-line
  });

  it('should initialize with hasIntersect as false', () => {
    const { result } = renderHook(() => useInfiniteScroll());
    expect(result.current.hasIntersect).toBe(false);
  });

  it('should set hasIntersect to true when the element is intersecting', () => {
    const { result } = renderHook(() => useInfiniteScroll());

    act(() => {
      const observer = global.IntersectionObserver,
       mockObserver = new observer((entries) => {
        const [entry] = entries;
        result.current.setHasIntersect(entry.isIntersecting);
      });

      //eslint-disable-next-line
      (mockObserver as any).callback([{ isIntersecting: true }]); 
    });

    expect(result.current.hasIntersect).toBe(true);
  });

  it('should set hasIntersect to false when the element is not intersecting', () => {
    const { result } = renderHook(() => useInfiniteScroll());

    act(() => {
      const observer = global.IntersectionObserver,
       mockObserver = new observer((entries) => {
        const [entry] = entries;
        result.current.setHasIntersect(entry.isIntersecting);
      });

      // eslint-disable-next-line
      (mockObserver as any).callback([{ isIntersecting: false }]);
    });

    expect(result.current.hasIntersect).toBe(false);
  });
});
