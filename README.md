# webjs [![npm version](https://badge.fury.io/js/webjs-cli.svg)](http://badge.fury.io/js/webjs-cli)

### Installation
```sh
$ [sudo] npm install -g webjs-cli
```

### Create a new app
```sh
$ webjs new my_app
```

### Features &nbsp;
Call any service from any controller!
```javascript
// No need to require your service! :O
var fn = require('../services/myService.js'); // [ X ]
fn.findInArray(users, "id", 1);

// Simply use them in your controllers by the service name B|
myService.findInArray(users, "id", 1); // [ √ ]

```

### Routes &nbsp;
```javascript
/*
 * Routes Config
 */
module.exports {
  // Examples
  '/': 'SampleController.getInfo',
  'POST /user': 'UserController.create',
  // you may also render a view like this
  '/home': 'home'
}
```

### Controllers &nbsp;
```javascript
/*
 * SampleController
 */
module.exports {
  //action
  getInfo: function(req, res){
    SampleService.findInArray(req.param.users, "id", "72A4FC83EF812BA1");
    res.send("ready");
  },
  main: function(req, res){
    res.render("home");
  }
}
```
### Services &nbsp;
```javascript
/*
 * SampleService
 */
module.exports {
  //action
  findInArray: function(array, key, value){
    ...
  }
}
```
