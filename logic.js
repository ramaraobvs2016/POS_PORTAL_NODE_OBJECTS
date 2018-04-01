function securityViewModel() {
    var self = this;
    //1.    
    self.responseData = ko.observable();
 
    self.userName = ko.observable();
 
    self.userRegistrationEmail = ko.observable();
    self.userRegistrationPassword = ko.observable();
    self.userRegistrationConfirmPassword = ko.observable();
 
    self.userLoginEmail = ko.observable();
    self.userLoginPassword = ko.observable();
 
    self.accessToken = ko.observable();
    self.refreshToken = ko.observable();
    self.Persons = ko.observableArray([]);
    //2.
    self.registerUser = function () {
 
        self.responseData('');
 
        var userRegistrationInfo = {
            UserName: self.userRegistrationEmail(),
            Password: self.userRegistrationPassword()
        };
 
        if (self.userRegistrationConfirmPassword() === self.userRegistrationConfirmPassword()) {
            alert('Passsword Match');
            $.ajax({
                type: 'POST',
                url: 'http://localhost:5050/createuser',
                data: userRegistrationInfo,
                contenttype: 'application/json; charset=utf-8',
                datatype: "json"
            }).done(function (data) {
                self.responseData("User is Successfully " + data);
                self.userRegistrationEmail("");
                self.userRegistrationPassword("");
                self.userRegistrationConfirmPassword("");
            }).error(function (err) {
                self.responseData("Error " + err.status);
            });
 
        } else {
            alert('Please check the password');
        }
 
 
    };
    //3.
    self.clear = function () {
        self.userRegistrationEmail("");
        self.userRegistrationPassword("");
        self.userRegistrationConfirmPassword("");
    };
    //4.
    self.login = function () {
 
        //This is the information to pass for token based authentication
        var userLogin = {
            UserName: self.userLoginEmail(),
            Password: self.userLoginPassword()
        };
        var data = 'UserName=' + userLogin.UserName + '&Password=' + userLogin.Password;
        alert(data);
        $.ajax({
            type: 'POST',
            url: 'http://localhost:5050/authuser',
            contenttype: 'application/x-www-form-urlencoded',
            data: data
        }).done(function (resp) {
            self.userName(resp.userName);
            //Store the token information in the SessionStorage
            //So that it can be accessed for other views
            sessionStorage.setItem('UserName', resp.UserName);
            sessionStorage.setItem('accessToken', resp.accessToken);
            //  loadData();
        }).error(function (err) {
            self.responseData("Error " + err.status);
        });
    };
    //5.
    self.getData = function () {
        var accessToken = sessionStorage.getItem('accessToken');
        console.log(accessToken);
        var authHeaders = {};
        if (accessToken) {
            authHeaders.Authorization = 'Bearer ' + accessToken;
        }
        $.ajax({
            
            var formData = new FormData();
formData.append('file', $('#file')[0].files[0]);

$.ajax({
       url : 'http://localhost:5050/upload.html',
       type : 'GET',
       headers: authHeaders
       data : formData,
       processData: false,  // tell jQuery not to process the data
       contentType: false,  // tell jQuery not to set contentType
     }).done(function (data) {
           console.log(data);
           alert(data);
               self.Persons(resp);
          });
    };
  
};



var secure = new securityViewModel();
ko.applyBindings(secure);
