

export function ProcessLeveling(userId, message, previousAuthor, previousMessage, giveExp) {
	const user = message.author
	if (!user.Client) {
		if (message.member.user.bot === false) {
			if (previousAuthor !== user.id &&
				previousMessage.length !== message.content.length) {
				giveExp(userId, message)
			}
			previousAuthor = user.id
			previousMessage = message.content
		}
	}
}