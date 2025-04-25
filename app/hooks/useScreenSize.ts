import { useState, useEffect } from 'react';

export const useScreenSize = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Create the media query
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    // Handler function
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    // Set initial value
    handleChange(mediaQuery);

    // Add listener for changes
    mediaQuery.addListener(handleChange);

    // Cleanup
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  return isMobile;
}; 