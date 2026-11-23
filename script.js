// 1. Menú hamburguesa responsive
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

// 2. Activar enlace del menú según scroll y cerrar menú móvil al hacer clic
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach((sec) => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        const activeLink = document.querySelector(`header nav a[href*=${id}]`);
        if (activeLink) activeLink.classList.add('active');
      });
    }
  });

  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
};

// 3. Efecto de texto escribiéndose en el Inicio
const textElement = document.querySelector('.multiple-text');
const roles = ['Desarrollador Web', 'Diseñador Frontend', 'Creador Digital'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];
  textElement.textContent = currentRole.substring(0, charIndex);

  if (!isDeleting && charIndex < currentRole.length) {
    charIndex++;
    setTimeout(typeEffect, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 60);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeEffect, isDeleting ? 1200 : 300);
  }
}
typeEffect();

// 4. Filtro de categorías en la Galería
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryBoxes = document.querySelectorAll('.galeria-box');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    galleryBoxes.forEach((box) => {
      if (filter === 'all' || box.getAttribute('data-category') === filter) {
        box.style.display = 'block';
      } else {
        box.style.display = 'none';
      }
    });
  });
});

// 5. Modal de vista previa en vivo para los proyectos de Netlify
const previewModal = document.getElementById('previewModal');
const modalIframe = document.getElementById('modalIframe');
const modalTitle = document.getElementById('modalTitle');
const modalExternalLink = document.getElementById('modalExternalLink');
const closeModal = document.getElementById('closeModal');

document.querySelectorAll('.preview-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const url = btn.getAttribute('data-url');
    const title = btn.getAttribute('data-title');
    modalTitle.textContent = title;
    modalIframe.src = url;
    modalExternalLink.href = url;
    previewModal.style.display = 'flex';
  });
});

function closePreviewModal() {
  previewModal.style.display = 'none';
  modalIframe.src = '';
}

closeModal.onclick = closePreviewModal;
previewModal.onclick = (e) => {
  if (e.target === previewModal) closePreviewModal();
};

// 6. Envío funcional del formulario de Contactos (sin recargar la página)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';
  formStatus.textContent = '';

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' },
    });

    if (response.ok) {
      formStatus.style.color = '#10b981';
      formStatus.textContent = '¡Mensaje enviado correctamente! Te responderé pronto.';
      contactForm.reset();
    } else {
      throw new Error('Error en el envío');
    }
  } catch (error) {
    formStatus.style.color = '#ef4444';
    formStatus.textContent = 'Hubo un problema al enviar. Revisa el correo configurado.';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar Mensaje';
  }
});
