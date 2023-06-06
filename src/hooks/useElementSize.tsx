import { useState, useEffect, RefObject } from 'react';

interface Dimensions {
  width: number;
  height: number;
}

const useElementSize = (ref: RefObject<HTMLElement>, isOpen: Boolean): Dimensions => {
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });

  useEffect(() => {
    setTimeout(() => {
      if (!isOpen && !ref.current) return

      
      const updateSize = () => {
        if(ref.current) {
          console.log('set dimentsion: ', ref.current.offsetWidth)
          setDimensions({
            width: ref.current.offsetWidth,
            height: ref.current.offsetHeight,
          });
        }
      

      };

      updateSize()

      window.addEventListener('resize', updateSize);

      return () => window.removeEventListener('resize', updateSize);

    }, 0)


  }, [ref, isOpen])

  return dimensions;
};

export default useElementSize