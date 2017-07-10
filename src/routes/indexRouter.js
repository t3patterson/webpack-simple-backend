const Router = require('express').Router;
const axios = require('axios');
const {getIndex, getAbout, makeProxyRequest} = require('../controllers/indexController');

const indexRouter = Router();

indexRouter.get('/', getIndex )
indexRouter.get('/about', getAbout )
indexRouter.get('/proxy', makeProxyRequest )

module.exports = indexRouter
