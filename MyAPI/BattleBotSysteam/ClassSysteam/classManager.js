


export function Classes(Client, Classes, ClassName, classeslist, classlist, contents) {
	// const Classes = Classes
	// const ClassName = ClassName
	var guild = Client.guilds.array()
	console.log(`${classlist}`)
	for (let j = 0; j < classlist.length; j++) {
		// try {
		const classsave = classeslist
		const Class = require('../../../Classes/' + classlist[j] + '')
		Class.run(contents, classlist, guild, classsave, Classes, ClassName)
		console.log(`${j}: ${classlist[j]}`)
		// }
		// catch (err) {
		// 	console.log(`ERROR: Class \`${classlist[j]}\` has encountered an error. Please contact Jackmaster9000 or your Server Admin to (hopefully) correct this issue.`)
		// }
	}
}