/**
 * Svelte action для анимации появления элементов при скролле.
 * Использует Intersection Observer API.
 *
 * Использование:
 *   <div use:reveal>...</div>
 *   <div use:reveal={{ delay: 200 }}>...</div>
 */

interface RevealOptions {
	/** Задержка перед анимацией в миллисекундах */
	delay?: number;
	/** Порог видимости (0–1) */
	threshold?: number;
}

export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	const { delay = 0, threshold = 0.15 } = options;

	// Добавляем базовый класс
	node.classList.add('reveal');

	// Устанавливаем задержку через CSS custom property
	if (delay > 0) {
		node.style.transitionDelay = `${delay}ms`;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					node.classList.add('revealed');
					// Отключаем наблюдение после первого появления
					observer.unobserve(node);
				}
			});
		},
		{ threshold }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.unobserve(node);
			observer.disconnect();
		}
	};
}
