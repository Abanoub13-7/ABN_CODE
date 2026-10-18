(function ($) {

  "use strict";

    // COLOR MODE
    $('.color-mode').on('click', function () {
        var $button = $(this);
        var isDark = $('body').toggleClass('dark-mode').hasClass('dark-mode');

        $button.toggleClass('active', isDark);
        $button.find('.color-mode-icon').toggleClass('active', isDark);
        $button.attr('aria-pressed', isDark ? 'true' : 'false');
    });

    // HEADER
    $(".navbar").headroom();

    // keep the header pinned while the mobile menu is open (Headroom would otherwise slide it away with the menu)
    $('#navbarNav').on('show.bs.collapse', function () { $('.navbar').addClass('menu-open'); })
      .on('hidden.bs.collapse', function () { $('.navbar').removeClass('menu-open'); });

    // PROJECT CAROUSEL
    var $projectCarousel = $('.owl-carousel');
    var reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    $projectCarousel.owlCarousel({
    	items: 1,
	    loop:true,
	    margin:24,
      responsive: { 992: { items: 2 } },
	    nav:true,
      dots:true,
      autoplay: !reduceMotionQuery.matches,
      autoplayTimeout:3500,
      autoplayHoverPause:true,
      smartSpeed: reduceMotionQuery.matches ? 0 : 800,
      rtl: document.documentElement.dir === 'rtl'
	  });

    function updateCarouselMotion() {
      var owl = $projectCarousel.data('owl.carousel');
      var reduceMotion = reduceMotionQuery.matches;

      if (!owl) {
        return;
      }

      owl.options.autoplay = !reduceMotion;
      owl.options.smartSpeed = reduceMotion ? 0 : 800;
      $projectCarousel.trigger('refresh.owl.carousel');
      if (reduceMotion) {
        $projectCarousel.trigger('stop.owl.autoplay');
      } else {
        $projectCarousel.trigger('play.owl.autoplay', [3500]);
      }
    }

    if (reduceMotionQuery.addEventListener) {
      reduceMotionQuery.addEventListener('change', updateCarouselMotion);
    } else if (reduceMotionQuery.addListener) {
      reduceMotionQuery.addListener(updateCarouselMotion);
    }

    function updateCarouselDirection(event) {
      var owl = $projectCarousel.data('owl.carousel');
      var isRtl = event.detail.language === 'ar';

      if (owl && owl.options.rtl !== isRtl) {
        owl.options.rtl = isRtl;
        $projectCarousel.toggleClass('owl-rtl', isRtl);
        $projectCarousel.trigger('refresh.owl.carousel');
      }

      updateCarouselLabels();
    }

    function updateCarouselLabels() {
      var translate = window.portfolioLanguage.translate;
      $projectCarousel.find('.owl-prev').attr('aria-label', translate('carousel.previous'));
      $projectCarousel.find('.owl-prev span').attr('aria-label', translate('carousel.previous'));
      $projectCarousel.find('.owl-next').attr('aria-label', translate('carousel.next'));
      $projectCarousel.find('.owl-next span').attr('aria-label', translate('carousel.next'));
    }

    updateCarouselLabels();
    document.addEventListener('portfolio:languagechange', updateCarouselDirection);

    // SMOOTHSCROLL
    $(function() {
      $('.nav-link, .custom-btn-link').on('click', function(event) {
        var $anchor = $(this);
        var target = $($anchor.attr('href'));

        if (target.length) {
          $('html, body').stop().animate({
              scrollTop: target.offset().top
          }, reduceMotionQuery.matches ? 0 : 800);
          event.preventDefault();
        }

        if ($('.navbar-collapse').hasClass('show')) {
          $('.navbar-collapse').collapse('hide');
        }
      });
    });

    // SCROLL REVEAL (armed only when <html class="reveal-on"> was set in <head>)
    (function () {
      var items = document.querySelectorAll('.reveal');
      var armed = document.documentElement.classList.contains('reveal-on');

      if (!armed || !('IntersectionObserver' in window)) {
        items.forEach(function (el) { el.classList.add('is-visible'); });
        return;
      }

      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

      items.forEach(function (el) { revealObserver.observe(el); });
      window.__revealReady = true;
    })();

    // ACTIVE NAV LINK (scroll-spy)
    (function () {
      if (!('IntersectionObserver' in window)) {
        return;
      }
      var links = document.querySelectorAll('.nav-main .nav-link[href^="#"]');
      var byId = {};
      links.forEach(function (link) { byId[link.getAttribute('href').slice(1)] = link; });

      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || !byId[entry.target.id]) {
            return;
          }
          links.forEach(function (link) {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
          });
          byId[entry.target.id].classList.add('active');
          byId[entry.target.id].setAttribute('aria-current', 'true');
        });
      }, { rootMargin: '-45% 0px -50% 0px' });

      Object.keys(byId).forEach(function (id) {
        var section = document.getElementById(id);
        if (section) { spy.observe(section); }
      });
    })();

    // TOOLTIP
    $('.social-links a').tooltip();

    document.addEventListener('portfolio:languagechange', function () {
      $('.social-links a').each(function () {
        var $link = $(this);
        if ($link.data('bs.tooltip')) {
          $link.tooltip('dispose');
          $link.tooltip();
        }
      });
    });

})(jQuery);
