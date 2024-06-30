document.addEventListener('DOMContentLoaded', () => {
    const targetElement = document.querySelector('.mouse');
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    window.addEventListener('scroll', () => {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScrollTop >= 80) {
            fadeOut(targetElement);
        } else {
            fadeIn(targetElement);
        }

        lastScrollTop = currentScrollTop;
    });

    function fadeOut(element) {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.4s ease-in-out';
    }

    function fadeIn(element) {
        element.style.opacity = '1';
        element.style.transition = 'opacity 0.6s ease-in-out';
    }
});

