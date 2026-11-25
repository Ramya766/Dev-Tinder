#Auth Router 
-POST /signup
-POST/login
-POST /logout

#ProfileViewRouter
-GET /profile/view
-PATCH /profile/edit 
-PATCh /profile/password  //forgot pasword API but pending not yet implemented

#ConnectionRequestRouter 
-POST /request/send/:status/:userId //status :interested,ignored
-POST /request/eview/:status/:requestId  //accepted or rejected

#UserRouter 
-GET /user/requests/recieved
//to know more about ref & populate go throught this documentation https://mongoosejs.com/docs/populate.html 
-GET /user/connections
-GET /user/feed  //gets u the profiles of other users on platform 

 