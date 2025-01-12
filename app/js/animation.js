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

// Animate rotate
const observer = new IntersectionObserver(
	(entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	},
	{
		threshold: 0.5,
	}
);

const cardsToAnimate = document.querySelectorAll('.animate-rotate');
cardsToAnimate.forEach(card => observer.observe(card));
