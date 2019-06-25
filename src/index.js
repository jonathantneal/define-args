export default function defineArgs (object) {
	return Object.defineProperty(object, 'args', {
		configurable: true,
		enumerable: false,
		value: function args () {
			if (typeof this !== 'function') {
				throw new TypeError('args must be called on a function')
			}

			const func = Function('f', 'a', 'return function (' + Array.apply(
				null,
				Array(
					Math.max(
						0,
						this.length - arguments.length
					)
				)
			).map(
				String
			) + '){return f.apply(this,a.concat.apply(a,arguments))}')(
				this,
				Array.prototype.slice.call(arguments)
			)

			function Noop () {}
			Noop.prototype = Object.create(this.prototype)
			func.prototype = new Noop()
			Noop.prototype = null

			return func
		}
	})
}
