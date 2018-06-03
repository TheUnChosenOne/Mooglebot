import { clean } from '../../BotLevelSysteam/levelProcessing'
import { run } from '../../../Enemys/bunny';




export function monsters(monsters, Enemyslist, Enemys) {
	for (let j = 0; j < Enemys.length; j++) {
		const mon = require(`../../../Enemys/${Enemys[j]}`)
		mon.run(monsters, Enemyslist, Enemys)
		console.log(`${j}: ${Enemys[j]}`)
	}
}
run