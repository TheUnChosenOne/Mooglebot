


export function skills(Client, Skillablity, SkillName, Skilllist, skillslist) {
	const server = Client.guilds.array()
	for (let j = 0; j < skillslist.length; j++) {
		try {
			const skill = require(`../../../skills/${skillslist[j]}`)
			skill.run(Skillablity, SkillName, Skilllist, server)
			console.log(`${j}: ${skillslist[j]}`)
		}
		catch (err) {
			console.log(`ERROR: Skill \`${skillslist[j]}\` has encountered an error. Please contact Jackmaster9000 or your Server Admin to (hopefully) correct this issue.\n\`\`\`js\n${clean(err)}\`\`\``)
		}
	}
}