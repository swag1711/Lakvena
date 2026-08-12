 AOS.init({
 	duration: 800,
 	easing: 'slide'
 });

(function($) {

	"use strict";

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};


	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {

		if ($(window).width() > 991.98) {
			$('.home-slider, .slider-item').css('height', $(window).height());
		} else {
			$('.home-slider, .slider-item').css('height', 'auto');
		}
		$(window).resize(function(){
			if ($(window).width() > 991.98) {
				$('.home-slider, .slider-item').css('height', $(window).height());
			} else {
				$('.home-slider, .slider-item').css('height', 'auto');
			}
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	// Scrollax
   $.Scrollax();

	var carousel = function() {
		$('.home-slider').owlCarousel({
	    loop:true,
	    autoplay: true,
	    margin:0,
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    nav:false,
	    autoplayHoverPause: false,
	    items: 1,
	    navText : ["<span class='ion-md-arrow-back'></span>","<span class='ion-chevron-right'></span>"],
	    responsive:{
	      0:{
	        items:1
	      },
	      600:{
	        items:1
	      },
	      1000:{
	        items:1
	      }
	    }
		});
	
		$('.carousel-testimony').owlCarousel({
			center: true,
			loop: false,
			items:1,
			margin: 30,
			stagePadding: 0,
			nav: false,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 3
				},
				1000:{
					items: 3
				}
			}
		});

	};
	carousel();

	// Dropdown Hover for Desktop Only (> 991.98px)
	$('nav .dropdown').hover(function(){
		if ($(window).width() > 991.98) {
			var $this = $(this);
			$this.addClass('show');
			$this.find('> a').attr('aria-expanded', true);
			$this.find('.dropdown-menu').addClass('show');
		}
	}, function(){
		if ($(window).width() > 991.98) {
			var $this = $(this);
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			$this.find('.dropdown-menu').removeClass('show');
		}
	});

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	
	var counter = function() {
		
		$('#section-counter').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();

	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();


	// navigation
	var OnePageNav = function() {
		$(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#']").on('click', function(e) {
		 	e.preventDefault();

		 	var hash = this.hash,
		 			navToggler = $('.navbar-toggler');
		 	$('html, body').animate({
		    scrollTop: $(hash).offset().top
		  }, 700, 'easeInOutExpo', function(){
		    window.location.hash = hash;
		  });


		  if ( navToggler.is(':visible') ) {
		  	navToggler.click();
		  }
		});
		$('body').on('activate.bs.scrollspy', function () {
		  console.log('nice');
		})
	};
	OnePageNav();


	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });



	var goHere = function() {

		$('.mouse-icon').on('click', function(event){
			
			event.preventDefault();

			$('html,body').animate({
				scrollTop: $('.goto-here').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});
	};
	goHere();




	var updateNavUserText = function() {
		var raw = localStorage.getItem('lakvena_user');
		var navTexts = document.querySelectorAll('.nav-login-text');
		if (raw && navTexts.length > 0) {
			try {
				var u = JSON.parse(raw);
				if (u && u.loggedIn) {
					var shortName = u.name ? u.name.split(' ')[0] : 'Account';
					navTexts.forEach(function(el) { el.innerText = shortName; });
					return;
				}
			} catch(e) {}
		}
		navTexts.forEach(function(el) { el.innerText = 'Login'; });
	};
	updateNavUserText();

	// Global Luxury Search Overlay Modal System
	var initGlobalSearchModal = function() {
		if ($('#lakvenaSearchModal').length === 0) {
			var searchModalHTML = `
			<div id="lakvenaSearchModal">
				<button class="search-modal-close" id="closeSearchModalBtn" aria-label="Close search">&times;</button>
				<div class="search-modal-container">
					<div class="text-center mb-3">
						<h3 style="font-family:'Cinzel', serif; color:#FFD700; font-weight:700; font-size:24px; letter-spacing:1px; margin-bottom:4px;">Search Lakvena Collections</h3>
						<p style="color:#d1b696; font-size:13px;">Curated Fashion Collections • Elegance Woven with Tradition</p>

					</div>

					<div class="search-input-box">
						<span class="search-icon-inside icon-search"></span>
						<input type="text" id="globalSearchInput" placeholder="Type to search sarees, haram, bridal sets..." autocomplete="off">
					</div>

					<div class="search-tags-list">
						<span class="search-tag-pill active" data-tag="all">All Items</span>
						<span class="search-tag-pill" data-tag="kanchipuram">Kanchipuram Silk</span>
						<span class="search-tag-pill" data-tag="gold">1-Gram Gold</span>
						<span class="search-tag-pill" data-tag="bridal">Bridal Collection</span>
						<span class="search-tag-pill" data-tag="party">Party Wear</span>
					</div>

					<div id="globalSearchResultsGrid" class="search-results-grid"></div>
				</div>
			</div>`;

			$('body').append(searchModalHTML);
		}

		var products = [
			{ id: 1, title: 'Kanchipuram Pure Silk Saree', category: 'saree', tag: 'kanchipuram bridal', badge: 'Pure Silk', img: 'images/L1-p1.png', link: 'product-single.html' },
			{ id: 2, title: 'Designer Party Wear Saree', category: 'saree', tag: 'party saree', badge: 'Trending', img: 'images/L1-p2.png', link: 'product-single.html' },
			{ id: 3, title: 'One Gram Gold Necklace Set', category: 'jewellery', tag: 'gold necklace', badge: '1-Gram Gold', img: 'images/L1-p3.png', link: 'product-single.html' },
			{ id: 4, title: 'Bridal Heritage Haram Set', category: 'jewellery', tag: 'gold haram bridal', badge: 'Bridal Set', img: 'images/L1-p4.png', link: 'product-single.html' },
			{ id: 5, title: 'Royal Banarasi Silk Saree', category: 'saree', tag: 'silk saree', badge: 'Royal Silk', img: 'images/L-product1.png', link: 'shop.html' },
			{ id: 6, title: 'Handcrafted Gold Bangle Set', category: 'jewellery', tag: 'gold bangle', badge: '1-Gram Gold', img: 'images/L-product2.png', link: 'shop.html' },
			{ id: 7, title: 'Festive Soft Silk Saree', category: 'saree', tag: 'silk saree party', badge: 'Festive Wear', img: 'images/L-product3.png', link: 'shop.html' },
			{ id: 8, title: 'Temple Jewellery Collection', category: 'jewellery', tag: 'gold temple haram', badge: 'Temple Gold', img: 'images/L-product4.png', link: 'shop.html' }
		];

		function renderSearchItems(items) {
			var $grid = $('#globalSearchResultsGrid');
			$grid.empty();
			if (!items || items.length === 0) {
				$grid.html('<div class="text-center py-4 w-100" style="color:#d1b696; font-size:14px; grid-column: 1 / -1;">No matching items found. Try searching for "Silk" or "Gold".</div>');
				return;
			}
			items.forEach(function(p) {
				var cardHTML = `
				<div class="search-result-card">
					<img src="${p.img}" alt="${p.title}">
					<div class="info">
						<div>
							<div class="category-badge">${p.badge}</div>
							<h4>${p.title}</h4>
						</div>
						<a href="${p.link}" class="btn-view mt-2">Explore Item →</a>
					</div>
				</div>`;
				$grid.append(cardHTML);
			});
		}

		function filterProducts() {
			var query = $('#globalSearchInput').val().toLowerCase().trim();
			var activeTag = $('.search-tag-pill.active').data('tag') || 'all';

			var filtered = products.filter(function(p) {
				var matchesTag = (activeTag === 'all') || 
					(activeTag === 'kanchipuram' && (p.tag.includes('kanchipuram') || p.category === 'saree')) ||
					(activeTag === 'gold' && (p.tag.includes('gold') || p.category === 'jewellery')) ||
					(activeTag === 'bridal' && p.tag.includes('bridal')) ||
					(activeTag === 'party' && p.tag.includes('party'));

				var matchesQuery = !query || 
					p.title.toLowerCase().includes(query) || 
					p.category.toLowerCase().includes(query) || 
					p.tag.toLowerCase().includes(query) ||
					p.badge.toLowerCase().includes(query);

				return matchesTag && matchesQuery;
			});

			renderSearchItems(filtered);
		}

		$(document).on('click', '#navSearchTrigger, #inlineSearchTrigger, #inlineSearchInput, .header-search-bar, .header-search-btn, .search-trigger-btn', function(e) {
			e.preventDefault();
			$('#lakvenaSearchModal').addClass('active');
			renderSearchItems(products);
			setTimeout(function() { $('#globalSearchInput').focus(); }, 200);
		});


		$(document).on('click', '#closeSearchModalBtn', function() {
			$('#lakvenaSearchModal').removeClass('active');
		});

		$(document).on('keydown', function(e) {
			if (e.key === 'Escape') {
				$('#lakvenaSearchModal').removeClass('active');
			}
		});

		$(document).on('input', '#globalSearchInput', function() {
			filterProducts();
		});

		$(document).on('click', '.search-tag-pill', function() {
			$('.search-tag-pill').removeClass('active');
			$(this).addClass('active');
			filterProducts();
		});
	};

	initGlobalSearchModal();

	// Mobile Tap Product Card Action Bar Toggle Handler
	$(document).on('click', '.product', function(e) {
		if ($(window).width() <= 991) {
			if ($(e.target).closest('.btn-card-action').length > 0) {
				return;
			}
			e.preventDefault();
			var $thisCard = $(this);
			var isAlreadyActive = $thisCard.hasClass('active-card');
			
			$('.product').removeClass('active-card');
			if (!isAlreadyActive) {
				$thisCard.addClass('active-card');
			}
		}
	});

	$(document).on('click', function(e) {
		if ($(e.target).closest('.product').length === 0) {
			$('.product').removeClass('active-card');
		}
	});

})(jQuery);




