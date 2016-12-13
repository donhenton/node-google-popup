# NODE-GOOGLE

 


### Enabling CORS

http://enable-cors.org/server_expressjs.html
http://jonathanmh.com/how-to-enable-cors-in-express-js-node-js/


### Sessions and Middleware

> https://stormpath.com/blog/everything-you-ever-wanted-to-know-about-node-dot-js-sessions/
> http://stackoverflow.com/questions/13133071/express-next-function-what-is-it-really-for

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
node server.js (at root directory) http://localhost:3000

