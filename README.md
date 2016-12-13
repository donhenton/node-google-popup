# NODE-GOOGLE-POPUP

This application illustrations a standard dialog for obtaining a code and 
access token/refresh token without using passport or requiring the application
authenticate.


##  Running locally

###Start Mongodb
brew install mongodb

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

