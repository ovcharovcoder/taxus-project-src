// Utility function for creating IntersectionObservers
function createObserver(selector, threshold = 0.5) {
	const observer = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold }
	);

	document.querySelectorAll(selector).forEach(item => observer.observe(item));
}

// Initialize observers for different animations
createObserver('.animate-slide-up');
createObserver('.animate-slide-in-left');
createObserver('.animate-slide-in-right');
createObserver('.animate-rotate');
