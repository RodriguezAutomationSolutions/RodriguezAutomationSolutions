const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');
const languageButtons = document.querySelectorAll('.lang-button');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const pageMeta = {
  en: {
    title: 'Rodríguez Automation Solutions | Business Process Automation',
    description: 'Practical automation solutions for small and medium-sized businesses. Automate repetitive work, save time, reduce errors, and improve operations with Python, Power Automate, Excel/VBA, Power Apps, APIs, and RPA.',
    ogDescription: 'Automate repetitive work. Save time. Reduce errors.'
  },
  es: {
    title: 'Rodríguez Automation Solutions | Automatización de Procesos',
    description: 'Soluciones prácticas de automatización para pequeñas y medianas empresas. Automatiza trabajo repetitivo, ahorra tiempo, reduce errores y mejora operaciones con Python, Power Automate, Excel/VBA, Power Apps, APIs y RPA.',
    ogDescription: 'Automatiza el trabajo repetitivo. Ahorra tiempo. Reduce errores.'
  }
};

function setLanguage(lang) {
  const safeLang = lang === 'es' ? 'es' : 'en';

  document.documentElement.lang = safeLang;

  document.querySelectorAll('[data-en][data-es]').forEach(element => {
    element.textContent = element.dataset[safeLang];
  });

  document.querySelectorAll('[data-en-html][data-es-html]').forEach(element => {
    element.innerHTML = element.dataset[`${safeLang}Html`];
  });

  document.querySelectorAll('[data-en-href][data-es-href]').forEach(element => {
    element.setAttribute('href', element.dataset[`${safeLang}Href`]);
  });

  document.querySelectorAll('[data-en-aria][data-es-aria]').forEach(element => {
    element.setAttribute('aria-label', element.dataset[`${safeLang}Aria`]);
  });

  languageButtons.forEach(button => {
    const active = button.dataset.lang === safeLang;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  document.title = pageMeta[safeLang].title;

  const description = document.getElementById('meta-description');
  const ogDescription = document.getElementById('og-description');

  if (description) description.setAttribute('content', pageMeta[safeLang].description);
  if (ogDescription) ogDescription.setAttribute('content', pageMeta[safeLang].ogDescription);

  localStorage.setItem('ras-language', safeLang);
}

languageButtons.forEach(button => {
  button.addEventListener('click', () => setLanguage(button.dataset.lang));
});

const savedLanguage = localStorage.getItem('ras-language');
setLanguage(savedLanguage === 'es' ? 'es' : 'en');

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
