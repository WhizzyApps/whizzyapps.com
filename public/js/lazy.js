document.addEventListener("DOMContentLoaded", function() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    observer.unobserve(img);  // Stop observing the image after it has been loaded
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        observer.observe(img);
    });
});
