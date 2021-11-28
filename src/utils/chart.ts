import "https://cdn.jsdelivr.net/npm/chart.js@3.5.1/dist/chart.min.js"

declare class Chart {
	data: Chart.Data
	constructor(canvas: CanvasRenderingContext2D, config: Chart.Config)
	update(): void
	destroy(): void
}

export namespace Chart {
	export interface Data {
		labels?: string[]
		datasets?: Dataset[]
	}

	export interface Dataset {
		label?: string
		data: number[] | {x: number, y: number}[]
		backgroundColor?: string[]
		borderColor?: string[]
		borderWidth?: number
		hidden?: boolean
	}

	export interface Config {
		type: string
		data?: Data
		options?: Config.Options | any
	}

	export namespace Config {
		export interface Options {
			responsive?: boolean
			maintainAspectRatio?: boolean
			borderWidth?: number
			scales?: {x?: Options.Scale, y?: Options.Scale}
			animation?: Options.Animation
		}

		export namespace Options {
			export interface Scale {
				beginAtZero?: boolean
				suggestedMax?: number
			}

			export interface Animation {
				duration?: number
			}
		}
	}
}

export default Chart