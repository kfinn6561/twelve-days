/**
 * Platform detection utility for desktop vs mobile
 * Used to determine behavior differences (animation duration, audio handling)
 */

/**
 * Detects if the current device is mobile based on screen width and user agent
 * @returns {boolean} True if mobile device, false if desktop
 */
export const isMobile = () => {
  // Check screen width first (mobile breakpoint at 768px)
  const isMobileWidth = window.innerWidth < 768;

  // Check user agent for mobile device indicators
  const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  // Also check for touch capability
  const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Consider it mobile if either width is small OR it's a mobile user agent with touch
  return isMobileWidth || (isMobileUserAgent && hasTouchScreen);
};

/**
 * Detects if the device has touch capability
 * @returns {boolean} True if touch is supported
 */
export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

/**
 * Gets the platform type
 * @returns {'mobile' | 'desktop'} Platform type
 */
export const getPlatform = () => {
  return isMobile() ? 'mobile' : 'desktop';
};

/**
 * React hook for platform detection with responsive updates
 * @returns {{isMobile: boolean, isDesktop: boolean, platform: string}}
 */
export const usePlatform = () => {
  const [platform, setPlatform] = useState(getPlatform());

  useEffect(() => {
    const handleResize = () => {
      setPlatform(getPlatform());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile: platform === 'mobile',
    isDesktop: platform === 'desktop',
    platform
  };
};

// Note: useState and useEffect would be imported from React when this file is used
// For now, this provides the core detection logic
