// Get modal elements (shared for both gallery and coating image)
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const captionText = document.getElementById('caption');
const closeBtn = document.querySelector('.close');

/* -------------------------------
   Handle click on gallery images
---------------------------------*/
document.querySelectorAll('.gallery-item img').forEach((img) => {
  img.addEventListener('click', () => {
    modal.style.display = 'block';
    modalImg.src = img.src;
    captionText.innerText = img.alt;

    // reset any coating image styles
    modalImg.removeAttribute('style');
  });
});

/* -------------------------------
   Handle click on coating image ONLY
---------------------------------*/
const coatingImage = document.querySelector('.coating-image');
if (coatingImage) {
  coatingImage.addEventListener('click', () => {
    modal.style.display = 'block';
    modalImg.src = coatingImage.src;
    captionText.innerText = coatingImage.alt;

    // ✅ Show at original full size (887x1200px)
    modalImg.style.width = '887px';
    modalImg.style.height = '1200px';
    modalImg.style.maxWidth = 'none';
    modalImg.style.maxHeight = 'none';
    modalImg.style.objectFit = 'none';
    modalImg.style.display = 'block';
    modalImg.style.margin = 'auto';
  });
}

/* -------------------------------
   Close modal logic
---------------------------------*/
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  modalImg.removeAttribute('style'); // reset image size
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    modalImg.removeAttribute('style'); // reset image size
  }
});
