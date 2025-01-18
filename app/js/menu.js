// Hamburger menu
document.addEventListener('DOMContentLoaded', () => {
	const burger = document.querySelector('.header__burger');
	const navMenu = document.querySelector('.header__nav');

	burger.addEventListener('click', () => {
		navMenu.classList.toggle('active');
	});

	document.addEventListener('click', e => {
		if (!burger.contains(e.target) && !navMenu.contains(e.target)) {
			navMenu.classList.remove('active');
		}
	});
});

// Utility function to close all dropdown menus
function closeAllDropdownMenus() {
	document.querySelectorAll('.header__dropdown-menu').forEach(menu => {
		menu.style.maxHeight = '0px';
		menu.closest('.header__dropdown')?.classList.remove('open');
	});
}

// Toggle dropdown menu visibility
function toggleDropdownMenu(item) {
	const menu = item.nextElementSibling;
	const dropdown =
		item.closest('.header__dropdown') || item.closest('.header__lang');

	if (menu.style.maxHeight === '0px' || menu.style.maxHeight === '') {
		closeAllDropdownMenus();
		menu.style.maxHeight = menu.scrollHeight + 'px';
		dropdown.classList.add('open');
	} else {
		menu.style.maxHeight = '0px';
		dropdown.classList.remove('open');
	}
}

// Event listeners for header dropdown menus
document
	.querySelectorAll(
		'.header__dropdown > .header__nav-link, .header__lang > .header__nav-link'
	)
	.forEach(item => {
		item.addEventListener('click', function (event) {
			event.preventDefault();
			toggleDropdownMenu(this);
			event.stopPropagation();
		});
	});

document.addEventListener('click', closeAllDropdownMenus);
