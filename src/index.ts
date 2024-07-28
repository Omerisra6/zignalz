let observer: (() => void) | null = null;

export function createSignal<T>(initialValue: T) {
	const listeners: Array<() => void> = [];

	let value = initialValue;

	const get = () => {
		if (observer) {
			listeners.push(observer);
		}

		return value;
	};

	const set = (cb: (value: T) => T) => {
		value = cb(value);

		listeners.forEach((listener) => {
			listener();
		});
	};

	return { get, set };
}

export function observe(cb: () => void) {
	observer = cb;
	cb();
	observer = null;
}
