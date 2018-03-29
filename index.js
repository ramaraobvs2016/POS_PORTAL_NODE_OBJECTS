<html>
    <head>
        <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.min.css">
    </head>
    <body>
      <table class="table table-bordered table-striped">
           <tr>
               <td>
                   <table class="table table-bordered table-striped">
                       <tr>
                           <td>User Name:</td>
                           <td>
                               <input type="text" id="unameregister" class="form-control"
                                data-bind="value:userRegistrationEmail">
                           </td>
                       </tr>
                       <tr>
                            <td>Password:</td>
                           <td>
                               <input type="password" id="pwdregister" class="form-control"
                                data-bind="value:userRegistrationPassword">
                           </td>
                       </tr>
                       <tr>
                            <td>Confirm Password:</td>
                           <td>
                               <input type="password" id="confirmpwdregister" class="form-control"
                               data-bind="value:userRegistrationConfirmPassword" >
                           </td>
                       </tr>
                       <tr>
                             <td>
                <input type="button" id="btnregister" value="Register" class="btn btn-success"
                 data-bind="click:registerUser"/>
              </td>
              <td>
                   <input type="button" id="btncancelregister" value="Cancel"
                   class="btn btn-default" data-bind="click:clear"/>
              </td>
                       </tr>
                   </table>
               </td>
               <td>
               <table class="table table-bordered table-striped">
                 <tr>
              <td>
                  User Name:
              </td>
              <td>
                  <input type="text" id="txtuname" class="form-control"
                   data-bind="value:userLoginEmail"/>
              </td>
          </tr>
           <tr>
              <td>
    Password:
              </td>
              <td>
                  <input type="password" id="txtpwd" class="form-control"
                   data-bind="value:userLoginPassword"/>
              </td>
          </tr>
           <tr>
              <td>
                <input type="button" id="btnlogin" value="Login" class="btn btn-success"
                 data-bind="click:login"/>
              </td>
              <td>
                   <input type="button" id="btncancel" value="Cancel" class="btn btn-default"/>
              </td>
          </tr>                    
               </table>
               </td>
              
           </tr>
          <tr>
              <td>
                  <input type="button" value="Load Data"  data-bind="click:getData"  class="btn btn-success">
              </td>
          </tr>
               
      </table>
      <hr/>
      <br/>
      <div> </div>
      <hr/>
      <table class="table table-bordered table-striped">
          <thead>
              <tr>
                  <th>Person Id</th>
                  <th>Person Name</th>
                  <th>Email</th>
                  <th>Age</th>
              </tr>
          </thead>
          <tbody data-bind="foreach:Persons">
              <tr>
                  <td>
                      <span data-bind="text:PersonId"></span>
                  </td>
                   <td>
                      <span data-bind="text:PersonName"></span>
                  </td>
                   <td>
                      <span data-bind="text:Email"></span>
                  </td>
                   <td>
                      <span data-bind="text:Age"></span>
                  </td>
              </tr>
          </tbody>
      </table>
    </body>
    <a href="/node_modules/jquery/dist/jquery.min.js">/node_modules/jquery/dist/jquery.min.js</a>
    <a href="/node_modules/knockout/build/output/knockout-latest.js">/node_modules/knockout/build/output/knockout-latest.js</a>
    <a href="http://logic.js" rel="nofollow" target="_blank">http://logic.js</a>
     
</html>