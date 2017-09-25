const Command = require('../../structures/Command');
const snekfetch = require('snekfetch');

module.exports = class RobohashCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'robohash',
			group: 'image-edit',
			memberName: 'robohash',
			description: 'Creates a robot based on the text you provide.',
			clientPermissions: ['ATTACH_FILES'],
			args: [
				{
					key: 'text',
					prompt: 'What text should be used for generation?',
					type: 'string',
					parse: text => encodeURIComponent(text)
				}
			]
		});
	}

	async run(msg, { text }) {
		try {
			const { body } = await snekfetch
				.get(`https://robohash.org/${text}`);
			return msg.say({ files: [{ attachment: body, name: 'robohash.png' }] });
		} catch (err) {
			return msg.say(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};
