


export function leveling(lvl, cerrentXP, expNeeded, minLevel, maxLevel, levelSys) {
	for (lvl = minLevel; lvl <= maxLevel; lvl++) {
		cerrentXP += Math.floor(lvl + 300 * Math.pow(1, lvl / 7))
		// moogle.botlogs('Level ' + (lvl) + ' - ' + expNeeded + ' xp
		const levels = {
			Level: (lvl),
			Exp: expNeeded
		}
		levelSys.push(levels)
		if (lvl >= minLevel)
			expNeeded = Math.floor(cerrentXP / 4)
	}
} 