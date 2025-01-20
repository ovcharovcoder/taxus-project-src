// Testimonials slider
const swiper = new Swiper('.reviews__testimonials-swiper', {
	slidesPerView: 3,
	spaceBetween: 30,
	freeMode: true,
	breakpoints: {
		1450: {
			slidesPerView: 2,
		},
		300: {
			slidesPerView: 1,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false,
			},
		},
	},
	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});
