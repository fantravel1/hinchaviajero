/* ============================================
   HINCHAVIAJERO.COM — Main JavaScript
   Navigation, animations, FAQ, language toggle
   ============================================ */

(function () {
  'use strict';

  // ---------- Mobile Menu Toggle ----------
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    nav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ---------- Header Scroll Effect ----------
  const header = document.querySelector('.header');
  if (header) {
    var lastScrollY = 0;
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScrollY = scrollY;
    }, { passive: true });
  }

  // ---------- Smooth Scroll for Anchor Links ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerHeight = header ? header.offsetHeight : 0;
        var targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---------- Scroll Animations ----------
  var animatedElements = document.querySelectorAll('.animate-on-scroll');
  if (animatedElements.length > 0) {
    var observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ---------- FAQ Accordion ----------
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function () {
        var wasActive = item.classList.contains('active');

        // Close all FAQ items
        faqItems.forEach(function (otherItem) {
          otherItem.classList.remove('active');
        });

        // Toggle clicked item
        if (!wasActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // ---------- Language Toggle ----------
  var langButtons = document.querySelectorAll('.lang-toggle__btn');
  langButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = this.getAttribute('data-lang');
      var currentPath = window.location.pathname;

      if (lang === 'en') {
        // Navigate to English version
        if (currentPath.indexOf('/en/') === -1) {
          if (currentPath === '/' || currentPath === '/index.html') {
            window.location.href = '/en/index.html';
          } else if (currentPath.indexOf('/guias/') !== -1) {
            // Map Spanish guide paths to English
            var guideMap = {
              'away-days': 'away-days',
              'boletos-sin-estafa': 'tickets-without-scams',
              'seguridad-matchday': 'matchday-safety',
              'clasicos-sudamerica': 'south-american-derbies',
              'costos-away-day': 'away-day-costs',
              'copa-libertadores': 'copa-libertadores',
              'barrios-matchday': 'matchday-neighborhoods',
              'cruzar-frontera': 'border-crossing',
              'indice-hincha': 'indice-hincha',
              'la-previa': 'the-previa',
              'primer-away-day': 'your-first-away-day',
              'checklist-hincha': 'fan-checklist'
            };
            var filename = currentPath.split('/').pop().replace('.html', '');
            var enFilename = guideMap[filename] || filename;
            window.location.href = '/en/guides/' + enFilename + '.html';
          } else if (currentPath.indexOf('/ciudades/') !== -1) {
            // Map Spanish city paths to English
            var cityMap = {
              'buenos-aires': 'buenos-aires',
              'ciudad-de-mexico': 'mexico-city',
              'lima': 'lima',
              'santiago': 'santiago'
            };
            var cityFile = currentPath.split('/').pop().replace('.html', '');
            if (cityFile === 'index') {
              window.location.href = '/en/cities/index.html';
            } else {
              var enCity = cityMap[cityFile] || cityFile;
              window.location.href = '/en/cities/' + enCity + '.html';
            }
          } else if (currentPath.indexOf('/estadios/') !== -1) {
            window.location.href = '/en/stadiums/index.html';
          } else if (currentPath.indexOf('/equipos/') !== -1) {
            window.location.href = '/en/teams/index.html';
          } else if (currentPath.indexOf('/torneos/') !== -1) {
            window.location.href = '/en/tournaments/index.html';
          } else if (currentPath.indexOf('/contacto') !== -1) {
            window.location.href = '/en/contact.html';
          } else if (currentPath.indexOf('/privacidad') !== -1) {
            window.location.href = '/en/privacy.html';
          } else if (currentPath.indexOf('/terminos') !== -1) {
            window.location.href = '/en/terms.html';
          } else if (currentPath.indexOf('/sobre-nosotros') !== -1) {
            window.location.href = '/en/about.html';
          } else {
            window.location.href = '/en' + currentPath;
          }
        }
      } else {
        // Navigate to Spanish version
        if (currentPath.indexOf('/en/') !== -1) {
          if (currentPath === '/en/' || currentPath === '/en/index.html') {
            window.location.href = '/index.html';
          } else if (currentPath.indexOf('/en/guides/') !== -1) {
            var guideMapReverse = {
              'away-days': 'away-days',
              'tickets-without-scams': 'boletos-sin-estafa',
              'matchday-safety': 'seguridad-matchday',
              'south-american-derbies': 'clasicos-sudamerica',
              'away-day-costs': 'costos-away-day',
              'copa-libertadores': 'copa-libertadores',
              'matchday-neighborhoods': 'barrios-matchday',
              'border-crossing': 'cruzar-frontera',
              'indice-hincha': 'indice-hincha',
              'the-previa': 'la-previa',
              'your-first-away-day': 'primer-away-day',
              'fan-checklist': 'checklist-hincha'
            };
            var enFilename2 = currentPath.split('/').pop().replace('.html', '');
            var esFilename = guideMapReverse[enFilename2] || enFilename2;
            window.location.href = '/guias/' + esFilename + '.html';
          } else if (currentPath.indexOf('/en/cities/') !== -1) {
            var cityMapReverse = {
              'buenos-aires': 'buenos-aires',
              'mexico-city': 'ciudad-de-mexico',
              'lima': 'lima',
              'santiago': 'santiago'
            };
            var enCityFile = currentPath.split('/').pop().replace('.html', '');
            if (enCityFile === 'index') {
              window.location.href = '/ciudades/index.html';
            } else {
              var esCity = cityMapReverse[enCityFile] || enCityFile;
              window.location.href = '/ciudades/' + esCity + '.html';
            }
          } else if (currentPath.indexOf('/en/stadiums/') !== -1) {
            window.location.href = '/estadios/index.html';
          } else if (currentPath.indexOf('/en/teams/') !== -1) {
            window.location.href = '/equipos/index.html';
          } else if (currentPath.indexOf('/en/tournaments/') !== -1) {
            window.location.href = '/torneos/index.html';
          } else if (currentPath.indexOf('/en/contact') !== -1) {
            window.location.href = '/contacto.html';
          } else if (currentPath.indexOf('/en/privacy') !== -1) {
            window.location.href = '/privacidad.html';
          } else if (currentPath.indexOf('/en/terms') !== -1) {
            window.location.href = '/terminos.html';
          } else if (currentPath.indexOf('/en/about') !== -1) {
            window.location.href = '/sobre-nosotros.html';
          } else {
            window.location.href = currentPath.replace('/en/', '/');
          }
        }
      }
    });
  });

  // ---------- Lazy Image Loading ----------
  var lazyImages = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window && lazyImages.length > 0) {
    var imgObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          imgObserver.unobserve(img);
        }
      });
    }, { rootMargin: '100px' });

    lazyImages.forEach(function (img) {
      imgObserver.observe(img);
    });
  }

  // ---------- Índice Hincha Animation ----------
  var indiceElements = document.querySelectorAll('.indice-hincha__score[data-target]');
  if (indiceElements.length > 0) {
    var indiceObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-target'), 10);
          animateNumber(el, 0, target, 1500);
          indiceObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    indiceElements.forEach(function (el) {
      indiceObserver.observe(el);
    });
  }

  function animateNumber(el, start, end, duration) {
    var startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      el.textContent = Math.floor(start + (end - start) * eased);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  // ---------- Newsletter Form ----------
  var newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var btn = form.querySelector('button');
      if (input && input.value) {
        btn.textContent = btn.getAttribute('data-success') || 'Enviado';
        btn.disabled = true;
        input.disabled = true;
        input.value = '';
        setTimeout(function () {
          btn.textContent = btn.getAttribute('data-original') || btn.textContent;
          btn.disabled = false;
          input.disabled = false;
        }, 3000);
      }
    });
  });

})();
