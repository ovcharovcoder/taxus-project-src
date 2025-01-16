// Toggle tables visibility using button on 'Clients Fees' section 'banking.html' page
function showContent(tableId, buttonElement) {
	document.querySelectorAll('.fees__content').forEach(content => {
		content.classList.remove('active');
	});
	document.getElementById(tableId).classList.add('active');

	document.querySelectorAll('.fees__button-group button').forEach(button => {
		button.classList.remove('active');
	});
	buttonElement.classList.add('active');
}

// Content Switcher
document.querySelectorAll('.lic-selectors__list-link').forEach(link => {
	link.addEventListener('click', function (event) {
		event.preventDefault();
		document.querySelectorAll('.lic-selectors__list-link').forEach(link => {
			link.classList.remove('active');
		});
		this.classList.add('active');
		document
			.querySelectorAll('.lic-selectors__item-content')
			.forEach(content => {
				content.classList.remove('active');
			});
		const targetId = this.getAttribute('data-content');
		document.getElementById(targetId).classList.add('active');
	});
});
