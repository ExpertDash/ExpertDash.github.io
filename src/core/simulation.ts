/**
 * Simulation of a gun under the specified conditions
 */
export namespace Simulation {
	/** Conditions of the target the gun is firing on */
	export interface Scenario {
		/** Target health */
		health: number

		/** Distance to the target */
		distance: number

		/** Regions on the target hitbox */
		regions: string[]

		/**
		 * Indicates the proportion of shots which land into the specified region
		 * The total distribution must always be 1 as the simulation assumes the target is killed
		 */
		distribution: {[region: string]: number}
	}

	/** The result of the simulation */
	export interface Result {
		regions: {[region: string]: Result.Region}
	}

	export namespace Result {
		export interface Region {
			raw: {
				/** Fractional bullets landing in the region */
				bullets: number
	
				/** Fractional damage dealt to the region */
				damageDealt: number
			}

			/** Integer bullets landing in the region */
			bullets: number

			/** Integer damage dealt to the region */
			damageDealt: number

			/** Simulated accuracy of bullets on the region */
			trueDistribution: number

			/** Difference between simulated accuracy and target accuracy */
			deviation: number
		}
	}
}

export default Simulation