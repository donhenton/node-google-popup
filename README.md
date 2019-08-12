# NODE-GOOGLE-POPUP

This application illustrates standard dialogs for obtaining a code and 
access token/refresh token without using passport or requiring  application
authentication.

## Demonstrations available
* Authenication to Google at the server level in routes
* Authenication to Google at the client level using jQuery

## Configuring google applications
A google application must be configured in the standard way. Including setting javascript origins and callback urls. See [this tutorial](https://scotch.io/tutorials/easy-node-authentication-google) for more

##  Running locally

### Start Mongodb
```brew install mongodb```

to run

1. create a mongod.conf file

```
#mongod.conf

#logs
logpath=/Users/dhenton/mongo_data/logs/mongolog.log
logappend=true


#path to database
dbpath=/Users/dhenton/mongo_data/db
```

run mongod -f /Users/dhenton/mongo_data/mongod.conf
or mongod --dbpath=/Users/dhenton/mongo_data/db

### Start node server
node server.js (at root directory) http://localhost:3500

