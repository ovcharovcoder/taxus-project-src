// Testimonials slider
const swiper = new Swiper('.reviews__testimonials-swiper', {
	slidesPerView: 3,
	spaceBetween: 20,
	freeMode: true,
	freeModeSticky: true,
	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});
