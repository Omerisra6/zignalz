const observers = new Set<() => void>();

export function createSignal<T>(initialValue: T) {
	const listeners: Array<() => void> = [];

	let value = initialValue;

	const get = () => {
		observers.forEach((cb) => listeners.push(cb));
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
	observers.add(cb);
	cb();
	observers.delete(cb);
}
