document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    let offset = 100; // Standard-Offset

    if (window.innerWidth < 1024) {
      offset = 50; // Offset für Viewport-Breite unter 1024 Pixel
    }

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const duration = 600; // Dauer des Scrollvorgangs in ms
      let timing = Math.min(progress / duration, 1);
      timing = timing < 0.5 ? 2 * timing * timing : -1 + (4 - 2 * timing) * timing; // Beschleunigung am Ende

      window.scrollTo(0, startPosition + distance * timing);

      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        // Bounce-Effekt nach dem Scrollen
        window.scrollTo(0, targetPosition + 10);
        setTimeout(() => {
          window.scrollTo(0, targetPosition);
        }, 100);
      }
    }

    window.requestAnimationFrame(step);
  });
});
