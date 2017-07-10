//IMPORTS
//import webpack + webpack middleware;
const chalk = require('chalk')
const PROJECT_NAME = require('./config/projectName.js')

if(typeof PROJECT_NAME !== 'string' ){
	require('./src/cli/setProjectName.js')
	throw new Error(`\n${chalk.bgRed.bold('There must be a project name exported from :')} ${chalk.grey.bold('./src/config/projectName.js')} \n ${chalk.bgWhite.black(' you must execute: ')} ${chalk.cyan.bold('npm run set-project-name')}` )
}

const	bodyParser = require('body-parser')
const express = require('express') //import express web server
const renderFile = require('ejs').renderFile //import view templating engine
const connectToDB = require('./src/db/db-connect.js') //connect to db

const indexRouter = require('./src/routes/indexRouter.js')
const apiRouter = require('./src/routes/apiRouter.js')


// =========
// RUN APP
// =========
const app = express()


//configure bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())




// set port if exists in environment for heroku or live site, else set to 3000 for dev
const PORT = process.env.PORT || 3000
app.set('port', PORT)


//CONFIGURING TEMPLATING ENGINE FOR .HTML
//-----------------------
app.set('views', './src/views');
app.engine('ejs', renderFile)
app.set('view engine', 'ejs');

// CONFIGURING STATIC FILES  (js, css, images)
// ------------------------------
// js, css, and imafiles from dist/assets/
app.use( express.static( `${__dirname}/dist`) );


// ------------------------------
// Wire up the router
// ------------------------------
app.use('/', indexRouter)
app.use('/api', apiRouter)


//---------------------
//EXECUTION SCRIPTS
//---------------------
//Connect to DB
connectToDB(PROJECT_NAME)

//Tell Server to listen @ port-location
app.listen(PORT, function() {
	console.log(chalk.bold.bgGreen(` App listening on http://localhost:${PORT} `))
})
