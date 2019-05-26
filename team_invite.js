
var runBot = function(emailAddress, teamname) {

	return new Promise(function(resolve) {

		process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'] + '/gopath/bin';

		const Bot = require('keybase-bot')

		const bot = new Bot()
		const username = process.env['KEYBASE_BOT_USERNAME']
		const paperkey = process.env['KEYBASE_BOT_PAPERKEY']
		bot
		  .init(username, paperkey, {verbose: false})
		  .then(() => {
		    console.log(`Your bot is initialized. It is logged in as ${bot.myInfo().username}`)

			await bot.team.addMembers({
				team: teamname,
				emails: [{email: emailAddress, role: 'writer'}],
			})
			resolve(true);

		  })
		  .catch(error => {
		    console.error(error)
		    bot.deinit()
			resolve(false);
		  })

	});
};
exports.handler = async (event) => {


  	const requestBody = JSON.parse(event.body);
	const emailAddress = requestBody.email_address;
  	const teamname = requestBody.teamname;

	var invokeBot = await runBot(emailAddress, teamname);
	const response = {
		statusCode: 200,
		body: JSON.stringify(invokeBot),
	};
	return response;
};
