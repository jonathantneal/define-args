function test (message, body) {
	try {
		if (test.depth && test.msgs[test.depth - 1]) {
			console.log(dim + '…' + reset, test.msgs[test.depth - 1] + ':')

			delete test.msgs[test.depth - 1]
		}

		test.msgs[test.depth] = message

		++test.depth
		body()
		--test.depth

		if (test.msgs[test.depth]) {
			var space = Array.apply(null, Array(test.depth)).map(String.prototype.valueOf, '  ').join('')

			console.log(space + green + '✓' + reset, test.msgs[test.depth])

			delete test.msgs[test.depth]
		}


	} catch (error) {
		--test.depth

		while (test.depth >= 0) {
			if (test.msgs[test.depth]) {
				console.log(red + '×' + reset, test.msgs[test.depth])
			}

			--test.depth
		}

		process.exit(1)
	}
} test.msgs = [], test.depth = 0

function expect (result) {
	return {
		toBe: expect => {
			if (result !== expect) {
				test.error = Object.assign(new Error('Expect'), { expect, result })

				throw test.error
			}
		}
	}
}

var dim = '\x1b[2m'
var green = '\x1b[32m'
var red = '\x1b[31m'
var reset = '\x1b[0m'

module.exports = { test, expect }
