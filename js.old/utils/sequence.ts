export default class Sequence<T> {
	#values: T[]

	constructor(array: T[]) {
		this.#values = array
	}

	get length() {
		return this.#values.length
	}

	at(index: number): T {
		return this.#values[index]
	}

	range(start: number, end?: number) {
		return new Sequence(this.#values.slice(start, end))
	}

	append(value: T): Sequence<T> {
		return new Sequence([...this.#values, value])
	}

	prepend(value: T): Sequence<T> {
		return new Sequence([value, ...this.#values])
	}

	contains(value: T): boolean {
		return this.#values.includes(value)
	}

	first(predicate?: (value: T) => boolean, defaultValue?: T): T {
		if(this.#values.length == 0)
			return null

		if(predicate)
			for(let value of this.#values)
				if(predicate(value))
					return value

		return this.#values[0] ?? defaultValue ?? null
	}

	last(predicate?: (value: T) => boolean, defaultValue?: T): T {
		if(this.#values.length == 0)
			return null

		if(predicate) {
			for(let i = this.#values.length - 1; i >= 0; i--) {
				let value = this.#values[i]

				if(predicate(value))
					return value
			}
		}

		return this.#values[this.#values.length - 1] ?? defaultValue ?? null
	}

	intersect(other: Sequence<T>): Sequence<T> {
		let values: T[] = []

		for(let value of this.#values)
			if(other.#values.includes(value))
				values.push(value)

		return new Sequence(values)
	}

	union(other: Sequence<T>): Sequence<T> {
		let values = [...this.#values]

		for(let value of other.#values)
			if(!values.includes(value))
				values.push(value)

		return new Sequence(values)
	}

	select<TResult>(selector: (value: T, index: number) => TResult): Sequence<TResult> {
		let values = new Array<TResult>(this.#values.length)

		for(let i = this.#values.length - 1; i >= 0; i--)
			values[i] = selector(this.#values[i], i)

		return new Sequence(values)
	}

	where(predicate: (value: T, index: number) => boolean): Sequence<T> {
		let values: T[] = []

		for(let i = 0; i < this.#values.length; i++) {
			let value = this.#values[i]

			if(predicate(value, i))
				values.push(value)
		}

		return new Sequence(values)
	}

	any(predicate: (value: T) => boolean): boolean {
		for(let value of this.#values)
			if(predicate(value))
				return true

		return false
	}

	all(predicate: (value: T) => boolean): boolean {
		for(let value of this.#values)
			if(!predicate(value))
				return false

		return true
	}

	distinct(comparator?: (left: T, right: T) => boolean): Sequence<T> {
		let values: T[] = []

		for(let i = 0; i < this.#values.length; i++) {
			let exists = false

			for(let j = 0; j < i && !exists; j++) {
				let [left, right] = [this.#values[i], this.#values[j]]

				if(comparator ? comparator(left, right) : left === right)
					exists = true
			}

			if(exists)
				continue

			values.push(this.#values[i])
		}

		return new Sequence(values)
	}

	flat() {
		return new Sequence(this.#values.flat())
	}

	order(comparator: (left: T, right: T) => number): Sequence<T> {
		return new Sequence([...this.#values].sort(comparator))
	}

	reduce(reducer: (accumulator: T, current: T) => T): T {
		if(this.#values.length == 0)
			return null

		let accumulation = this.#values[0]

		for(let i = 1; i < this.#values.length; i++)
			accumulation = reducer(accumulation, this.#values[i])

		return accumulation
	}

	reverse(): Sequence<T> {
		return new Sequence([...this.#values.reverse()])
	}

	toArray() {
		return [...this.#values]
	}

	toMap<TKey, TValue>(keySelector: (value: T) => TKey, valueSelector: (value: T) => TValue): Map<TKey, TValue> {
		let map = new Map<TKey, TValue>()

		for(let value of this.#values)
			map.set(keySelector(value), valueSelector(value))

		return map
	}

	toSet(): Set<T> {
		return new Set(this.#values)
	}

	valueOf(): object {
		return this.#values.valueOf()
	}

	toString(): string {
		return this.#values.toString()
	}

	get [Symbol.toStringTag]() {
		return "Sequence"
	}

	*[Symbol.iterator]() {
		for(let value of this.#values)
			yield value
	}
}

export function seq<T>(...values: T[]): Sequence<T> {
	 return new Sequence(values)
}

console.log(
	...seq(1, 2, 3, 4)
		.select(v => v.toString())
		.range(1, 4)
		.reverse()
		.prepend("Numbers")
		.reduce((a, n) => `${a}, ${n}`)
)