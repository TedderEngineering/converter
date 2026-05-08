/* Tedder Engineering — VBOX to MoTeC Converter landing page
   Mirrors the master site's IntersectionObserver fade-in pattern. */

(function () {
  'use strict';

  // Fade-in on scroll
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -50px 0px', threshold: 0.1 }
    );
    fadeEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback for older browsers — just show everything
    fadeEls.forEach((el) => el.classList.add('is-visible'));
  }

  // Hide image placeholders once the real image loads. Applies to the
  // hero and any showcase figures.
  const imagePairs = [
    { img: '.screenshot',     placeholder: '.screenshot-placeholder' },
    { img: '.showcase-image', placeholder: '.showcase-placeholder'   },
  ];

  imagePairs.forEach(({ img, placeholder }) => {
    document.querySelectorAll(img).forEach((image) => {
      // Each image's placeholder is its sibling within the same frame.
      const frame = image.parentElement;
      const ph = frame ? frame.querySelector(placeholder) : null;
      if (!ph) return;

      const hidePlaceholder = () => { ph.style.display = 'none'; };
      const handleError = () => { image.style.opacity = '0'; };

      if (image.complete && image.naturalWidth > 0) {
        hidePlaceholder();
      } else {
        image.addEventListener('load', () => {
          if (image.naturalWidth > 0) hidePlaceholder();
        });
        image.addEventListener('error', handleError);
      }
    });
  });

  // Smooth-scroll any in-page anchor links (sticky header is accounted for
  // by html { scroll-behavior: smooth } in CSS; this is a no-op fallback)
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Light client-side validation cue on the form (Formspree handles
  // server-side; this just makes invalid fields obvious before submit)
  const form = document.querySelector('.waitlist-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      const requiredEmpty = Array.from(
        form.querySelectorAll('[required]')
      ).filter((el) => !el.value.trim());
      if (requiredEmpty.length) {
        e.preventDefault();
        requiredEmpty[0].focus();
      }
    });
  }

  // Mobile nav toggle — mirrors the master site pattern at
  // tedderengineering-site/assets/js/main.js:25-40
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('is-open');
      navLinks.classList.toggle('is-open');
    });
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('is-open');
        navLinks.classList.remove('is-open');
      });
    });
  }
})();
