document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".trigger").forEach((item) => {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            handlePopupOpenWhenLoaded();
        });
    });
});

function handlePopupOpenWhenLoaded() {
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === 'childList' && document.getElementById("copy-button")) {
                handlePopupOpen();
                observer.disconnect();
            }
        });
    });

    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);
}

function handlePopupOpen() {
    const copyButton = document.getElementById("copy-button");

    if (copyButton) {
        copyButton.addEventListener("click", function () {
            const copyElement = document.getElementById("copy");

            if (copyElement) {
                const textToCopy = copyElement.textContent;
                navigator.clipboard.writeText(textToCopy).then(function () {
                    const popupContent = document.querySelector(".popup-content");
                    const tooltip = document.createElement('div');
                    tooltip.textContent = 'Copied to clipboard';
                    tooltip.classList.add('tooltip');
                    popupContent.appendChild(tooltip);
                    setTimeout(function() {
                        popupContent.removeChild(tooltip);
                    }, 2000);
                }, function (err) {
                    console.error('Fehler beim Kopieren des Textes: ', err);
                });

                const paragraph = document.querySelector(".popup-content p");
                paragraph.classList.remove('highlighter');
                void paragraph.offsetWidth;
                paragraph.classList.add('highlighter');
            } else {
                console.error("Das Element mit der ID 'copy' wurde nicht gefunden.");
            }
        });

        copyButton.addEventListener("mouseenter", function () {
            copyButton.classList.remove('pulse-blue');
            void copyButton.offsetWidth;
            copyButton.classList.add('pulse-blue');
        });

        copyButton.addEventListener("mouseleave", function () {
            copyButton.classList.remove('pulse-blue');
            void copyButton.offsetWidth;
            copyButton.classList.add('pulse-blue');
        });
    } else {
        console.error("Der Button mit der ID 'copy-button' wurde nicht gefunden.");
    }
}
