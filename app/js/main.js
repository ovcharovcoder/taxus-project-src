// Dropdown header menu
document
	.querySelectorAll('.header__dropdown > .header__nav-link')
	.forEach(item => {
		item.addEventListener('click', function (event) {
			event.preventDefault();
			const menu = this.nextElementSibling;

			if (menu.style.maxHeight === '0px' || menu.style.maxHeight === '') {
				menu.style.display = 'block';
				const menuHeight = menu.scrollHeight + 'px';
				menu.style.maxHeight = menuHeight;
			} else {
				menu.style.maxHeight = '0px';
			}
			event.stopPropagation();
		});
	});

document.addEventListener('click', function (event) {
	document.querySelectorAll('.header__dropdown-menu').forEach(menu => {
		if (
			!menu.contains(event.target) &&
			!menu.previousElementSibling.contains(event.target)
		) {
			menu.style.maxHeight = '0px';
		}
	});
});

// Testimonials slider
const swiper = new Swiper('.reviews__testimonials-swiper', {
	slidesPerView: 3,
	spaceBetween: 20,
	freeMode: true,
	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});
