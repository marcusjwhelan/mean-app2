# mean-app1
-------------------------------------------------------

<a href="https://www.youtube.com/watch?v=OhPFgqHz68o
" target="_blank"><img src="https://img.youtube.com/vi/OhPFgqHz68o/0.jpg" 
alt="Tutorial" width="660" height="360" border="10" /></a>

#### Description 
---------------------------------------------------------

    This project is actually from a youtube video going
    over the uses of angular and yeoman to produce a 
    production templated Angular app for storing your
    favorite youtube videos. 
    
    With  full CRUD capabilities using a RESTful api for 
    the backend. This is only a practice app to get 
    acquainted with the MEAN stack and bootstrap's youtube
    embed capabilities.

    Below I will go through the steps of setting up the
    entire app on cloud9(a cloud IDE for development). 
    This IDE can also be used to SSH into your own servers
    if you decide to pay for the IDE service. The free 
    version lets you spin up many cloud servers in seconds.
    
---------------------------------------------------------
##### Cloud 9 Setup
---------------------------------------------------------

    To make an account an see options or login visit
    
[Cloud9](https://c9.io/)
    
    Once you have created an account go to your profile
    page and select (+)Create a new workspace. On this 
    workspace creation page uncer workspace name enter 
    the name for your main file. 
    Hosted workspace = for free users
    public = for free users
    you can clone your github repository if you would like
    but for this I will show how to connect to git after
    you have made a workspace.
    Select Blank under Choose a Template 
    press create workspace. 
    
    This will create a workspace for you using ubuntu 14.04.
    If you would like you can choose a nodejs template but 
    you will have to update it.
    
```bash
$ sudo apt-get install nodejs
$ sudo apt-get install npm
$ sudo npm install -g grunt-cli
$ sudo npm install -g bower
```
    
    Also need to install mongodb. Fallow the instructions
    at mongodb to install for your system.
    
[mongodb](https://www.mongodb.com/download-center#community)
    
    I will show how to install mongodb for c9 during the 
    server setup.
    
---------------------------------------------------------
##### Setting up your remote connection to your Github
---------------------------------------------------------
    
    You can fallow the steps at githubt but to make it 
    easier I have the steps here. 
    
    In your main workspace you should have no files at 
    this time unless you toggle hidden files. You will 
    need to setup a github repository matching the name
    of this workpsace folder. 
    
```bash
$ sudo apt-get install git
$ git init
$ git remote add origin https://github.com/<username>/<repo-name>.git
$ git add . 
$ git commit -m "commit comment"
$ git push origin -u origin master
```
    
---------------------------------------------------------
##### Setting up the Server API
---------------------------------------------------------

    In your main empy workpspace folder.
    
```bash
$ mkdir server
$ cd server
$ npm init
```
    
    After the init fallow the simple steps if you dont know
    anything about the steps just enter all the way through.
    This creates a package.json file.
    
    Now install needed node modules for project. --save adds
    these to the package.json file.
    
```bash
$ sudo npm install --save express
$ sudo npm install --save mongoose
$ sudo npm install --save node-restful
$ sudo npm install --save method-override
$ sudo npm install --save body-parser
$ sudo npm install --save lodash
```
    /server/setup.js
    Now we need to add an node startup file to launch 
    the server. Right click the server file and add
    file (setup.js). You can see the contents of this
    file and their are comments explaining what is 
    happening.
    
    /server/models/Movie.js
    Create this file. Here you will see the schema for the 
    movies that will be added to the api. Using mongoose.
    
    /server/models/index.js
    Create this file. Here we will export all the models we
    will create. This is used so if we ever need to add a 
    model to the api we can create the model schema and 
    then add it here to be packeged later.
    - dependency injection in setup.js under
        mongoose.connection.once('open',function(){
        
    /server/controllers/MovieController.js
    Create this file. Information about the api controller in 
    this file.
    
    /server/routes.js
    Create this file. Here we assign moviecontroller to 
    the movie path in our application. Routes file is
    loaded in setup.js under the dependency injection. 
    
###### Adding mongodb to Cloud 9
=========================================================
    In the main workspace folder or in the server folder.
    
```bash
$ mkdir data 
$ echo 'mongod --bind_ip=$IP --dbpath=data 
    --nojournal --rest "$@"' > mongod
$ chmod a+x mongod
```
    
    Now in the file you added this too you can run 
    
```bash
$ ./mongod 
```
     to run mongodb. This is for Cloud9 only. not for a 
     production server. Anyway if you turn off your project
     without turning off mongod you will need to run 
     ./mongod --repair before you can use mongodb again. 
     
```bash
$ mongo
```
     
     To use the mongo shell and create databases and 
     tables. You can see these with 
     
```bash
> mongo
> show databases
// shows databses 
> use <dbname>
> show tables
// shows table <name>s
> db.<name>.find({})
// displays everything in that database.
```
 
=========================================================
    
###### Running the server
---------------------------------------------------------
    workspace/
```bash
$ ./mongod
```
    /server
```bash
$ node setup
```
    There will be nothing at the site because this is only 
    the api. Although you can test the api by using postman.
    url/movie 
    url/movie/_id
    
    At postman use x-www-form-urlencoded 
    key values are set in the schema made above. 
    key=title       value=url
    
---------------------------------------------------------
##### Setting up fornt end with Yeoman
---------------------------------------------------------
    
    workspace/
    Move to the main workspace folder. Don't for get to 
    update npm to more recent version before these steps.
    
```bash
$ mkdir client
$ cd client
$ sudo npm install -g yo
ERROR
$ yo doctor 
$ echo "export NODE_PATH=$NODE_PATH:
    /home/ubuntu/.nvm/versions/node/v4.4.5/lib/node_modules" 
    >> ~/.bashrc && source ~/.bashrc
$ sudo npm install -g generator-karma generator-angular
$ yo angular
```
    answers for this project 
    
    yes all the way through to selecting angular includes
    select only. use spacebar to select/unselect
    
    angular-resource.js
    angular-route.js
    
    /client/Gruntfile.js line 71
    
    port: 8080,
    hostname: '0.0.0.0',
    
###### To run the entire project
---------------------------------------------------------
    /
```bash
$ ./mongod
```
---------------------------------------------------------
    /server
```bash
$ node setup  
```
This will be running on port 8081 since we set it to that
in setup.js
---------------------------------------------------------
    /client
    Set the localhost to the api if you are running the
    api on the same server. 
    
```bash
$ grunt serve 
```
No need to proxy since we set port to 8081 on setup.
However when I did the same thing with an ember app 
I did need to proxy my ember front end and node server.
---------------------------------------------------------
##### Building the front end to talk to the api
---------------------------------------------------------

```bash
$ yo angular:route movies
```
    
    This creates a controller, route, and view of movies.
    The route is created and viewable in 
    /client/app/scripts/app.js
    The controller is in 
    /client/app/scripts/controllers/movies.js
    and the view is in 
    /client/app/views/movies.html
    
    Obviously many of the yeoman starter page is removed
    so take a look at my files and see what was taken away
    and what has been added. If you see a matching view
    and controller then I used yo angular:route <name>.
    
    Also that command also creates a test file in 
    /client/test/spec/controllers/<name>.js
    
    -- moving ahead
    
    /client
```bash
$ bower install --save restangular
```
    
    This will save restangular right into the index.html 
    file. To add this file you need to add to app.js in
    /client/app/app.js 
    
    In the app.js file you need to create a base url 
    
```javascript
RestangularProvider.setBaseUrl('<yourURL>:8081');
```
    
    I have here the line that you can see on line 19 of app.js
    but for me it points to my API nodejs server. So when 
    the front end does any RESTful commands it will send to this
    base url. If for example you are sending to your api you 
    would place your api url there and change the port to the port
    you set in setup.js. You could call this file server.js or 
    index.js or any file name you would like an drun by using
    $ node <yourFileName>
    
## Image of video view page    
    
![screenshot](http://i.imgur.com/kzC4uhJ.png)
    

### Production build of the app. 
---------------------------------------------------------
    So it is not in the video but I learned this from making
    another app. in the /server file 
```bash
mkdir public
cd ..
cd client
grunt build 
grunt
```
    If you get en warning with grunt build like I did it
    might not be an app breaking warning mine was not so I
    used
```bash
grunt --force
```
    Now in /client/dist you will see the production build of 
    your app. I am not sure how to build into an external file
    with angular but I can with Ember. So copy all the contents
    of /client/dist 
    
    Now go to /server/public and paste all the dist files there. 
    In your setup.js file add the line 
```javascript
app.use(express.static(__dirname + '/public'));
```
    This will direct your server to use there files and now you 
    no longer need to run grunt serve on the front end to see 
    you app. All that needs to be done to view the app is to use
```bash
node setup
```
    In the /server directory. You will still have to use the 
    :8081 since that is what I have it set to in my github but
    if however you would like to just use the normal url 
```javascript
var port = process.env.PORT;
```
    Should work just fine. And their you have it. I will update 
    this Readme later to show how to deploy to a cloud server.
    6.26.16
    
##### Extras
---------------------------------------------------------

    Currently with this build 6.22.2016 you will get an 
    error on the video view page where the video shows 
    up. This is because google is sending the error so
    don't worry they are actually supposed to fix the 
    issue soon. "apparently"
    
    