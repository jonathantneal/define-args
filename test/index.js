const defineArgs = require('..')
const { test, expect } = require('./index.fns');

defineArgs(Function.prototype)

test('Function.prototype.args creates argument-bound functions', () => {
	// f = function, a = arguments
	const f1a0 = function (a, b, c) { return a + b + c }
	const f1a1 = f1a0.args(1)
	const f1a2 = f1a0.args(1, 2)
	const f1a3 = f1a0.args(1, 2, 3)
	const f1a4 = f1a0.args(1, 2, 3, 4)

	test('A function and its argument-bound functions have the correct arity', () => {
		expect(f1a0.length).toBe(3)
		expect(f1a1.length).toBe(2)
		expect(f1a2.length).toBe(1)
		expect(f1a3.length).toBe(0)
		expect(f1a4.length).toBe(0)
	})

	test('A function and its argument-bound functions return the correct value', () => {
		expect(f1a0(1, 2, 3)).toBe(6)
		expect(f1a1(1, 2, 3)).toBe(4)
		expect(f1a2(1, 2, 3)).toBe(4)
		expect(f1a3(1, 2, 3)).toBe(6)
		expect(f1a4(1, 2, 3)).toBe(6)
	})
})

test('Function.prototype.args creates argument-bound functions that accept context', () => {
	// f = function, a = arguments
	const f1a0 = function (a, b) { return this.number + a + b }
	const f1a1 = f1a0.args(1)
	const f1a2 = f1a0.args(1, 2)
	const f1a3 = f1a0.args(1, 2, 3)
	const f1a4 = f1a0.args(1, 2, 3, 4)

	const context = { number: 1 };

	expect(f1a0.call(context, 2, 3)).toBe(6)
	expect(f1a1.call(context, 2, 3)).toBe(4)
	expect(f1a2.call(context, 2, 3)).toBe(4)
	expect(f1a3.call(context, 2, 3)).toBe(4)
	expect(f1a4.call(context, 2, 3)).toBe(4)
})

test('Function.prototype.args creates argument-bound classes', () => {
	// c = class, a = arguments, i = instance
	const c1a0 = function (number) { this.number = number }

	expect(c1a0.length).toBe(1)

	const c1a1 = c1a0.args(2)
	expect(c1a1.length).toBe(0)

	const i1a0 = new c1a0(1)
	expect(i1a0.number).toBe(1)

	const i1a1 = new c1a1()
	expect(i1a1.number).toBe(2)

	test('A class and its argument-bound classes inherit prototypes', () => {
		expect('addOne' in i1a0).toBe(false)
		expect('addOne' in i1a1).toBe(false)

		c1a0.prototype.addOne = function () { return this.number + 1 }

		expect('addOne' in i1a0).toBe(true)
		expect('addOne' in i1a1).toBe(true)
	})

	expect(i1a0.addOne(1)).toBe(2)
	expect(i1a1.addOne(1)).toBe(3)
})

