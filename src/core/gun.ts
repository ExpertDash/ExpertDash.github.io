type Constructor<T> = (...args: any[]) => T

/**
 * Describes aspects of the gun being used
 */
export interface Gun {
	/** Name of the weapon */
	name: string

	/** Weapon category */
	category?: string

	/** Fire rate of the weapon (RPM) */
	fireRate: number

	/** Open bolt delay of the weapon (seconds) */
	boltDelay?: number

	/** Describes damage for each bullet under certain conditions */
	profile: Gun.Profile[]
}

export namespace Gun {
	export interface Profile {
		/** Distance in meters where these damage values start being used */
		distance: number

		/** Damage at each hitbox region */
		damage: {[region: string]: number}
	}

	/**
	 * Parses guns from a CSV table of data
	 * @param data Gun data table
	 */
	export function parseCSV(data: string): Gun[] {
		let table = data.match(/.*(\r\n|\n|\r)/g)
			.map(line => line.match(/(.*)(\r\n|\n|\r)/)[1])
			.map(line => line.split(/,/g))

		let columnDescriptions = table[table.findIndex(row => row[0] == "Weapon")]
		let columnRegistry: Map<string, number> = new Map(columnDescriptions.map((column, i) => ([
			column,
			i
		])))

		let dropoffRanges = columnDescriptions.filter(name => /DMG Drop$/g.test(name)).length

		function getValue<T>(row: number, name: string | RegExp, type: Constructor<T>, defaultValue: T = null): T {
			function getColumn(): number {
				switch(typeof name) {
					case "string":
						return columnRegistry.get(name)
					default:
						switch(true) {
							case name instanceof RegExp:
								for(let [key, value] of columnRegistry)
									if(name.test(key))
										return value

								throw new Error(`No column found matching regex '${name}'`)
							default:
								throw new Error(`Unable to find name based on type '${name.constructor.name}'`)
						}
				}
			}

			let value = table[row][getColumn()]

			switch(type as any) {
				case String:
					if(!value)
						return defaultValue

					return value as any
				case Number:
					if(!value)
						return defaultValue

					return (parseFloat(value) as number || defaultValue) as any
				default:
					throw new Error(`Unable to get '${name}' for row ${row} as '${type.name}'`)
			}
		}

		let guns: Gun[] = []

		for(let headerRowIndex of table.map((_, i) => i).filter(i => table[i][0] == "Weapon")) {
			let category = table[headerRowIndex - 2][0]

			for(let i = headerRowIndex + 1; i < table.length && table[i][0]; i++) {
				guns.push({
					name: getValue(i, "Weapon", String),
					fireRate: getValue(i, "Rate of Fire", Number),
					boltDelay: getValue(i, "OBD", Number, 0),
					category: category,
					profile: [...Array(1 + dropoffRanges).keys()].map(dri => (<Gun.Profile>{
						distance: dri == 0 ? 0 : getValue(i, new RegExp(`^${dri}.*DMG\\sDrop$`, "g"), Number, Infinity),
						damage: {
							head: getValue(i, new RegExp(`^Head\\s\\(${1 + dri}`, "g"), Number, 0),
							neck: getValue(i, new RegExp(`^Neck\\s\\(${1 + dri}`, "g"), Number, 0),
							chest: getValue(i, new RegExp(`^Chest\\s\\(${1 + dri}`, "g"), Number, 0),
							stomach: getValue(i, new RegExp(`^Stomach\\s\\(${1 + dri}`, "g"), Number, 0),
							limbs: getValue(i, new RegExp(`^Limbs\\s\\(${1 + dri}`, "g"), Number, 0)
						}
					}))
				})
			}
		}

		return guns
	}
}

export default Gun