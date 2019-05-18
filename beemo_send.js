
	var runBot = function(recipient, message) {

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

		    const channel = {name: recipient + ',' + bot.myInfo().username, public: false, topicType: 'chat'}
		    const keybase_message = {
		      body: message
		    }

		    bot.chat
		      .send(channel, keybase_message)
		      .then(() => {
			console.log('Message sent!')
			bot.deinit()
			resolve(true);
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
	const message = requestBody.message;

	var invokeBot = await runBot(recipient, message);
	const response = {
		statusCode: 200,
		body: JSON.stringify(invokeBot),
	};
	return response;
};
