# Task-manager-API

This is a Task Manager API application buil using Node.js, express and MongoDB (mongoose ODM).

## Setup
clone repo in your directory
```
https://github.com/Bharat1002/Task-Manager-API.git
```

in src folder create db folder.
inside db folder create mongoose.js file.
add MongoDB data base connection in mongoose.js file, it will look like something as below
```
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');
```
if your database has auth enabled use below connection url
```
const mongoose = require('mongoose');

mongoose.connect('mongodb://user:password@127.0.0.1:27017/task-manager-api');
```

create .env file in root directory of project

in .env file add your secret key for token generation
```
TOKEN_KEY='YourTokenKey'
```

run below command to download dependencies
```
npm i
```
Note: Make sure your mongodb server is running

