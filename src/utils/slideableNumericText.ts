type Callback = (oldValue: number, newValue: number) => number | void

export default class SlideableNumericText {
	public readonly text: HTMLInputElement
	public readonly slider: HTMLInputElement
	private lastValue: number

	public constructor({text, slider}: {text: HTMLInputElement, slider: HTMLInputElement}, listener?: Callback) {
		this.text = text
		this.slider = slider
		this.lastValue = this.value

		text.onchange = slider.oninput = (event: Event) => {
			let value = (event.target as HTMLInputElement).valueAsNumber
			
			let result = listener?.(this.lastValue, value)

			if(result === undefined)
				this.value = value
			else {
				event.preventDefault()
				this.value = result as number
			}
		}
	}

	public get value(): number {
		return this.text.valueAsNumber
	}

	public set value(value: number) {
		let precision = Math.log10(Math.max(0, Math.ceil(1 / Math.min(parseFloat(this.text.step), parseFloat(this.slider.step)))))
		value = parseFloat(value.toFixed(precision))

		this.text.valueAsNumber = value
		this.slider.valueAsNumber = value
		this.lastValue = value
	}

	public get max(): number {
		return parseFloat(this.text.max)
	}

	public set max(value: number) {
		this.text.max = value.toString()
		this.slider.max = value.toString()
	}

	public get min(): number {
		return parseFloat(this.text.min)
	}

	public set min(value: number) {
		this.text.min = value.toString()
		this.slider.min = value.toString()
	}
}