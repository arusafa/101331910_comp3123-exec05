const express = require('express');
const path = require('path');
const fs = require('fs');
const { json } = require('express');
const app = express();
const router = express.Router();

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {

  const filePath = path.join(__dirname, 'home.html');
  res.sendFile(filePath);
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res,next) => {
  
  const JsonPath = path.join(__dirname, 'user.json');
  var data = fs.readFileSync(JsonPath, { encoding: 'latin1' })
  data = JSON.parse(data);
  res.json(data);
  next()
});
/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req,res) => {
  const {username, password} = req.query;
  var data = fs.readFileSync(JsonPath, { encoding: "latin1" });
  data = JSON.parse(data);

  if(data.username == username && data.password == password){
    res.send({
      status: true,
      message: "User Is valid"
    })

  if(data.username != username){
    res.send({
      status: false,
      message: "User Name is Invalid"
    })
  }

  if(data.password != password){
    res.send({
      status: false,
      message: "Password is Invalid"
    })
  }
}
})

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req,res) => {

  const username = req.params.username;
  res.send(`<b>${username} successfully logout.<b>`)
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));
console.log("Server is running at http://localhost:8081");
console.log('Press Ctrl + C to stop server');
