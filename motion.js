// motion.js
// Intersection Observer for scroll animations

document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target); // Animate only once
      }
    });
  }, observerOptions);

  // Target elements
  const animatedElements = document.querySelectorAll('.animate-item, .profile');
  animatedElements.forEach(el => observer.observe(el));
});
