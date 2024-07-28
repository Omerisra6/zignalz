import { describe, expect, it } from 'vitest';
import { createSignal, observe } from '../index';

describe('signals', () => {
	it('should change the value when calling set', () => {
		const { get, set } = createSignal(0);

		set((value) => value + 1);

		expect(get()).toBe(1);
	});

	it('should trigger the observer after setting the signal value when using the signal value in the observer', () => {
		const { get, set } = createSignal(0);
		let count = 0;

		observe(() => {
			count = get();
		});

		set((value) => value + 1);

		expect(count).toBe(1);
	});

	it('should not trigger the observer after setting the signal value when not using the signal value in the observer', () => {
		const { set } = createSignal(0);
		let count = 0;

		observe(() => {
			count++;
		});

		set((value) => value + 1);

		expect(count).toBe(1);
	});
});
