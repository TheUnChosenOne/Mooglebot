

export function commands(message, userId, Classes, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS, user, botlogs, bots, botInfo, defaltchannel, Commands, CommandName, Client, contents, commandlist, pPI) {
	
	for (let j = 0; j < commandlist.length; j++) {

		let cmd = require('../../Commands/' + commandlist[j] + '')
		// console.log(ifCommand(contents.comstart, cmd.getCommand()[0], cmd.getCommand()[1], message))
		if (ifCommand(contents.comstart, cmd.getCommand()[0], cmd.getCommand()[1], message, contents)) {
			cmd.run(message, userId, Classes, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS, user, botlogs, bots, botInfo, defaltchannel, Commands, CommandName, Client, contents, commandlist, pPI)
		}
		cmd.help(Commands, CommandName)

	}
}

const ifCommand =
    (comstart, command, parameters, message, contents) => {
    	if (parameters !== null) {
    		if (parameters.constructor.name === 'RegExp') { parameters = String(parameters).match(/\/(.*)\//i)[1] }
    	} else parameters = ''
    	switch (command.constructor.name) {
    	case 'Array':
    		for (let ii = 0; ii < command.length; ii++) {
    			let regex = new RegExp(comstart + command[ii] + '\s*' + parameters, 'i')
    			if (message.content.toLowerCase().startsWith(comstart + command[ii].toLowerCase()) && regex.test(message.content)) {
    				return true
    				ii = command.length
    			}
    		}
    		// contents.matchCommand(comstart, command, parameters, message)
    		return false
    		break
    	case 'String':
    		let regex = new RegExp(comstart + command + ' ' + parameters)
    		return Boolean(message.content.toLowerCase().startsWith(comstart + command.toLowerCase()) && regex.test(message.content))
    		break
    	case 'RegExp':
    		let sw = command.match(/\/_(\S*)/i)
    		return Boolean(command.test(message.content) && message.content.toLowerCase().startsWith(comstart + sw.toLowerCase()))
    		break
    	default:
    		if (message.startsWith(comstart) || message.startsWith(contents.comstart)) throw (`command inputed was not an Array, String, or RegExp: ${comstart} | ${command} | ${parameters}\n if you do not understand why this happened, contact Jackmaster9000.`)
    	}
	}
	


export function commandHelp(commandlist, Commands, CommandName) {

	for (let j = 0; j < commandlist.length; j++) {
		let cmd = require('../../Commands/' + commandlist[j] + '')
		cmd.help(Commands, CommandName)

	}
}

export function commandPermisson(commandlist, Client, playerPermissionInfo, saveData) {

	for (let j = 0; j < commandlist.length; j++) {
		let cmd = require('../../Commands/' + commandlist[j] + '')
		cmd.permission(Client, playerPermissionInfo, saveData)

	}
}
