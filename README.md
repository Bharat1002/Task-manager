# Task-manager-API

This is a Task Manager API application buil using Node.js, express and MongoDB (mongoose ODM).  
API provides several routes.  
Routes for Users such as Login user, Signup user(create user), Update/Delete user, Upload avatar for user.  
Routes for tasks such as Create tasks for current user, Get all tasks of current(logged in) user, Update/Delete tasks.  
API is designed with help of Postman tools and tested using JEST Framework.
 
## Setup
clone repo in your directory
```
https://github.com/Bharat1002/Task-Manager-API.git
```

in src folder create db folder.  
inside db folder create mongoose.js file.  
add MongoDB data base connection in mongoose.js file, it will look like something as below
```
PORT=3000
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');
```
if your database has auth enabled use below connection url
```
const mongoose = require('mongoose');

mongoose.connect('mongodb://user:password@127.0.0.1:27017/task-manager-api');
```

create config directory in root directory of project
create dev.env file in config directory 

in dev.env file add your secret key for token generation (add any random string without space) and mongodb_url for connection
```
PORT=3000
MONGODB_URL='mongodb connection url'
TOKEN_KEY='YourTokenKey'
```
(Optional)  
if you want to send mail on user create and delete, then create mailgun account and get api key and 
domain name and add it in dev.env file as below. in MY_MAIL variable set your mail which you used to create mailgun account.
```
MAIL_GUN_API_KEY=maingun api key from your account
Domain_name='mailgun domai name ends with mailgun.org'
MY_MAIL='Your mail id'
```

run below command to download dependencies
```
npm i
```
Note: Make sure your mongodb server is running

Start Nodemon with below command
```
npm run dev
```

## Postman setup

Create Collection Task App in postman.  
Set authorization type as Bearer Token.  
Provide Token values as {{authToken}}

Create Environment variable Task manager API (dev) at Environment Quick look option  
Set first variable as url, type default and initial value as localhost:3000 (for local machine use)  
Set second variable as authToken and Type default. (No need to set value for it)  

For all the request we make from postman, this environment (dev) will be used.


Adding Requests in Task App Collection

Create User request  
Set Request as POST.  
set route :  {{url}}/users  
Select Body and provide user raw(json) data to create user
```
{
    "name": "Your Name",
    "email": "Your Email",
    "password": "Your password",
    "age": "your age in numbers"
}
```
in Test provide below script. (Script sets authToken value for logged in user).
```
if(pm.response.code === 201){
    pm.environment.set('authToken', pm.response.json().token)
}
```
Save it. This request is used to create new user.

Login User Request  
Set Request as POST.  
Set route :  {{url}}/users/login  
Select Body and provide raw json data with login details
```
{
    "email": "Your email",
    "password": "your password" 
}
```
in Test provide below script. (Script sets authToken value for logged in user).
```
if(pm.response.code === 200){
    pm.environment.set('authToken', pm.response.json().token)
}
```

Logout User Request  
Set Request as POST  
Set route :  {{url}}/users/logout  
Set Authorization Type as inherit auth from parent

Read User Profile Request  
Set Request as GET  
Set route :  {{url}}/users/me  
Set Authorization Type as inherit auth from parent.

Update User Request  
Set Request as PATCH  
Set route :  {{url}}/users/me  
Set Authorization Type as inherit auth from parent  
Select Body and provide raw json data which you want to update
```
{
    "name": "Updated name"
}
```

Delete User Request  
Set Request as DELETE  
Set route :  {{url}}/users/me  
Set Authorization Type as inherit auth from parent

Create Task Request  (for making this requests user must be logged in first)  
Request type POST  
route :  {{url}}/tasks  
Authorization Type inherit auth from parent  
Provide raw json data in body for task
```
{
    "description": "Task description",
    "completed": true or false
}
```

Read Task Request  
Request Type GET  
route :  {{url}}/tasks?sortBy=createdAt:asc  
(query parameters are optional. there's also two other parameter availbale : limit and skip)  
Authorization Type inherit auth from parent

Read Task By id (Optional request as it fetch task by it's id if user have access to that task)  
Request Type GET  
route : {{url}}/tasks/idOfTask  
Authorization Type inherit auth from parent

Update Task Request by id  
Request Type PATCH  
route :  {{url}}/tasks/taskId  
Authorization Type inherit auth from parent  
Provide raw json data in body for task to be updated
```
    "description": "Task updated description",
    "completed": true or false
```

Delete Task Request by id  
Request Type DELETE  
route :  {{url}}/tasks/taskId  
Authorization Type inherit auth from parent

Upload Avatar(Image) for user Request  
Request Type POST  
route :  {{url}}/users/me/avatar  
Authorization Type inherit auth from parent  
Set body data as form-data  
Provid Key value as avatar (Select Type as file)  
in value select image file from your machine

Delete Avatar for user Request  
Request Type DELETE  
route :  {{url}}/users/me/avatar  
Authorization Type inherit auth from parent

## Testing API with JEST
In config folder, create test.env file for setting up test environment.  
copy all details from dev.env to test.env.  
Change database name in MONGODB_URL variable in test.env file.

run below command to run tests on user routes and task routes.
```
npm run test
```