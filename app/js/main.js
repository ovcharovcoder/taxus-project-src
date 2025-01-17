// Utility function to remove 'active' class from a list of elements
function removeActiveClass(elements) {
	elements.forEach(element => element.classList.remove('active'));
}

// Toggle tables visibility using button on 'Clients Fees' section 'banking.html' page
function showContent(tableId, buttonElement) {
	removeActiveClass(document.querySelectorAll('.fees__content'));
	removeActiveClass(document.querySelectorAll('.fees__button-group button'));

	document.getElementById(tableId).classList.add('active');
	buttonElement.classList.add('active');
}

// Content Switcher
function setupContentSwitcher(selector, contentSelector, dataAttr) {
	document.querySelectorAll(selector).forEach(link => {
		link.addEventListener('click', function (event) {
			event.preventDefault();
			removeActiveClass(document.querySelectorAll(selector));
			removeActiveClass(document.querySelectorAll(contentSelector));

			this.classList.add('active');
			const targetId = this.getAttribute(dataAttr);
			document.getElementById(targetId).classList.add('active');
		});
	});
}

setupContentSwitcher(
	'.lic-selectors__list-link',
	'.lic-selectors__item-content',
	'data-content'
);

// Filter articles
const filterButtons = document.querySelectorAll('.filter-btn');
const articles = document.querySelectorAll('.articles__item');

filterButtons.forEach(button => {
	button.addEventListener('click', () => {
		const category = button.getAttribute('data-category');

		filterButtons.forEach(btn =>
			btn.classList.toggle('active', btn === button)
		);

		articles.forEach(article => {
			const match =
				category === 'all' ||
				article.getAttribute('data-category') === category;
			article.style.display = match ? 'block' : 'none';
		});
	});
});
