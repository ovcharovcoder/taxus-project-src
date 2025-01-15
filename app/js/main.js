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
