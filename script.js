
window.addEventListener("load", function() {
      setTimeout(() => {
        document.getElementById("loader").style.display = "none";
        document.getElementById("content").style.display = "block";
      }, 2000); // loader stays for 2s after page load
    });

    // Reveal animations on scroll
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll("section, .hero-copy, .hero-art, footer");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach(el => {
    el.classList.add("reveal");
    observer.observe(el);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("main > section, footer, header, .cta-wide");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible"); // reset when leaving
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach(sec => {
    sec.classList.add("section-reveal");
    observer.observe(sec);
  });
});
// Typing effect
document.addEventListener("DOMContentLoaded", () => {
  const phrases = [
    
    "groundbreaking digital experiences",
    "beautiful, modern interfaces",
    "intelligent AI-powered apps",

    "authentic designs, authentic displays"
  ];
  let currentPhrase = 0;
  let currentChar = 0;
  let isDeleting = false;
  const el = document.getElementById("typing");

  function typeLoop() {
    const phrase = phrases[currentPhrase];
    if (!isDeleting) {
      el.textContent = phrase.substring(0, currentChar + 1);
      currentChar++;
      if (currentChar === phrase.length) {
        isDeleting = true;
        setTimeout(typeLoop, 2000); // pause before deleting
        return;
      }
    } else {
      el.textContent = phrase.substring(0, currentChar - 1);
      currentChar--;
      if (currentChar === 0) {
        isDeleting = false;
        currentPhrase = (currentPhrase + 1) % phrases.length;
      }
    }
    setTimeout(typeLoop, isDeleting ? 50 : 100);
  }

  typeLoop();
});
// Section + child element reveal
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll("section, footer, .deep-services article").forEach(el => {
    el.classList.add("section-reveal");
    observer.observe(el);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const hero = document.querySelector(".hero");

  if (!scrollTopBtn || !hero) return;

  // Watch hero visibility
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          scrollTopBtn.classList.add("hide"); // hide while hero visible
        } else {
          scrollTopBtn.classList.remove("hide"); // show once past hero
        }
      });
    },
    {
      threshold: 0,
      rootMargin: "-80px 0px 0px 0px" // prevents flicker at hero boundary
    }
  );

  observer.observe(hero);

  // Smooth scroll
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});


const carousel = document.querySelector('.team-carousel');
const cards = document.querySelectorAll('.team-card');
const dotsContainer = document.querySelector('.carousel-dots');
const leftArrow = document.querySelector('.carousel-arrow.left');
const rightArrow = document.querySelector('.carousel-arrow.right');

let index = 0;
let visibleCards = 3;

function updateVisibleCards() {
  const width = window.innerWidth;
  if (width < 600) visibleCards = 1;
  else if (width < 900) visibleCards = 2;
  else visibleCards = 3;
}

// Update maxIndex dynamically
function getMaxIndex() {
  return Math.max(cards.length - visibleCards, 0);
}

function createDots() {
  dotsContainer.innerHTML = '';
  for (let i = 0; i <= getMaxIndex(); i++) {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      index = i;
      updateCarousel();
    });
    dotsContainer.appendChild(dot);
  }
}

function updateCarousel() {
  const cardWidth = cards[0].offsetWidth + 20; // card width + gap
  carousel.style.transform = `translateX(-${index * cardWidth}px)`;
  document.querySelectorAll('.carousel-dots button').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// Initialize carousel
function initCarousel() {
  updateVisibleCards();
  createDots();
  index = 0;
  updateCarousel();
}

window.addEventListener('resize', initCarousel);
initCarousel();

// Arrow navigation
leftArrow.addEventListener('click', () => {
  if (index > 0) index--;
  updateCarousel();
});

rightArrow.addEventListener('click', () => {
  if (index < getMaxIndex()) index++;
  updateCarousel();
});

// Touch swipe
let startX = 0;
let isDragging = false;

carousel.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

carousel.addEventListener('touchmove', e => {
  if (!isDragging) return;
  const diff = e.touches[0].clientX - startX;
  const cardWidth = cards[0].offsetWidth + 20;
  carousel.style.transform = `translateX(${-index * cardWidth + -diff}px)`;
});

carousel.addEventListener('touchend', e => {
  const diff = e.changedTouches[0].clientX - startX;
  if (diff > 50 && index > 0) index--; // swipe right
  if (diff < -50 && index < getMaxIndex()) index++; // swipe left
  isDragging = false;
  updateCarousel();
});

function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}
