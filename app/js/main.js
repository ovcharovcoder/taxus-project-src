// Dropdown header menu
document
	.querySelectorAll(
		'.header__dropdown > .header__nav-link, .header__lang > .header__nav-link'
	)
	.forEach(item => {
		item.addEventListener('click', function (event) {
			event.preventDefault();
			const menu = this.nextElementSibling;
			const dropdown =
				this.closest('.header__dropdown') || this.closest('.header__lang');
			const otherMenus = document.querySelectorAll('.header__dropdown-menu');

			otherMenus.forEach(otherMenu => {
				if (otherMenu !== menu) {
					otherMenu.style.maxHeight = '0px';
					otherMenu.closest('.header__dropdown')?.classList.remove('open');
				}
			});

			if (menu.style.maxHeight === '0px' || menu.style.maxHeight === '') {
				menu.style.maxHeight = menu.scrollHeight + 'px';
				if (dropdown) dropdown.classList.add('open');
			} else {
				menu.style.maxHeight = '0px';
				if (dropdown) dropdown.classList.remove('open');
			}

			event.stopPropagation();
		});
	});

document.addEventListener('click', function (event) {
	const dropdowns = document.querySelectorAll('.header__dropdown-menu');
	dropdowns.forEach(menu => {
		if (
			!menu.contains(event.target) &&
			!menu.previousElementSibling.contains(event.target)
		) {
			menu.style.maxHeight = '0px';
			menu.closest('.header__dropdown')?.classList.remove('open');
		}
	});
});

// Animation of section block appearance
const observerUp = new IntersectionObserver(
	(entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	},
	{ threshold: 0.5 }
);

document.querySelectorAll('.animate-slide-up').forEach(item => {
	observerUp.observe(item);
});

// Block appearance animation on the left
const observerInLeft = new IntersectionObserver(
	(entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	},
	{ threshold: 0.5 }
);

document.querySelectorAll('.animate-slide-in-left').forEach(item => {
	observerInLeft.observe(item);
});

// Block appearance animation on the right
const observerInRight = new IntersectionObserver(
	(entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	},
	{ threshold: 0.5 }
);

document.querySelectorAll('.animate-slide-in-right').forEach(item => {
	observerInRight.observe(item);
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
