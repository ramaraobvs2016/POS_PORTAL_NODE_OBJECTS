///1. Get All Packages
var express = require('express');
var bodyParser = require('body-parser');
var mongoConnect = require('mongoose');
var jsonWebToken = require('jsonwebtoken');
var cors = require('cors');
 
//2. Declare the Express object
var object = express();
object.use(cors());
//3. The Express Route
var apirouting = express.Router();
 
//4. Set the port for communication
var communicationPort = 5050;
 
//5. Object to store MongoDB Connection and Secret
var impObject = {
    'jwtSecret': 'xtytzt00700tytx',
    'connStr': 'mongodb://localhost/UserInformation'
};
 
 
//6. The MongoDB Connection
mongoConnect.connect(impObject.connStr);
//7. The Connection object
var db = mongoConnect.Connection; // The Connection object
 
if (db == 'undefined') {
    console.log("The Connecion issues");
}
//8. The User Schema
var userInfoSchema = mongoConnect.Schema({
    UserName: String,
    Password: String,
});
 
//9. Map Schema with the Model Object 
var userModel = mongoConnect.model('userModel', userInfoSchema);
//10. Define the Schema for person
var personSchema = mongoConnect.Schema({
    PersonId: String,
    PersonName: String,
    Email: String,
    Age: String
});
//11. Map the Person Schema 
var personModel = mongoConnect.model('Person', personSchema, 'Person');
 
 
//12. The Secret 
object.set('jwtSecret', impObject.jwtSecret);
 
//13. The Body Parser to parse incoming data from request
object.use(bodyParser.urlencoded({ extended: false }));
object.use(bodyParser.json());
 
 
//14/ logic for Creating user
apirouting.post('/createuser', function (request, response) {
    // UserName:request.body.UserName
    //request.body.Password
    console.log('The Request is being Processed');
    var user = new userModel({
        UserName: request.body.UserName,
        Password: request.body.Password
    });
 
    //Lets save the sample user
    user.save(function (error) {
        if (error) {
            console.log('Some Error Occured');
            throw error;
        }
        console.log('User Created...');
        response.json({ createduccessfully: true });
    });
});
 
 
 
 
//15. Get all users
apirouting.get('/users', function (req, res) {
    userModel.find({}, function (err, users) {
        res.json(users);
    });
});
 
//16. Lets authenticate user
apirouting.post('/authuser', function (request, response) {
    //16a. we need to check if the user exist
    userModel.findOne({
        UserName: request.body.UserName
    }, function (error, usr) {
        if (error) { console.log('Some error  occured '); throw error; }
        if (!usr) {
            response.json({
                authsuccess: false,
                description: 'User Authentication failed because user not found.'
            });
        } else if (usr) {
            //16b check if the received password matches with the data store
            if (usr.Password != request.body.Password) {
                response.json({
                    authsuccess: false,
                    description: 'User Authentication failed because provided password is wrong.'
                });
            } else {
                //16c. generate the token because we have the username and pasword 
                //matching
                var accessToken = jsonWebToken.sign(usr, object.get('jwtSecret'), {
                    //Set the expiration
                    expiresIn: 3600 //we are setting the expiration time of 1 hr. 
                });
                //send the response to the caller with the accesstoken and data
                console.log('Authentication is done successfully.....');
 
                //16d.
                response.json({
                    authsuccess: true,
                    description: 'Sending the Access Token',
                    accessToken: accessToken
                });
            }
        }
    });
 
});
//17.
apirouting.get('/persons', loadPersonData);
 
//Function to load PersonData
function loadPersonData(req, resp) {
    console.log('In Load Person');
 
 
    personModel.find({}, function (err, persons) {
        resp.json(persons);
    });
 
 
};
 
//18.
object.use(apirouting);
object.listen(communicationPort, function () {
    console.log('Listening on  port 5050');
});
//object.listen(communicationPort);
 