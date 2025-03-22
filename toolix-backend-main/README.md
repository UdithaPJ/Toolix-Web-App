## TOOLIX Backend

## Download project
First clone the project and open it from vs code or any editor.

##  Package install
Get terminal and put “npm install” command. ( Make sure node is install in your computer othervise you need to install nodejs using nvm)

```bash
$ npm install
```

##  Add env
Make a copy from “.env.example” and paste it on same level and rename it as ".env"  (if your are using mongodb in local, you need to download and install it) (you can use MongoDB Atlas also)

##  Run the project
Now you can run the project using “npm start”

```bash
$ npm start
```

##  Import sample data to Database
To import sample data to database, Run “npm run import”

```bash
$ npm run import
```

##  Remove sample data from Database
If you want to clean the database, Run “npm run remove”

```bash
$ npm run remove
```