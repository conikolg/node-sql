# Angular with Node and Mysql - kickstart

  A demo app to demonstrate 3 tier application architecture with Angular (client side), Node.js (server side) and Mysql (database).
  
## Prerequisite Installation

  1. Install **Node** latest version [*Run node -v if version shown so node properly installed*]
  2. Install **Mysql** and create database and execute below sql query to create users table in your database
  
     ``` sql
      CREATE TABLE Users(
        ID int NOT NULL AUTO_INCREMENT,
        Name varchar(255),
        Age int,
        City varchar(255),
        PRIMARY KEY (ID)
      );
     ```

## Directory structure

- node-sql
  - public
    - config.js
    - core.js
    - index.html
    - query.js
  - app.js
  - package.json

## How to start

  1. Git clone node-sql repository
  2. Install all npm dependencies using below command

      ``` bash
      npm install
      ```

  3. Configure database settings in `node-sql/public/config.js`. Alternatively, the config can be populated by defining any of the following environment variables:

      - DB_USERNAME
      - DB_PASSWORD
      - DB_HOSTNAME
      - DB_DATABASE
      - DB_PORT

  4. Run node server using below command

     ``` bash
     node app.js
     ```

  5. Here you go server is up at *<http://localhost:8080/>*

## End to End data flow

  1. Once you open browser *index.html* file will be loaded as define in *app.js*
  
      ``` js
       app.get('*', function(req, res) {
         // load the single view file (angular will handle the page changes on the front-end)
         res.sendfile('./public/index.html'); 
       });
       ```

  2. HTML is binded to a angular *mainController*, written in *core.js* file
     > recommended controller and services should be in seperate files
  3. APIs are written in *app.js* from where it maps CRUD method of *query.js* file, which is responsible to communication with database

## Live demo on

  *<https://node-sql.herokuapp.com/>*

## Containerized Deployment

Run this command to build the container's image:

``` bash
docker build -t nn-medical-app .
```

Run this command to run the container:

``` bash
docker run \
  --name nn-medical-app \
  -itd --rm \
  -e DB_USERNAME=my-user \
  -e DB_PASSWORD=my-pass \
  -e DB_HOSTNAME=localhost \
  -e DB_DATABASE=patients \
  -e DB_PORT=3306 \
  -p 8080:8080 \
  nn-medical-app
```

Run this command to view the container's logs:

``` bash
docker logs -f nn-medical-app
```

Run these commands to stop and delete the container:

``` bash
docker stop nn-medical-app
docker rm nn-medical-app
```
