// Accordion toggle
function toggleCard(header) {
  const content = header.nextElementSibling;
  const icon = header.querySelector('.toggle-icon');
  content.classList.toggle('active');
  icon.textContent = content.classList.contains('active') ? '−' : '+';
}

// Open PDF in modal
function openPDF(event, filePath, title) {
  event.stopPropagation();

  const modal = document.getElementById('pdfModal');
  const viewer = document.getElementById('pdfViewer');
  const pdfTitle = document.getElementById('pdfTitle');

  pdfTitle.textContent = title || 'Document';
  viewer.src = `${filePath}#zoom=50`; // 👈 add this zoom control
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// Close PDF modal
function closePDF() {
  const modal = document.getElementById('pdfModal');
  const viewer = document.getElementById('pdfViewer');
  viewer.src = '';
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Close when clicking outside modal
window.addEventListener('click', (e) => {
  const modal = document.getElementById('pdfModal');
  if (e.target === modal) closePDF();
});
