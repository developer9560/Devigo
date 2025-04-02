// Animation utility functions for DEVIGO website

// Function to check if an element is in the viewport
export const isInViewport = (element, offset = 100) => {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
    rect.bottom >= 0
  );
};

// Animate elements when they enter the viewport
export const animateOnScroll = () => {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  animatedElements.forEach(element => {
    if (isInViewport(element)) {
      element.classList.add('animated');
    }
  });
};

// Animate number counting
export const animateNumbers = (element, target, duration = 2000) => {
  if (!element) return;
  
  let start = 0;
  const increment = target / (duration / 16);
  const startTime = performance.now();
  
  const updateNumber = (timestamp) => {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentValue = Math.floor(progress * target);
    
    element.textContent = currentValue.toLocaleString();
    
    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    } else {
      element.textContent = target.toLocaleString();
    }
  };
  
  requestAnimationFrame(updateNumber);
};

// Initialize all animations
export const initAnimations = () => {
  // Set up scroll listener
  window.addEventListener('scroll', () => {
    animateOnScroll();
  }, { passive: true });
  
  // Run once on page load
  setTimeout(() => {
    animateOnScroll();
  }, 100);
  
  // Animate stat numbers
  const statElements = document.querySelectorAll('.stat-number');
  if (statElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-target'), 10);
          animateNumbers(entry.target, target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    statElements.forEach(el => observer.observe(el));
  }
};

// Parallax effect for hero section
export const initParallax = () => {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-speed') || 0.5;
      element.style.transform = `translateY(${scrollTop * speed}px)`;
    });
  }, { passive: true });
};

// Typing effect for hero titles
export const typeWriter = (element, text, speed = 100) => {
  if (!element) return;
  
  let i = 0;
  element.textContent = '';
  
  const type = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  };
  
  type();
};

// Initialize typing effect
export const initTypingEffect = () => {
  const typingElement = document.querySelector('.typing-effect');
  if (typingElement) {
    const text = typingElement.getAttribute('data-text');
    if (text) {
      typeWriter(typingElement, text);
    }
  }
};

// Export all initialization functions as a single function
export const initAllAnimations = () => {
  initAnimations();
  initParallax();
  initTypingEffect();
}; 