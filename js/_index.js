// import DamageCalculator from "./core/damageCalculator.js"
// import Gun from "./core/gun.js"
// import Retriever from "./utils/retriever.js"
// import SlideableNumericText from "./utils/slideableNumericText.js"
// let calculator = new DamageCalculator(document.querySelector("canvas"), {
// 	regions: ["head", "neck", "chest", "stomach", "limbs"],
// 	health: 250,
// 	distance: 0
// })
// let input: DamageCalculator.Simulation.Input = {
// 	regions: {
// 		"head": {accuracy: 0.1},
// 		"neck": {accuracy: 0.1},
// 		"chest": {accuracy: 0.3},
// 		"stomach": {accuracy: 0.13},
// 		"limbs": {accuracy: 0.37}
// 	}
// }
// let guns: DamageCalculator.Gun[] = [
// 	{
// 		name: "Test Gun #1",
// 		fireRate: 0,
// 		boltDelay: 0,
// 		profile: {
// 			"head": 40,
// 			"neck": 40,
// 			"chest": 27,
// 			"stomach": 27,
// 			"limbs": 27
// 		}
// 	},
// 	{
// 		name: "Test Gun #2",
// 		fireRate: 0,
// 		boltDelay: 0,
// 		profile: {
// 			"head": 72,
// 			"neck": 57,
// 			"chest": 45,
// 			"stomach": 45,
// 			"limbs": 45
// 		}
// 	}
// ]
// function indexedColor(index: number, count: number): [string, string, string] {
// 	count = Math.max(1, count)
// 	return [
// 		`${index * (360 / count) % 360}`,
// 		"100%",
// 		"50%"
// 	]
// }
// function sync(): void {
// 	document.cookie = `health=${calculator.conditions.health}`
// 	document.cookie = `guns=${JSON.stringify(guns)}`
// 	document.cookie = `input=${JSON.stringify(input)}`
// 	calculator.visualize(...guns.map((gun, i) => ({
// 		name: gun.name,
// 		color: indexedColor(i, guns.length),
// 		output: calculator.simulate(gun, input)
// 	})))
// }
// //Save state
// document.cookie.split(";").map(cookie => {
// 	let [key, value] = cookie.split("=")
// 	key = key.trim()
// 	switch(key) {
// 		case "health":
// 			calculator.conditions.health = parseInt(value)
// 			break
// 		case "guns":
// 			// guns = JSON.parse(value)
// 			break
// 		case "input":
// 			input = JSON.parse(value)
// 			break
// 	}
// })
// //Health
// let inputHealth = document.querySelector<HTMLInputElement>("#health > input")
// inputHealth.valueAsNumber = calculator.conditions.health
// inputHealth.oninput = () => {
// 	calculator.conditions.health = inputHealth.valueAsNumber
// 	sync()
// }
// //Accuracy
// let accuracyIndicators: {[region: string]: SlideableNumericText}
// function constrainIndicator(indicator: SlideableNumericText) {
// 	let remaining = 1 - Object.values(input.regions)
// 		.map(r => r.accuracy)
// 		.reduce((a, b) => a + b, 0)
// 	indicator.max = indicator.value + remaining
// }
// accuracyIndicators = Object.fromEntries(calculator.conditions.regions.map(region => {
// 	let div = document.querySelector<HTMLDivElement>(`#accuracy > #${region}`)
// 	let indicator = new SlideableNumericText({
// 		text: div.querySelector("#text"),
// 		slider: div.querySelector("#slider")
// 	}, newAccuracy => {
// 		input.regions[region].accuracy = newAccuracy
// 		Object.values(accuracyIndicators).forEach(constrainIndicator)
// 		sync()
// 	})
// 	indicator.value = input.regions[region].accuracy
// 	return [region, indicator]
// }))
// Object.values(accuracyIndicators).forEach(constrainIndicator)
// //Guns
// function createGunElement(gun: DamageCalculator.Gun): HTMLDivElement {
// 	let gunElement = document.createElement("div")
// 	gunElement.classList.add("gun")
// 	//Name
// 	let name = document.createElement("p")
// 	name.contentEditable = "true"
// 	name.textContent = gun.name
// 	name.onkeydown = (e: KeyboardEvent) => {
// 		switch(e.key) {
// 			case "Enter":
// 				name.blur()
// 				e.preventDefault()
// 				break
// 		}
// 	}
// 	name.onkeyup = () => {
// 		gun.name = name.textContent
// 		sync()
// 	}
// 	gunElement.append(name)
// 	//Fire rate
// 	let fireRateTerm = document.createElement("dt")
// 	fireRateTerm.textContent = "Fire Rate"
// 	gunElement.append(fireRateTerm)
// 	let fireRateDescription = document.createElement("dd")
// 	fireRateDescription.id = "fireRate"
// 	gunElement.append(fireRateDescription)
// 	let fireRateInput = document.createElement("input")
// 	fireRateInput.type = "number"
// 	fireRateInput.step = "0.1"
// 	fireRateInput.min = "0"
// 	fireRateInput.valueAsNumber = gun.fireRate
// 	fireRateInput.oninput = () => {
// 		gun.fireRate = fireRateInput.valueAsNumber
// 		updateResult()
// 	}
// 	fireRateDescription.append(fireRateInput)
// 	//Open bolt delay
// 	let boltDelayTerm = document.createElement("dt")
// 	boltDelayTerm.textContent = "Open Bolt Delay"
// 	gunElement.append(boltDelayTerm)
// 	let boltDelayDescription = document.createElement("dd")
// 	boltDelayDescription.id = "boltDelay"
// 	gunElement.append(boltDelayDescription)
// 	let boltDelayInput = document.createElement("input")
// 	boltDelayInput.type = "number"
// 	boltDelayInput.step = "0.001"
// 	boltDelayInput.min = "0"
// 	boltDelayInput.valueAsNumber = gun.boltDelay
// 	boltDelayInput.oninput = () => {
// 		gun.boltDelay = boltDelayInput.valueAsNumber
// 		updateResult()
// 	}
// 	boltDelayDescription.append(boltDelayInput)
// 	//Damage profile
// 	let profileTerm = document.createElement("dt")
// 	profileTerm.textContent = "Damage Profile"
// 	gunElement.append(profileTerm)
// 	let profileDescription = document.createElement("dd")
// 	profileDescription.id = "profile"
// 	gunElement.append(profileDescription)
// 	for(let region of calculator.conditions.regions) {
// 		let div = document.createElement("div")
// 		div.id = region
// 		profileDescription.append(div)
// 		let profileInputText = document.createElement("input")
// 		profileInputText.type = "number"
// 		profileInputText.min = "0"
// 		profileInputText.max = calculator.conditions.health.toString()
// 		profileInputText.valueAsNumber = gun.profile[region]
// 		div.append(profileInputText)
// 		let profileInputSlider = document.createElement("input")
// 		profileInputSlider.type = "range"
// 		profileInputSlider.min = "0"
// 		profileInputSlider.max = calculator.conditions.health.toString()
// 		profileInputText.valueAsNumber = gun.profile[region]
// 		div.append(profileInputSlider)
// 		let profileLabel = document.createElement("label")
// 		profileLabel.textContent = `${region[0].toUpperCase()}${region.slice(1)}`
// 		div.append(profileLabel)
// 		let indicator = new SlideableNumericText({
// 			text: profileInputText,
// 			slider: profileInputSlider
// 		}, newDamage => {
// 			gun.profile[region] = newDamage
// 			updateResult()
// 		})
// 		indicator.max = calculator.conditions.health
// 		indicator.value = gun.profile[region]
// 	}
// 	//Remove button
// 	let remove = document.createElement("button")
// 	remove.textContent = "-"
// 	remove.onclick = () => {
// 		let gunIndex = guns.indexOf(gun)
// 		if(gunIndex == -1)
// 			return
// 		guns.splice(gunIndex, 1)
// 		gunElement.remove()
// 		sync()
// 	}
// 	gunElement.append(remove)
// 	gunElement.append(document.createElement("hr"))
// 	function updateResult(): void {
// 		let result = calculator.simulate(gun, input)
// 		let totalDamage = Object.values(result.regions).map(region => region.damageDealt).reduce((a, b) => a + b, 0)
// 		profileTerm.textContent = `${profileTerm.textContent.split(":")[0]}: ${totalDamage}`
// 		let totalBullets = Object.values(result.regions).map(r => r.bullets).reduce((a, b) => a + b)
// 		let ttk = (totalBullets - 1) * (60 / gun.fireRate) + gun.boltDelay
// 		fireRateTerm.textContent = `${fireRateTerm.textContent.split(":")[0]}: ${ttk.toFixed(3)}s`
// 		for(let region of calculator.conditions.regions) {
// 			let rp = profileDescription.querySelector(`#${region} > label`)
// 			rp.textContent = `${rp.textContent.split(":")[0]}: ${result.regions[region].bullets}`
// 		}
// 		sync()
// 	}
// 	updateResult()
// 	return gunElement
// }
// for(let gun of guns)
// 	document.querySelector("#guns > div").append(createGunElement(gun))
// document.querySelector<HTMLButtonElement>("#guns > button").onclick = (_: MouseEvent) => {
// 	let gun = {
// 		name: `Gun #${1 + guns.length}`,
// 		fireRate: 0,
// 		boltDelay: 0,
// 		profile: {
// 			"head": 1,
// 			"neck": 1,
// 			"chest": 1,
// 			"stomach": 1,
// 			"limbs": 1
// 		}
// 	}
// 	guns.push(gun)
// 	sync()
// 	document.querySelector("#guns > div").append(createGunElement(gun))
// }
// //Launch
// window.onload = () => {
// 	sync()
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX2luZGV4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL19pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw0REFBNEQ7QUFDNUQsa0NBQWtDO0FBQ2xDLCtDQUErQztBQUMvQyxxRUFBcUU7QUFFckUsNEVBQTRFO0FBQzVFLDJEQUEyRDtBQUMzRCxnQkFBZ0I7QUFDaEIsZUFBZTtBQUNmLEtBQUs7QUFFTCxtREFBbUQ7QUFDbkQsY0FBYztBQUNkLDZCQUE2QjtBQUM3Qiw2QkFBNkI7QUFDN0IsOEJBQThCO0FBQzlCLGlDQUFpQztBQUNqQyw4QkFBOEI7QUFDOUIsS0FBSztBQUNMLElBQUk7QUFFSix1Q0FBdUM7QUFDdkMsS0FBSztBQUNMLHlCQUF5QjtBQUN6QixpQkFBaUI7QUFDakIsa0JBQWtCO0FBQ2xCLGVBQWU7QUFDZixpQkFBaUI7QUFDakIsaUJBQWlCO0FBQ2pCLGtCQUFrQjtBQUNsQixvQkFBb0I7QUFDcEIsaUJBQWlCO0FBQ2pCLE1BQU07QUFDTixNQUFNO0FBQ04sS0FBSztBQUNMLHlCQUF5QjtBQUN6QixpQkFBaUI7QUFDakIsa0JBQWtCO0FBQ2xCLGVBQWU7QUFDZixpQkFBaUI7QUFDakIsaUJBQWlCO0FBQ2pCLGtCQUFrQjtBQUNsQixvQkFBb0I7QUFDcEIsaUJBQWlCO0FBQ2pCLE1BQU07QUFDTixLQUFLO0FBQ0wsSUFBSTtBQUVKLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFFOUIsWUFBWTtBQUNaLHNDQUFzQztBQUN0QyxZQUFZO0FBQ1osVUFBVTtBQUNWLEtBQUs7QUFDTCxJQUFJO0FBRUosMEJBQTBCO0FBQzFCLDhEQUE4RDtBQUM5RCxvREFBb0Q7QUFDcEQsc0RBQXNEO0FBRXRELG1EQUFtRDtBQUNuRCxvQkFBb0I7QUFDcEIseUNBQXlDO0FBQ3pDLDRDQUE0QztBQUM1QyxRQUFRO0FBQ1IsSUFBSTtBQUVKLGVBQWU7QUFFZiw2Q0FBNkM7QUFDN0Msd0NBQXdDO0FBQ3hDLG9CQUFvQjtBQUVwQixpQkFBaUI7QUFDakIsbUJBQW1CO0FBQ25CLG9EQUFvRDtBQUNwRCxXQUFXO0FBQ1gsaUJBQWlCO0FBQ2pCLGlDQUFpQztBQUNqQyxXQUFXO0FBQ1gsa0JBQWtCO0FBQ2xCLCtCQUErQjtBQUMvQixXQUFXO0FBQ1gsS0FBSztBQUNMLEtBQUs7QUFFTCxXQUFXO0FBRVgsZ0ZBQWdGO0FBQ2hGLDJEQUEyRDtBQUMzRCxnQ0FBZ0M7QUFDaEMsNERBQTREO0FBQzVELFVBQVU7QUFDVixJQUFJO0FBRUosYUFBYTtBQUViLG1FQUFtRTtBQUVuRSxpRUFBaUU7QUFDakUsb0RBQW9EO0FBQ3BELDBCQUEwQjtBQUMxQixnQ0FBZ0M7QUFFaEMsK0NBQStDO0FBQy9DLElBQUk7QUFFSix3RkFBd0Y7QUFDeEYsOEVBQThFO0FBRTlFLDhDQUE4QztBQUM5QyxzQ0FBc0M7QUFDdEMseUNBQXlDO0FBQ3pDLHVCQUF1QjtBQUN2QixpREFBaUQ7QUFDakQsa0VBQWtFO0FBRWxFLFdBQVc7QUFDWCxNQUFNO0FBRU4sb0RBQW9EO0FBRXBELDhCQUE4QjtBQUM5QixNQUFNO0FBRU4sZ0VBQWdFO0FBRWhFLFNBQVM7QUFFVCx5RUFBeUU7QUFDekUsa0RBQWtEO0FBQ2xELG1DQUFtQztBQUVuQyxVQUFVO0FBQ1YsMENBQTBDO0FBQzFDLGlDQUFpQztBQUNqQywrQkFBK0I7QUFDL0IsNENBQTRDO0FBQzVDLG9CQUFvQjtBQUNwQixtQkFBbUI7QUFDbkIsa0JBQWtCO0FBQ2xCLHlCQUF5QjtBQUN6QixZQUFZO0FBQ1osTUFBTTtBQUNOLEtBQUs7QUFDTCwwQkFBMEI7QUFDMUIsZ0NBQWdDO0FBQ2hDLFdBQVc7QUFDWCxLQUFLO0FBQ0wsMkJBQTJCO0FBRTNCLGVBQWU7QUFFZixtREFBbUQ7QUFDbkQsMENBQTBDO0FBQzFDLG1DQUFtQztBQUVuQywwREFBMEQ7QUFDMUQsdUNBQXVDO0FBQ3ZDLDBDQUEwQztBQUUxQyx1REFBdUQ7QUFDdkQsaUNBQWlDO0FBQ2pDLDhCQUE4QjtBQUM5QiwyQkFBMkI7QUFDM0IsOENBQThDO0FBQzlDLG1DQUFtQztBQUNuQywrQ0FBK0M7QUFFL0MsbUJBQW1CO0FBQ25CLEtBQUs7QUFDTCw2Q0FBNkM7QUFFN0MscUJBQXFCO0FBRXJCLG9EQUFvRDtBQUNwRCxpREFBaUQ7QUFDakQsb0NBQW9DO0FBRXBDLDJEQUEyRDtBQUMzRCx5Q0FBeUM7QUFDekMsMkNBQTJDO0FBRTNDLHdEQUF3RDtBQUN4RCxrQ0FBa0M7QUFDbEMsaUNBQWlDO0FBQ2pDLDRCQUE0QjtBQUM1QixnREFBZ0Q7QUFDaEQsb0NBQW9DO0FBQ3BDLGlEQUFpRDtBQUVqRCxtQkFBbUI7QUFDbkIsS0FBSztBQUNMLCtDQUErQztBQUUvQyxvQkFBb0I7QUFFcEIsa0RBQWtEO0FBQ2xELDhDQUE4QztBQUM5QyxrQ0FBa0M7QUFFbEMseURBQXlEO0FBQ3pELHFDQUFxQztBQUNyQyx5Q0FBeUM7QUFFekMsc0RBQXNEO0FBQ3RELDRDQUE0QztBQUM1QyxvQkFBb0I7QUFDcEIsbUNBQW1DO0FBRW5DLDJEQUEyRDtBQUMzRCxxQ0FBcUM7QUFDckMsK0JBQStCO0FBQy9CLG1FQUFtRTtBQUNuRSx5REFBeUQ7QUFDekQsaUNBQWlDO0FBRWpDLDZEQUE2RDtBQUM3RCxzQ0FBc0M7QUFDdEMsaUNBQWlDO0FBQ2pDLHFFQUFxRTtBQUNyRSx5REFBeUQ7QUFDekQsbUNBQW1DO0FBRW5DLHVEQUF1RDtBQUN2RCw4RUFBOEU7QUFDOUUsNkJBQTZCO0FBRTdCLCtDQUErQztBQUMvQyw2QkFBNkI7QUFDN0IsZ0NBQWdDO0FBQ2hDLHNCQUFzQjtBQUN0QixxQ0FBcUM7QUFFckMsb0JBQW9CO0FBQ3BCLE9BQU87QUFFUCxpREFBaUQ7QUFDakQsMENBQTBDO0FBQzFDLEtBQUs7QUFFTCxtQkFBbUI7QUFDbkIsaURBQWlEO0FBQ2pELDRCQUE0QjtBQUM1Qiw0QkFBNEI7QUFDNUIscUNBQXFDO0FBRXJDLHVCQUF1QjtBQUN2QixZQUFZO0FBRVosNkJBQTZCO0FBQzdCLHdCQUF3QjtBQUN4QixXQUFXO0FBQ1gsS0FBSztBQUNMLDZCQUE2QjtBQUU3QixtREFBbUQ7QUFFbkQsbUNBQW1DO0FBQ25DLGlEQUFpRDtBQUVqRCxpSEFBaUg7QUFDakgseUZBQXlGO0FBRXpGLGlHQUFpRztBQUNqRyx1RUFBdUU7QUFDdkUsK0ZBQStGO0FBRS9GLHVEQUF1RDtBQUN2RCxxRUFBcUU7QUFDckUsMkZBQTJGO0FBQzNGLE1BQU07QUFFTixXQUFXO0FBQ1gsS0FBSztBQUVMLGtCQUFrQjtBQUVsQixxQkFBcUI7QUFDckIsSUFBSTtBQUVKLHVCQUF1QjtBQUN2Qix1RUFBdUU7QUFFdkUsNkZBQTZGO0FBQzdGLGVBQWU7QUFDZixxQ0FBcUM7QUFDckMsaUJBQWlCO0FBQ2pCLGtCQUFrQjtBQUNsQixlQUFlO0FBQ2YsZ0JBQWdCO0FBQ2hCLGdCQUFnQjtBQUNoQixpQkFBaUI7QUFDakIsbUJBQW1CO0FBQ25CLGdCQUFnQjtBQUNoQixNQUFNO0FBQ04sS0FBSztBQUVMLGtCQUFrQjtBQUNsQixVQUFVO0FBRVYsdUVBQXVFO0FBQ3ZFLElBQUk7QUFFSixXQUFXO0FBRVgsMEJBQTBCO0FBQzFCLFVBQVU7QUFDVixJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IERhbWFnZUNhbGN1bGF0b3IgZnJvbSBcIi4vY29yZS9kYW1hZ2VDYWxjdWxhdG9yLmpzXCJcbi8vIGltcG9ydCBHdW4gZnJvbSBcIi4vY29yZS9ndW4uanNcIlxuLy8gaW1wb3J0IFJldHJpZXZlciBmcm9tIFwiLi91dGlscy9yZXRyaWV2ZXIuanNcIlxuLy8gaW1wb3J0IFNsaWRlYWJsZU51bWVyaWNUZXh0IGZyb20gXCIuL3V0aWxzL3NsaWRlYWJsZU51bWVyaWNUZXh0LmpzXCJcblxuLy8gbGV0IGNhbGN1bGF0b3IgPSBuZXcgRGFtYWdlQ2FsY3VsYXRvcihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzXCIpLCB7XG4vLyBcdHJlZ2lvbnM6IFtcImhlYWRcIiwgXCJuZWNrXCIsIFwiY2hlc3RcIiwgXCJzdG9tYWNoXCIsIFwibGltYnNcIl0sXG4vLyBcdGhlYWx0aDogMjUwLFxuLy8gXHRkaXN0YW5jZTogMFxuLy8gfSlcblxuLy8gbGV0IGlucHV0OiBEYW1hZ2VDYWxjdWxhdG9yLlNpbXVsYXRpb24uSW5wdXQgPSB7XG4vLyBcdHJlZ2lvbnM6IHtcbi8vIFx0XHRcImhlYWRcIjoge2FjY3VyYWN5OiAwLjF9LFxuLy8gXHRcdFwibmVja1wiOiB7YWNjdXJhY3k6IDAuMX0sXG4vLyBcdFx0XCJjaGVzdFwiOiB7YWNjdXJhY3k6IDAuM30sXG4vLyBcdFx0XCJzdG9tYWNoXCI6IHthY2N1cmFjeTogMC4xM30sXG4vLyBcdFx0XCJsaW1ic1wiOiB7YWNjdXJhY3k6IDAuMzd9XG4vLyBcdH1cbi8vIH1cblxuLy8gbGV0IGd1bnM6IERhbWFnZUNhbGN1bGF0b3IuR3VuW10gPSBbXG4vLyBcdHtcbi8vIFx0XHRuYW1lOiBcIlRlc3QgR3VuICMxXCIsXG4vLyBcdFx0ZmlyZVJhdGU6IDAsXG4vLyBcdFx0Ym9sdERlbGF5OiAwLFxuLy8gXHRcdHByb2ZpbGU6IHtcbi8vIFx0XHRcdFwiaGVhZFwiOiA0MCxcbi8vIFx0XHRcdFwibmVja1wiOiA0MCxcbi8vIFx0XHRcdFwiY2hlc3RcIjogMjcsXG4vLyBcdFx0XHRcInN0b21hY2hcIjogMjcsXG4vLyBcdFx0XHRcImxpbWJzXCI6IDI3XG4vLyBcdFx0fVxuLy8gXHR9LFxuLy8gXHR7XG4vLyBcdFx0bmFtZTogXCJUZXN0IEd1biAjMlwiLFxuLy8gXHRcdGZpcmVSYXRlOiAwLFxuLy8gXHRcdGJvbHREZWxheTogMCxcbi8vIFx0XHRwcm9maWxlOiB7XG4vLyBcdFx0XHRcImhlYWRcIjogNzIsXG4vLyBcdFx0XHRcIm5lY2tcIjogNTcsXG4vLyBcdFx0XHRcImNoZXN0XCI6IDQ1LFxuLy8gXHRcdFx0XCJzdG9tYWNoXCI6IDQ1LFxuLy8gXHRcdFx0XCJsaW1ic1wiOiA0NVxuLy8gXHRcdH1cbi8vIFx0fVxuLy8gXVxuXG4vLyBmdW5jdGlvbiBpbmRleGVkQ29sb3IoaW5kZXg6IG51bWJlciwgY291bnQ6IG51bWJlcik6IFtzdHJpbmcsIHN0cmluZywgc3RyaW5nXSB7XG4vLyBcdGNvdW50ID0gTWF0aC5tYXgoMSwgY291bnQpXG5cbi8vIFx0cmV0dXJuIFtcbi8vIFx0XHRgJHtpbmRleCAqICgzNjAgLyBjb3VudCkgJSAzNjB9YCxcbi8vIFx0XHRcIjEwMCVcIixcbi8vIFx0XHRcIjUwJVwiXG4vLyBcdF1cbi8vIH1cblxuLy8gZnVuY3Rpb24gc3luYygpOiB2b2lkIHtcbi8vIFx0ZG9jdW1lbnQuY29va2llID0gYGhlYWx0aD0ke2NhbGN1bGF0b3IuY29uZGl0aW9ucy5oZWFsdGh9YFxuLy8gXHRkb2N1bWVudC5jb29raWUgPSBgZ3Vucz0ke0pTT04uc3RyaW5naWZ5KGd1bnMpfWBcbi8vIFx0ZG9jdW1lbnQuY29va2llID0gYGlucHV0PSR7SlNPTi5zdHJpbmdpZnkoaW5wdXQpfWBcblxuLy8gXHRjYWxjdWxhdG9yLnZpc3VhbGl6ZSguLi5ndW5zLm1hcCgoZ3VuLCBpKSA9PiAoe1xuLy8gXHRcdG5hbWU6IGd1bi5uYW1lLFxuLy8gXHRcdGNvbG9yOiBpbmRleGVkQ29sb3IoaSwgZ3Vucy5sZW5ndGgpLFxuLy8gXHRcdG91dHB1dDogY2FsY3VsYXRvci5zaW11bGF0ZShndW4sIGlucHV0KVxuLy8gXHR9KSkpXG4vLyB9XG5cbi8vIC8vU2F2ZSBzdGF0ZVxuXG4vLyBkb2N1bWVudC5jb29raWUuc3BsaXQoXCI7XCIpLm1hcChjb29raWUgPT4ge1xuLy8gXHRsZXQgW2tleSwgdmFsdWVdID0gY29va2llLnNwbGl0KFwiPVwiKVxuLy8gXHRrZXkgPSBrZXkudHJpbSgpXG5cbi8vIFx0c3dpdGNoKGtleSkge1xuLy8gXHRcdGNhc2UgXCJoZWFsdGhcIjpcbi8vIFx0XHRcdGNhbGN1bGF0b3IuY29uZGl0aW9ucy5oZWFsdGggPSBwYXJzZUludCh2YWx1ZSlcbi8vIFx0XHRcdGJyZWFrXG4vLyBcdFx0Y2FzZSBcImd1bnNcIjpcbi8vIFx0XHRcdC8vIGd1bnMgPSBKU09OLnBhcnNlKHZhbHVlKVxuLy8gXHRcdFx0YnJlYWtcbi8vIFx0XHRjYXNlIFwiaW5wdXRcIjpcbi8vIFx0XHRcdGlucHV0ID0gSlNPTi5wYXJzZSh2YWx1ZSlcbi8vIFx0XHRcdGJyZWFrXG4vLyBcdH1cbi8vIH0pXG5cbi8vIC8vSGVhbHRoXG5cbi8vIGxldCBpbnB1dEhlYWx0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjaGVhbHRoID4gaW5wdXRcIilcbi8vIGlucHV0SGVhbHRoLnZhbHVlQXNOdW1iZXIgPSBjYWxjdWxhdG9yLmNvbmRpdGlvbnMuaGVhbHRoXG4vLyBpbnB1dEhlYWx0aC5vbmlucHV0ID0gKCkgPT4ge1xuLy8gXHRjYWxjdWxhdG9yLmNvbmRpdGlvbnMuaGVhbHRoID0gaW5wdXRIZWFsdGgudmFsdWVBc051bWJlclxuLy8gXHRzeW5jKClcbi8vIH1cblxuLy8gLy9BY2N1cmFjeVxuXG4vLyBsZXQgYWNjdXJhY3lJbmRpY2F0b3JzOiB7W3JlZ2lvbjogc3RyaW5nXTogU2xpZGVhYmxlTnVtZXJpY1RleHR9XG5cbi8vIGZ1bmN0aW9uIGNvbnN0cmFpbkluZGljYXRvcihpbmRpY2F0b3I6IFNsaWRlYWJsZU51bWVyaWNUZXh0KSB7XG4vLyBcdGxldCByZW1haW5pbmcgPSAxIC0gT2JqZWN0LnZhbHVlcyhpbnB1dC5yZWdpb25zKVxuLy8gXHRcdC5tYXAociA9PiByLmFjY3VyYWN5KVxuLy8gXHRcdC5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKVxuXG4vLyBcdGluZGljYXRvci5tYXggPSBpbmRpY2F0b3IudmFsdWUgKyByZW1haW5pbmdcbi8vIH1cblxuLy8gYWNjdXJhY3lJbmRpY2F0b3JzID0gT2JqZWN0LmZyb21FbnRyaWVzKGNhbGN1bGF0b3IuY29uZGl0aW9ucy5yZWdpb25zLm1hcChyZWdpb24gPT4ge1xuLy8gXHRsZXQgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRGl2RWxlbWVudD4oYCNhY2N1cmFjeSA+ICMke3JlZ2lvbn1gKVxuXG4vLyBcdGxldCBpbmRpY2F0b3IgPSBuZXcgU2xpZGVhYmxlTnVtZXJpY1RleHQoe1xuLy8gXHRcdHRleHQ6IGRpdi5xdWVyeVNlbGVjdG9yKFwiI3RleHRcIiksXG4vLyBcdFx0c2xpZGVyOiBkaXYucXVlcnlTZWxlY3RvcihcIiNzbGlkZXJcIilcbi8vIFx0fSwgbmV3QWNjdXJhY3kgPT4ge1xuLy8gXHRcdGlucHV0LnJlZ2lvbnNbcmVnaW9uXS5hY2N1cmFjeSA9IG5ld0FjY3VyYWN5XG4vLyBcdFx0T2JqZWN0LnZhbHVlcyhhY2N1cmFjeUluZGljYXRvcnMpLmZvckVhY2goY29uc3RyYWluSW5kaWNhdG9yKVxuXG4vLyBcdFx0c3luYygpXG4vLyBcdH0pXG5cbi8vIFx0aW5kaWNhdG9yLnZhbHVlID0gaW5wdXQucmVnaW9uc1tyZWdpb25dLmFjY3VyYWN5XG5cbi8vIFx0cmV0dXJuIFtyZWdpb24sIGluZGljYXRvcl1cbi8vIH0pKVxuXG4vLyBPYmplY3QudmFsdWVzKGFjY3VyYWN5SW5kaWNhdG9ycykuZm9yRWFjaChjb25zdHJhaW5JbmRpY2F0b3IpXG5cbi8vIC8vR3Vuc1xuXG4vLyBmdW5jdGlvbiBjcmVhdGVHdW5FbGVtZW50KGd1bjogRGFtYWdlQ2FsY3VsYXRvci5HdW4pOiBIVE1MRGl2RWxlbWVudCB7XG4vLyBcdGxldCBndW5FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuLy8gXHRndW5FbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJndW5cIilcblxuLy8gXHQvL05hbWVcbi8vIFx0bGV0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxuLy8gXHRuYW1lLmNvbnRlbnRFZGl0YWJsZSA9IFwidHJ1ZVwiXG4vLyBcdG5hbWUudGV4dENvbnRlbnQgPSBndW4ubmFtZVxuLy8gXHRuYW1lLm9ua2V5ZG93biA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG4vLyBcdFx0c3dpdGNoKGUua2V5KSB7XG4vLyBcdFx0XHRjYXNlIFwiRW50ZXJcIjpcbi8vIFx0XHRcdFx0bmFtZS5ibHVyKClcbi8vIFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG4vLyBcdFx0XHRcdGJyZWFrXG4vLyBcdFx0fVxuLy8gXHR9XG4vLyBcdG5hbWUub25rZXl1cCA9ICgpID0+IHtcbi8vIFx0XHRndW4ubmFtZSA9IG5hbWUudGV4dENvbnRlbnRcbi8vIFx0XHRzeW5jKClcbi8vIFx0fVxuLy8gXHRndW5FbGVtZW50LmFwcGVuZChuYW1lKVxuXG4vLyBcdC8vRmlyZSByYXRlXG5cbi8vIFx0bGV0IGZpcmVSYXRlVGVybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkdFwiKVxuLy8gXHRmaXJlUmF0ZVRlcm0udGV4dENvbnRlbnQgPSBcIkZpcmUgUmF0ZVwiXG4vLyBcdGd1bkVsZW1lbnQuYXBwZW5kKGZpcmVSYXRlVGVybSlcblxuLy8gXHRsZXQgZmlyZVJhdGVEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkZFwiKVxuLy8gXHRmaXJlUmF0ZURlc2NyaXB0aW9uLmlkID0gXCJmaXJlUmF0ZVwiXG4vLyBcdGd1bkVsZW1lbnQuYXBwZW5kKGZpcmVSYXRlRGVzY3JpcHRpb24pXG5cbi8vIFx0bGV0IGZpcmVSYXRlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcbi8vIFx0ZmlyZVJhdGVJbnB1dC50eXBlID0gXCJudW1iZXJcIlxuLy8gXHRmaXJlUmF0ZUlucHV0LnN0ZXAgPSBcIjAuMVwiXG4vLyBcdGZpcmVSYXRlSW5wdXQubWluID0gXCIwXCJcbi8vIFx0ZmlyZVJhdGVJbnB1dC52YWx1ZUFzTnVtYmVyID0gZ3VuLmZpcmVSYXRlXG4vLyBcdGZpcmVSYXRlSW5wdXQub25pbnB1dCA9ICgpID0+IHtcbi8vIFx0XHRndW4uZmlyZVJhdGUgPSBmaXJlUmF0ZUlucHV0LnZhbHVlQXNOdW1iZXJcblx0XHRcbi8vIFx0XHR1cGRhdGVSZXN1bHQoKVxuLy8gXHR9XG4vLyBcdGZpcmVSYXRlRGVzY3JpcHRpb24uYXBwZW5kKGZpcmVSYXRlSW5wdXQpXG5cbi8vIFx0Ly9PcGVuIGJvbHQgZGVsYXlcblxuLy8gXHRsZXQgYm9sdERlbGF5VGVybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkdFwiKVxuLy8gXHRib2x0RGVsYXlUZXJtLnRleHRDb250ZW50ID0gXCJPcGVuIEJvbHQgRGVsYXlcIlxuLy8gXHRndW5FbGVtZW50LmFwcGVuZChib2x0RGVsYXlUZXJtKVxuXG4vLyBcdGxldCBib2x0RGVsYXlEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkZFwiKVxuLy8gXHRib2x0RGVsYXlEZXNjcmlwdGlvbi5pZCA9IFwiYm9sdERlbGF5XCJcbi8vIFx0Z3VuRWxlbWVudC5hcHBlbmQoYm9sdERlbGF5RGVzY3JpcHRpb24pXG5cbi8vIFx0bGV0IGJvbHREZWxheUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXG4vLyBcdGJvbHREZWxheUlucHV0LnR5cGUgPSBcIm51bWJlclwiXG4vLyBcdGJvbHREZWxheUlucHV0LnN0ZXAgPSBcIjAuMDAxXCJcbi8vIFx0Ym9sdERlbGF5SW5wdXQubWluID0gXCIwXCJcbi8vIFx0Ym9sdERlbGF5SW5wdXQudmFsdWVBc051bWJlciA9IGd1bi5ib2x0RGVsYXlcbi8vIFx0Ym9sdERlbGF5SW5wdXQub25pbnB1dCA9ICgpID0+IHtcbi8vIFx0XHRndW4uYm9sdERlbGF5ID0gYm9sdERlbGF5SW5wdXQudmFsdWVBc051bWJlclxuXG4vLyBcdFx0dXBkYXRlUmVzdWx0KClcbi8vIFx0fVxuLy8gXHRib2x0RGVsYXlEZXNjcmlwdGlvbi5hcHBlbmQoYm9sdERlbGF5SW5wdXQpXG5cbi8vIFx0Ly9EYW1hZ2UgcHJvZmlsZVxuXG4vLyBcdGxldCBwcm9maWxlVGVybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkdFwiKVxuLy8gXHRwcm9maWxlVGVybS50ZXh0Q29udGVudCA9IFwiRGFtYWdlIFByb2ZpbGVcIlxuLy8gXHRndW5FbGVtZW50LmFwcGVuZChwcm9maWxlVGVybSlcblxuLy8gXHRsZXQgcHJvZmlsZURlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRkXCIpXG4vLyBcdHByb2ZpbGVEZXNjcmlwdGlvbi5pZCA9IFwicHJvZmlsZVwiXG4vLyBcdGd1bkVsZW1lbnQuYXBwZW5kKHByb2ZpbGVEZXNjcmlwdGlvbilcblxuLy8gXHRmb3IobGV0IHJlZ2lvbiBvZiBjYWxjdWxhdG9yLmNvbmRpdGlvbnMucmVnaW9ucykge1xuLy8gXHRcdGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4vLyBcdFx0ZGl2LmlkID0gcmVnaW9uXG4vLyBcdFx0cHJvZmlsZURlc2NyaXB0aW9uLmFwcGVuZChkaXYpXG5cbi8vIFx0XHRsZXQgcHJvZmlsZUlucHV0VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxuLy8gXHRcdHByb2ZpbGVJbnB1dFRleHQudHlwZSA9IFwibnVtYmVyXCJcbi8vIFx0XHRwcm9maWxlSW5wdXRUZXh0Lm1pbiA9IFwiMFwiXG4vLyBcdFx0cHJvZmlsZUlucHV0VGV4dC5tYXggPSBjYWxjdWxhdG9yLmNvbmRpdGlvbnMuaGVhbHRoLnRvU3RyaW5nKClcbi8vIFx0XHRwcm9maWxlSW5wdXRUZXh0LnZhbHVlQXNOdW1iZXIgPSBndW4ucHJvZmlsZVtyZWdpb25dXG4vLyBcdFx0ZGl2LmFwcGVuZChwcm9maWxlSW5wdXRUZXh0KVxuXHRcbi8vIFx0XHRsZXQgcHJvZmlsZUlucHV0U2xpZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXG4vLyBcdFx0cHJvZmlsZUlucHV0U2xpZGVyLnR5cGUgPSBcInJhbmdlXCJcbi8vIFx0XHRwcm9maWxlSW5wdXRTbGlkZXIubWluID0gXCIwXCJcbi8vIFx0XHRwcm9maWxlSW5wdXRTbGlkZXIubWF4ID0gY2FsY3VsYXRvci5jb25kaXRpb25zLmhlYWx0aC50b1N0cmluZygpXG4vLyBcdFx0cHJvZmlsZUlucHV0VGV4dC52YWx1ZUFzTnVtYmVyID0gZ3VuLnByb2ZpbGVbcmVnaW9uXVxuLy8gXHRcdGRpdi5hcHBlbmQocHJvZmlsZUlucHV0U2xpZGVyKVxuXG4vLyBcdFx0bGV0IHByb2ZpbGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKVxuLy8gXHRcdHByb2ZpbGVMYWJlbC50ZXh0Q29udGVudCA9IGAke3JlZ2lvblswXS50b1VwcGVyQ2FzZSgpfSR7cmVnaW9uLnNsaWNlKDEpfWBcbi8vIFx0XHRkaXYuYXBwZW5kKHByb2ZpbGVMYWJlbClcblxuLy8gXHRcdGxldCBpbmRpY2F0b3IgPSBuZXcgU2xpZGVhYmxlTnVtZXJpY1RleHQoe1xuLy8gXHRcdFx0dGV4dDogcHJvZmlsZUlucHV0VGV4dCxcbi8vIFx0XHRcdHNsaWRlcjogcHJvZmlsZUlucHV0U2xpZGVyXG4vLyBcdFx0fSwgbmV3RGFtYWdlID0+IHtcbi8vIFx0XHRcdGd1bi5wcm9maWxlW3JlZ2lvbl0gPSBuZXdEYW1hZ2VcblxuLy8gXHRcdFx0dXBkYXRlUmVzdWx0KClcbi8vIFx0XHR9KVxuXG4vLyBcdFx0aW5kaWNhdG9yLm1heCA9IGNhbGN1bGF0b3IuY29uZGl0aW9ucy5oZWFsdGhcbi8vIFx0XHRpbmRpY2F0b3IudmFsdWUgPSBndW4ucHJvZmlsZVtyZWdpb25dXG4vLyBcdH1cblxuLy8gXHQvL1JlbW92ZSBidXR0b25cbi8vIFx0bGV0IHJlbW92ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcbi8vIFx0cmVtb3ZlLnRleHRDb250ZW50ID0gXCItXCJcbi8vIFx0cmVtb3ZlLm9uY2xpY2sgPSAoKSA9PiB7XG4vLyBcdFx0bGV0IGd1bkluZGV4ID0gZ3Vucy5pbmRleE9mKGd1bilcblxuLy8gXHRcdGlmKGd1bkluZGV4ID09IC0xKVxuLy8gXHRcdFx0cmV0dXJuXG5cbi8vIFx0XHRndW5zLnNwbGljZShndW5JbmRleCwgMSlcbi8vIFx0XHRndW5FbGVtZW50LnJlbW92ZSgpXG4vLyBcdFx0c3luYygpXG4vLyBcdH1cbi8vIFx0Z3VuRWxlbWVudC5hcHBlbmQocmVtb3ZlKVxuXG4vLyBcdGd1bkVsZW1lbnQuYXBwZW5kKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoclwiKSlcblxuLy8gXHRmdW5jdGlvbiB1cGRhdGVSZXN1bHQoKTogdm9pZCB7XG4vLyBcdFx0bGV0IHJlc3VsdCA9IGNhbGN1bGF0b3Iuc2ltdWxhdGUoZ3VuLCBpbnB1dClcblxuLy8gXHRcdGxldCB0b3RhbERhbWFnZSA9IE9iamVjdC52YWx1ZXMocmVzdWx0LnJlZ2lvbnMpLm1hcChyZWdpb24gPT4gcmVnaW9uLmRhbWFnZURlYWx0KS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKVxuLy8gXHRcdHByb2ZpbGVUZXJtLnRleHRDb250ZW50ID0gYCR7cHJvZmlsZVRlcm0udGV4dENvbnRlbnQuc3BsaXQoXCI6XCIpWzBdfTogJHt0b3RhbERhbWFnZX1gXG5cbi8vIFx0XHRsZXQgdG90YWxCdWxsZXRzID0gT2JqZWN0LnZhbHVlcyhyZXN1bHQucmVnaW9ucykubWFwKHIgPT4gci5idWxsZXRzKS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKVxuLy8gXHRcdGxldCB0dGsgPSAodG90YWxCdWxsZXRzIC0gMSkgKiAoNjAgLyBndW4uZmlyZVJhdGUpICsgZ3VuLmJvbHREZWxheVxuLy8gXHRcdGZpcmVSYXRlVGVybS50ZXh0Q29udGVudCA9IGAke2ZpcmVSYXRlVGVybS50ZXh0Q29udGVudC5zcGxpdChcIjpcIilbMF19OiAke3R0ay50b0ZpeGVkKDMpfXNgXG5cbi8vIFx0XHRmb3IobGV0IHJlZ2lvbiBvZiBjYWxjdWxhdG9yLmNvbmRpdGlvbnMucmVnaW9ucykge1xuLy8gXHRcdFx0bGV0IHJwID0gcHJvZmlsZURlc2NyaXB0aW9uLnF1ZXJ5U2VsZWN0b3IoYCMke3JlZ2lvbn0gPiBsYWJlbGApXG4vLyBcdFx0XHRycC50ZXh0Q29udGVudCA9IGAke3JwLnRleHRDb250ZW50LnNwbGl0KFwiOlwiKVswXX06ICR7cmVzdWx0LnJlZ2lvbnNbcmVnaW9uXS5idWxsZXRzfWBcbi8vIFx0XHR9XG5cbi8vIFx0XHRzeW5jKClcbi8vIFx0fVxuXG4vLyBcdHVwZGF0ZVJlc3VsdCgpXG5cbi8vIFx0cmV0dXJuIGd1bkVsZW1lbnRcbi8vIH1cblxuLy8gZm9yKGxldCBndW4gb2YgZ3Vucylcbi8vIFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNndW5zID4gZGl2XCIpLmFwcGVuZChjcmVhdGVHdW5FbGVtZW50KGd1bikpXG5cbi8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2d1bnMgPiBidXR0b25cIikub25jbGljayA9IChfOiBNb3VzZUV2ZW50KSA9PiB7XG4vLyBcdGxldCBndW4gPSB7XG4vLyBcdFx0bmFtZTogYEd1biAjJHsxICsgZ3Vucy5sZW5ndGh9YCxcbi8vIFx0XHRmaXJlUmF0ZTogMCxcbi8vIFx0XHRib2x0RGVsYXk6IDAsXG4vLyBcdFx0cHJvZmlsZToge1xuLy8gXHRcdFx0XCJoZWFkXCI6IDEsXG4vLyBcdFx0XHRcIm5lY2tcIjogMSxcbi8vIFx0XHRcdFwiY2hlc3RcIjogMSxcbi8vIFx0XHRcdFwic3RvbWFjaFwiOiAxLFxuLy8gXHRcdFx0XCJsaW1ic1wiOiAxXG4vLyBcdFx0fVxuLy8gXHR9XG5cbi8vIFx0Z3Vucy5wdXNoKGd1bilcbi8vIFx0c3luYygpXG5cbi8vIFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNndW5zID4gZGl2XCIpLmFwcGVuZChjcmVhdGVHdW5FbGVtZW50KGd1bikpXG4vLyB9XG5cbi8vIC8vTGF1bmNoXG5cbi8vIHdpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4vLyBcdHN5bmMoKVxuLy8gfSJdfQ==