function navigateTo(packageName) {
  window.location.href = packageName + '.html';
}

document.addEventListener('DOMContentLoaded', function () {
  const previewOverlay = document.getElementById('image-preview');
  const previewImg = document.getElementById('preview-img');
  const closeBtn = document.querySelector('.close-btn');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const images = document.querySelectorAll('.zoomable');
  let currentIndex = 0;

  function showImage(index) {
    if (index >= 0 && index < images.length) {
      previewImg.src = images[index].src;
      currentIndex = index;
      previewOverlay.classList.add('show');
      requestAnimationFrame(() => (previewImg.style.transform = 'scale(1)'));
    }
  }

  images.forEach((img, index) => {
    img.addEventListener('click', () => showImage(index), { passive: true });
  });

  closeBtn.addEventListener('click', () => {
    previewOverlay.classList.remove('show');
  });

  prevBtn.addEventListener('click', function () {
    showImage(currentIndex - 1);
  });

  nextBtn.addEventListener('click', function () {
    showImage(currentIndex + 1);
  });

  // Tutup preview dengan klik di luar gambar
  previewOverlay.addEventListener('click', (e) => {
    if (e.target === previewOverlay) {
      previewOverlay.classList.remove('show');
    }
  });

  document.addEventListener('keydown', function (e) {
    if (previewOverlay.style.display === 'flex') {
      if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
      if (e.key === 'ArrowRight') showImage(currentIndex + 1);
      if (e.key === 'Escape') previewOverlay.style.display = 'none';
    }
  });

  // Lazy Load Gambar
  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    });
  });
});
