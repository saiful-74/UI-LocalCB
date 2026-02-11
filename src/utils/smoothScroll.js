// Smooth scroll utilities for Lenis
export const scrollTo = (target, options = {}) => {
  if (window.lenis) {
    window.lenis.scrollTo(target, {
      offset: 0,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      ...options
    });
  } else {
    // Fallback for browsers without Lenis
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    } else if (typeof target === 'number') {
      window.scrollTo({
        top: target,
        behavior: 'smooth'
      });
    }
  }
};

export const scrollToTop = (options = {}) => {
  scrollTo(0, options);
};

export const scrollToElement = (selector, options = {}) => {
  scrollTo(selector, options);
};

export default { scrollTo, scrollToTop, scrollToElement };