import Entity, {entity} from "../../../js/ecs/entity.js"
import init, {test, vec3, Vector3, quat, Quaternion, Transform} from "./dgcore/dgcore.js"

Entity.registerComponent(Transform)

void (async () => {
	await init()

	console.log(test())

	let v = vec3(1, 2, 4)
	console.log(`${v} and ${quat(1, 2, 3, 4)}`)

	let e = entity(2)
	let t = new Transform(Vector3.zero(), Quaternion.identity(), Vector3.zero())
	e.introduce(t)

	console.log(e.get(Transform))
})()