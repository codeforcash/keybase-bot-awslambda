
	var runBot = function(recipient) {

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

 		    bot.team
			  .addMembers({
			    team: 'codeforcash',
			    usernames: [{username: recipient, role: 'reader'}],
			  })
			  .then(res => { 
			    console.log(res)
			    bot.deinit()
			    resolve(res)
			  })
			  .catch(error => {

				console.error(error)
				bot.deinit()
				resolve(false);
			  
			  })

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
  	const recipient = requestBody.recipient;

	var invokeBot = await runBot(recipient);
	const response = {
		statusCode: 200,
		body: invokeBot 
	};
	return response;
};
