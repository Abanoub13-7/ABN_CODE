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

    // PROJECT CAROUSEL
    var $projectCarousel = $('.owl-carousel');
    var reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    $projectCarousel.owlCarousel({
    	items: 1,
	    loop:true,
	    margin:10,
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
              scrollTop: target.offset().top - 49
          }, 1000);
          event.preventDefault();
        }

        if ($('.navbar-collapse').hasClass('show')) {
          $('.navbar-collapse').collapse('hide');
        }
      });
    });

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
