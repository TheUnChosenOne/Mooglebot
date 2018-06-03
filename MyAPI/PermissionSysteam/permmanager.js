
export function permissionManager(perm, ComName, skillName, ClassName, roleName, roleId, userId, Owner, PlayerClass, PayersLvl) {
	let Permission = {
		CommandName: ComName,
		Skill: skillName,
		Class: ClassName,
		RoleName: roleName,
		RoleId: roleId,
		UserId: userId,
		PlayerClass: PlayerClass,
		PayersLvl: PayersLvl,
		IsGuildOwner: Owner,
		hasPermisson: perm,
	}
	PermissionCheck(Permission)
}


export function PermissionCheck(playerPermissionInfo) {
	
}

export function initPlayerPermission(Client, playerPermissionInfo, defaltchannel, saveData) {
	for (let i = 0; i < Client.guilds.array().length; i++) {
		for (let j = 0; j < Client.guilds.array()[i].roles.array().length; j++) {
			console.log(Client.guilds.array()[i].roles.array()[j].id)
			
			const playerPermissiondata = {
				ServerId: Client.guilds.array()[i].id,
				ServerName: Client.guilds.array()[i].name,
				RoleId: Client.guilds.array()[i].roles.array()[j].id,
				RoleName: Client.guilds.array()[i].roles.array()[j].name,
				Command: {},
				Class: { UseableClass: false, },
				Item: { UseableItem: false, },
				Ability: { UseableAbility: false, },
			}
			playerPermissionInfo[playerPermissiondata.ServerId + playerPermissiondata.RoleId] = playerPermissionInfo[playerPermissiondata.ServerId + playerPermissiondata.RoleId] || playerPermissiondata
		}
	}
	saveData()
}
