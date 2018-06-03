
import { clean } from '../BotLevelSysteam/levelProcessing'


export function skills(Client, Skillablity, SkillName, Skilllist, Skillslists, botlogs) {

	const server = Client.guilds.array()

	for (let j = 0; j < Skillslists.length; j++) {
		try {
			const skill = require('../../Skills/' + Skillslists[j])
			skill.run(Skillablity, SkillName, Skilllist, server)
			botlogs(`${j}: ${Skillslists[j]}`)
		} catch (err) { botlogs(`ERROR: Skill \`${Skillslists[j]}\` has encountered an error. Please contact Jackmaster9000 or your Server Admin to (hopefully) correct this issue.\n\`\`\`js\n${clean(err)}\`\`\``) }
	}
}
