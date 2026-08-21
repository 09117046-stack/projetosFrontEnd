// ── NAVBAR: scroll effect + smooth anchors ──
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    closeMenu();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
});

function closeMenu() {
  navLinks.classList.remove('open');
  hamburger.classList.remove('open');
}

// ── PORTFOLIO FILTER ──
const filterBtns   = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    portfolioItems.forEach(item => {
      const match = filter === 'Todos' || item.dataset.category === filter;
      item.classList.toggle('hidden', !match);
    });
  });
});

// ── CONTACT FORM VALIDATION ──
const form        = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const formAlertError = document.getElementById('form-alert-error');

form.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;

  const nome     = document.getElementById('nome');
  const email    = document.getElementById('email');
  const mensagem = document.getElementById('mensagem');

  function validate(field, errorId, condition) {
    const err = document.getElementById(errorId);
    if (condition) {
      field.classList.add('error');
      err.classList.add('visible');
      valid = false;
    } else {
      field.classList.remove('error');
      err.classList.remove('visible');
    }
  }

  validate(nome,     'erro-nome',     !nome.value.trim());
  validate(email,    'erro-email',    !email.value.trim() || !/\S+@\S+\.\S+/.test(email.value));
  validate(mensagem, 'erro-mensagem', !mensagem.value.trim());

  if (!valid) {
    formAlertError.classList.add('visible');
    return;
  }

  formAlertError.classList.remove('visible');
  form.style.display = 'none';
  formSuccess.classList.add('visible');
});

// Clear error on input
['nome', 'email', 'mensagem'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    const field = document.getElementById(id);
    field.classList.remove('error');
    document.getElementById('erro-' + id).classList.remove('visible');
    formAlertError.classList.remove('visible');
  });
});

// ── RESET FORM ──
function resetForm() {
  form.reset();
  form.style.display = '';
  formSuccess.classList.remove('visible');
}

// ── FOOTER YEAR ──
document.getElementById('year').textContent = new Date().getFullYear();