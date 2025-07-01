// === Modular JavaScript using ES6 Classes ===

class MobileMenu {
  constructor(buttonId, menuId) {
    this.button = document.getElementById(buttonId);
    this.menu = document.getElementById(menuId);
    this.init();
  }

  init() {
    if (!this.button || !this.menu) return;
    this.button.addEventListener('click', () => this.toggleMenu());
    document.addEventListener('click', (e) => this.handleOutsideClick(e));
    this.menu.querySelectorAll('a').forEach(link =>
      link.addEventListener('click', () => this.menu.classList.remove('active'))
    );
  }

  toggleMenu() {
    this.menu.classList.toggle('active');
  }

  handleOutsideClick(event) {
    if (!this.menu.contains(event.target) && !this.button.contains(event.target)) {
      this.menu.classList.remove('active');
    }
  }
}

class Calculator {
  constructor(sliderId, valueId, priceId, pricePerUnit = 3) {
    this.slider = document.getElementById(sliderId);
    this.valueDisplay = document.getElementById(valueId);
    this.priceDisplay = document.getElementById(priceId);
    this.pricePerUnit = pricePerUnit;
    this.init();
  }

  init() {
    if (!this.slider || !this.valueDisplay || !this.priceDisplay) return;
    this.slider.addEventListener('input', () => this.updateValues());
    this.updateValues();
  }

  updateValues() {
    const area = parseInt(this.slider.value, 10);
    this.valueDisplay.textContent = area;
    this.priceDisplay.textContent = `$${(area * this.pricePerUnit).toFixed(2)}`;
  }
}

class ContactForm {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.init();
  }

  init() {
    if (!this.form) return;
    this.form.addEventListener('submit', e => this.handleSubmit(e));
    this.setupRealtimeValidation();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.clearErrors();

    if (!this.validateForm()) return;

    this.showSuccess();
    this.form.reset();
    this.form.scrollIntoView({ behavior: 'smooth' });
  }

  setupRealtimeValidation() {
    this.form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('blur', () => this.validateField(field));
      field.addEventListener('input', () => {
        if (field.classList.contains('error')) this.validateField(field);
      });
    });
  }

  validateForm() {
    const requiredFields = ['firstName', 'lastName', 'email', 'message'];
    return requiredFields.every(id => this.validateField(this.form.querySelector(`#${id}`)));
  }

  validateField(field) {
    if (!field) return true;

    const value = field.value.trim();
    let errorMessage = '';
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?\d{7,16}$/;

    if (field.hasAttribute('required') && !value) {
      errorMessage = 'This field is required.';
    } else if (field.type === 'email' && value && !emailRegex.test(value)) {
      errorMessage = 'Please enter a valid email address.';
    } else if (field.type === 'tel' && value && !phoneRegex.test(value.replace(/[\s\-()]/g, ''))) {
      errorMessage = 'Please enter a valid phone number.';
    } else if ((field.id === 'firstName' || field.id === 'lastName') && !nameRegex.test(value)) {
      errorMessage = 'Please enter a valid name.';
    }

    if (errorMessage) {
      field.classList.add('error');
      this.showError(field, errorMessage);
      return false;
    }

    return true;
  }

  showError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.closest('.form-group')?.appendChild(errorDiv);
  }

  clearErrors() {
    this.form.querySelectorAll('.error-message').forEach(e => e.remove());
    this.form.querySelectorAll('.error').forEach(f => f.classList.remove('error'));
    this.form.querySelector('.success-message')?.remove();
  }

  showSuccess() {
    const msg = document.createElement('div');
    msg.className = 'success-message';
    msg.innerHTML = '<strong>Success!</strong> Your message has been sent.';
    this.form.insertBefore(msg, this.form.firstChild);
    setTimeout(() => msg.remove(), 5000);
  }
}

class SmoothScroll {
  static init() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }
}

class PageHighlighter {
  static highlight() {
    const current = window.location.pathname.split('/').pop() || 'home.html';
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
      if (link.getAttribute('href') === current) link.classList.add('active');
    });
  }
}

class AnimateOnScroll {
  static init() {
    const items = document.querySelectorAll('.contact-item');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    items.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(item);
    });
  }
}

// === Init all on DOM load ===
document.addEventListener('DOMContentLoaded', () => {
  new MobileMenu('mobileMenuBtn', 'mobileMenu');
  new Calculator('areaSlider', 'areaValue', 'priceDisplay');
  new ContactForm('contactForm');
  SmoothScroll.init();
  PageHighlighter.highlight();
  AnimateOnScroll.init();
});




document.addEventListener('DOMContentLoaded', () => {
  const processCards = document.querySelectorAll('.process-card');

  processCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const imageUrl = card.dataset.image;
      if (imageUrl) {
        const imagePreview = document.createElement('div');
        imagePreview.classList.add('hover-image-preview');
        imagePreview.style.backgroundImage = `url(${imageUrl})`;
        card.appendChild(imagePreview);
      }
    });

    card.addEventListener('mouseleave', () => {
      const preview = card.querySelector('.hover-image-preview');
      if (preview) preview.remove();
    });
  });
});








async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const resultBox = document.getElementById('weatherResult');

  if (!city) {
    resultBox.innerText = "Please enter a city name.";
    return;
  }

  resultBox.innerText = "Loading...";

  try {
    const response = await fetch(`https://open-weather13.p.rapidapi.com/city/${city}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'open-weather13.p.rapidapi.com',
        'x-rapidapi-key': '28d0e46c6fmshde4052a283c216fpf1f9110jsnfe3263d555b0'
      }
    });

    if (!response.ok) throw new Error("City not found or API issue.");

    const data = await response.json();

    resultBox.innerHTML = `
      <strong>Weather in ${data.name}:</strong><br/>
      Temperature: ${data.main.temp} °C<br/>
      Feels Like: ${data.main.feels_like} °C<br/>
      Humidity: ${data.main.humidity}%<br/>
      Wind Speed: ${data.wind.speed} m/s
    `;
  } catch (error) {
    resultBox.innerText = "Sorry, we couldn't fetch the weather. Please try another city.";
    console.error(error);
  }
}

 

const rugTips = [
  "Did you know your carpet can hold up to four times its weight in dirt?",
  "Experts recommend deep-cleaning your rugs at least once a year.",
  "80% of the dirt in your home is brought in on your shoes — your rugs catch most of it!",
  "Bacteria, allergens, and dust mites love carpets. Deep cleaning keeps your air healthier. Clean rugs = cleaner air",
  "Vacuuming weekly isn't enough — steam or deep-cleaning gets the dirt stuck deep down.",
  "Rugs in high-traffic areas should be professionally cleaned every 6-12 months.",
  "Drying rugs completely after cleaning prevents mold and mildew.",
  "Use a doormat — it reduces up to 70% of the dirt tracked onto your rugs.",
  "Dirty rugs lose their quality 3x faster than clean ones."
];

function showRugTip() {
  const tip = rugTips[Math.floor(Math.random() * rugTips.length)];
  document.getElementById("rugTip").innerText = tip;
}
