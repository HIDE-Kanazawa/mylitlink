document.addEventListener('DOMContentLoaded', () => {
  // Select all anchor links starting with #, excluding contact triggers
  const links = document.querySelectorAll('a[href^="#"]:not(.js-contact-trigger)');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = link.getAttribute('href');
      if (targetId === '#' || targetId === '') {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Fallback for top
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      // Calculate position with header offset
      const headerOffset = 70;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      // Execute custom fast scroll
      // Duration: 1000ms (Smooth and elegant)
      smoothScrollTo(offsetPosition, 1000);
    });
  });
});

/**
 * Custom smooth scroll function with easing
 * @param {number} targetPosition - Y coordinate to scroll to
 * @param {number} duration - Duration in milliseconds
 */
function smoothScrollTo(targetPosition, duration) {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;

    // Easing function: easeOutExpo (Very fast start, smooth end)
    const run = easeOutExpo(timeElapsed, startPosition, distance, duration);

    window.scrollTo(0, run);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      // Ensure it lands exactly on target
      window.scrollTo(0, targetPosition);
    }
  }

  // Easing: easeOutExpo
  // t: current time, b: start value, c: change in value, d: duration
  function easeOutExpo(t, b, c, d) {
    return (t === d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
  }

  requestAnimationFrame(animation);
}
