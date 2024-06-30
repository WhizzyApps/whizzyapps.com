document.addEventListener("DOMContentLoaded", function () {
  // Add click event listeners to all elements with the class 'trigger'
  document.querySelectorAll(".trigger").forEach((item) => {
    item.addEventListener("click", function (event) {
      event.preventDefault();

      const type = this.getAttribute("data-type");
      const group = Array.from(this.classList).find(cls => cls.startsWith("group-"));

      if (group) {
        openGallery(group, this); // Open gallery if item is part of a group
      } else {
        openSingleItem(this); // Open single item otherwise
      }
    });
  });

  // Function to open a single item
  function openSingleItem(item) {
    const type = item.getAttribute("data-type");
    const popupContent = document.querySelector(".popup-content");
    popupContent.innerHTML = "";

    // Hide prev and next buttons for single item
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    prevBtn.style.visibility = "hidden";
    prevBtn.style.pointerEvents = "none";
    nextBtn.style.visibility = "hidden";
    nextBtn.style.pointerEvents = "none";

    switch (type) {
      case "image":
        const imageSrc = item.getAttribute("data-src");
        popupContent.innerHTML = `<img src="${imageSrc}" alt="popup-image">`;
        break;
      case "html":
        const htmlSrc = item.getAttribute("data-src");
        fetch(htmlSrc)
          .then(response => response.text())
          .then(data => {
            popupContent.innerHTML = data;
          })
          .finally(() => {
            setTimeout(openPopup, 100); // Open the popup after content is loaded
          });
        return; // Prevent immediate popup opening
      case "video":
        const videoSrc = item.getAttribute("data-src");
        popupContent.innerHTML = `<iframe width="560" height="315" src="${videoSrc}" frameborder="0" allowfullscreen></iframe>`;
        break;
    }

    setTimeout(openPopup, 100); // Open the popup
  }

  // Function to open a gallery of items
  function openGallery(group, element) {
    const items = document.querySelectorAll(`.${group}.trigger`);
    const popupContent = document.querySelector(".popup-content");
    let currentIndex = Array.from(items).indexOf(element);

    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    // Show prev and next buttons for gallery
    prevBtn.style.visibility = "visible";
    prevBtn.style.pointerEvents = "auto";
    nextBtn.style.visibility = "visible";
    nextBtn.style.pointerEvents = "auto";

    function updatePopup(index) {
      const currentItem = items[index];
      const type = currentItem.getAttribute("data-type");
      const src = currentItem.getAttribute("data-src");
      popupContent.innerHTML = "";

      switch (type) {
        case "image":
          popupContent.innerHTML = `<img src="${src}" alt="popup-image">`;
          break;
        case "html":
          fetch(src)
            .then(response => response.text())
            .then(data => {
              popupContent.innerHTML = data;
            })
            .finally(() => {
              setTimeout(openPopup, 100); // Open the popup after content is loaded
            });
          return; // Prevent immediate popup opening
        case "video":
          popupContent.innerHTML = `<iframe width="560" height="315" src="${src}" frameborder="0" allowfullscreen></iframe>`;
          break;
      }
    }

    // Event listener for previous button in gallery
    document.querySelector(".prev-btn").addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      updatePopup(currentIndex);
      setTimeout(openPopup, 100); // Open the popup after content is loaded
    });

    // Event listener for next button in gallery
    document.querySelector(".next-btn").addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % items.length;
      updatePopup(currentIndex);
      setTimeout(openPopup, 100); // Open the popup after content is loaded
    });

    updatePopup(currentIndex);
    openPopup();
  }

  // Function to open the popup
  function openPopup() {
    // Close any main.js popups
    const mainMenus = document.querySelectorAll('.navbar-menu');
    mainMenus.forEach(menu => {
      if (!menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
      }
    });

    // Make background non-scrollable and show popup
    document.body.classList.add("overflow-hidden");
    document.documentElement.style.overflow = 'hidden';
    const popup = document.getElementById("universal-popup");
    popup.classList.remove("popup-hidden");
  }

  // Function to close the popup
  function closePopup() {
    // Make background scrollable again and hide popup
    document.body.classList.remove("overflow-hidden");
    document.documentElement.style.overflow = '';
    const popup = document.getElementById("universal-popup");
    popup.classList.add("popup-hidden");
  }

  // Event listener for the close button
  document.querySelector(".close-btn").addEventListener("click", closePopup);
});
