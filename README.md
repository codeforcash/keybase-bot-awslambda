# keybase-bot-awslambda
A keybase bot hosted on AWS Lambda

TL;DR:

* This is a project to get https://github.com/keybase/keybase-bot running on AWS lambda

* AWS Lambda doesnt ship with the which binary, or obscures access, so `const keybaseBinaryLocation = await whichKeybase();`
became `const keybaseBinaryLocation = process.env['LAMBDA_TASK_ROOT'] + '/gopath/bin/keybase';`

* keybaseStatus was not returning the device name. i didn't want to bug the keybase devs with questions about why this was, so

```
if (status && status.Username && status.Device && status.Device.name) {
    return {
      username: status.Username,
      devicename: status.Device.name,
      homeDir
    };
  }
```

became 

```
if(status) {
    return {
      username: 'beemo',
      devicename: 'awslambda',
      homeDir
    };
   }
```

==

The compiled keybase go client binary is just in gopath/bin - maybe worth noting that it was built on ec2 amazon linux instance.

To build, run `zip -r KeybaseBot.zip .` then upload to lambda and config the username + paperkey envvars within lambda`

* Endpoints

** beemo-channel-send parameters
```
keybase_channel: required
message: required
topic_name: optional (defaults to 'general')
```
