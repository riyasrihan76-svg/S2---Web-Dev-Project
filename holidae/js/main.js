// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// ===== BOOKING PRICE CALCULATOR =====
const guestsSelect = document.getElementById('guests');
const roomSelect = document.getElementById('room');
const totalPriceEl = document.getElementById('totalPrice');

const BASE_PRICE = 599;
const TAX = 60; // per person

const roomPrices = {
  'Standard Room': 0,
  'Deluxe Room': 80,
  'Private Villa': 250
};

function updatePrice() {
  if (!guestsSelect || !roomSelect || !totalPriceEl) return;

  const guests = parseInt(guestsSelect.value);
  const room = roomSelect.value;
  const roomExtra = roomPrices[room] || 0;
  const subtotal = (BASE_PRICE + roomExtra) * guests;
  const taxes = TAX * guests;
  const total = subtotal + taxes;

  // Update the base price row
  const rows = document.querySelectorAll('.price-row span:last-child');
  if (rows[0]) rows[0].textContent = '£' + subtotal.toLocaleString();
  if (rows[1]) rows[1].textContent = '£' + taxes.toLocaleString();
  totalPriceEl.textContent = '£' + total.toLocaleString();
}

if (guestsSelect) guestsSelect.addEventListener('change', updatePrice);
if (roomSelect) roomSelect.addEventListener('change', updatePrice);

// ===== BOOKING CONFIRMATION =====
function confirmBooking() {
  const depart = document.getElementById('depart');
  if (!depart || !depart.value) {
    alert('Please select a departure date to continue.');
    return;
  }
  const guests = guestsSelect ? guestsSelect.value : '2';
  const room = roomSelect ? roomSelect.value : 'Standard Room';
  alert(`🎉 Booking Confirmed!\n\nBali Bliss Package\nDate: ${depart.value}\nGuests: ${guests}\nRoom: ${room}\n\nThank you for booking with Holidae! You'll receive a confirmation email shortly.`);
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== FADE-IN ON SCROLL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .why-card, .testimonial, .itin-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
