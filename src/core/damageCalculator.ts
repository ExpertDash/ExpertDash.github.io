import {mathx} from "/lib/cobrasu/core.js"
import Simulation from "./simulation.js"
import Gun from "./gun.js"

export default class DamageCalculator {
	public static simulate({profile, scenario}: {profile: Gun.Profile, scenario: Simulation.Scenario}): Simulation.Result {
		let regions = Object.fromEntries(scenario.regions.map(name => [name, (<Simulation.Result.Region>{
			raw: {
				bullets: 0,
				damageDealt: 0,
			},
			bullets: 0,
			damageDealt: 0,
			trueDistribution: 0,
			deviation: 0
		})]))

		let getDamage = (region: string) => 1 / profile.damage[region] * scenario.distribution[region] * scenario.health
		let roundDown = (value: number) => Math.max(0, Math.floor(value))
		let getTotalDamage = () => Object.values(regions).map(region => region.damageDealt).reduce((a, b) => a + b, 0)
		let getTotalBullets = () => Object.values(regions).map(region => region.bullets).reduce((a, b) => a + b, 0)

		let calculateStats = () => {
			for(let [name, region] of Object.entries(regions)) {
				region.damageDealt = region.bullets * profile.damage[name]
				region.trueDistribution = region.bullets / getTotalBullets()
				region.deviation = region.trueDistribution - scenario.distribution[name]
			}
		}

		for(let [name, region] of Object.entries(regions)) {
			region.raw.bullets = getDamage(name)
			region.raw.damageDealt = region.raw.bullets * profile.damage[name]
			region.bullets = roundDown(region.raw.bullets)
		}

		calculateStats()

		while(getTotalDamage() > scenario.health) {
			let regionValues = Object.values(regions)
			let minDeviationIndex = mathx.argmax(...regionValues.map(region => region.deviation))
			regionValues[minDeviationIndex].bullets -= 1

			calculateStats()
		}

		while(getTotalDamage() < scenario.health) {
			let regionValues = Object.values(regions)
			let minDeviationIndex = mathx.argmin(...regionValues.map(region => region.deviation))
			regionValues[minDeviationIndex].bullets += 1

			calculateStats()
		}

		return {regions: regions}
	}
}