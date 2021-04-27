const express=require("express");
const user=express();
const { auth } = require('express-openid-connect');
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'TCDVY7D9EfTcduvBoFYsVL1oUGvy5Wgr',
  issuerBaseURL: 'https://dev-9qh84mpr.eu.auth0.com'
};
user.use(auth(config));

module.exports = function getAccesToken(req, res, next) {
  var AuthenticationClient=require('auth0').AuthenticationClient;
  var auth0=new AuthenticationClient({
        domain: config.issuerBaseURL,
        clientId: config.clientID,
        clientSecret: config.secret
  });
  auth0.clientCredentialsGrant(
       {
       audience: `https://${config.issuerBaseURL}/api/v2/`,
       scope: 'read:users'
       },
       function(err, response) {
       if (err) {
           res.status(500);
       }
       else{
           req.auth0AccessToken = response.access_token;
           return next();
       }
   });
}
