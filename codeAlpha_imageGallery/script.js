const images = document.querySelectorAll(".gallery img");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const filterBtns = document.querySelectorAll(".filters button");

let currentIndex = 0;

/* Open Lightbox */
images.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    showImage();
    lightbox.style.display = "flex";
  });
});

function showImage() {
  lightboxImg.src = images[currentIndex].src;
}

/* Navigation */
nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
};

prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
};

/* Close */
closeBtn.onclick = () => {
  lightbox.style.display = "none";
};

/* Filters (Bonus) */

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    document.querySelectorAll(".gallery img").forEach(img => {
      img.style.display =
        filter === "all" || img.dataset.category === filter
          ? "block"
          : "none";
    });
  });
});


if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => console.log("Service Worker registered"))
      .catch(err => console.log("SW error:", err));
  });
}
let deferredPrompt;

window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  deferredPrompt = e;
});

function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt = null;
  }
}
const gallery = document.querySelector(".gallery");
const imageInput = document.getElementById("imageInput");
const categorySelect = document.getElementById("categorySelect");
const uploadBtn = document.getElementById("uploadBtn");

let userImages = JSON.parse(localStorage.getItem("userImages")) || [];
uploadBtn.addEventListener("click", () => {
  const file = imageInput.files[0];
  const category = categorySelect.value;

  if (!file) {
    alert("Please select an image");
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    const imageData = {
      src: reader.result,
      category
    };

    userImages.push(imageData);
    localStorage.setItem("userImages", JSON.stringify(userImages));
    addImageToGallery(imageData);
  };

  reader.readAsDataURL(file);
});
function addImageToGallery(image) {
  const img = document.createElement("img");
  img.src = image.src;
  img.dataset.category = image.category;

  gallery.appendChild(img);

  // Enable lightbox click
  img.addEventListener("click", () => {
    currentIndex = [...gallery.children].indexOf(img);
    showImage();
    lightbox.style.display = "flex";
  });
}

window.addEventListener("load", () => {
  userImages.forEach(img => addImageToGallery(img));
});