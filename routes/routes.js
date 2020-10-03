const { request } = require('express');
const express = require('express');
const { GetResponse } = require('../utils/utils');
const app = express();

let GenerateRoutes = (request) => {
    let route = '/' + request.url.path.join('/');
    console.log(route);
    switch (request.method) {
        case 'GET':
            app.get(route, (req, res) => {
                res.json(GetResponse(request));
            });
            break;
        case 'POST':
            app.post(route, (req, res) => {
                res.json(GetResponse(request));
            });
            break;
        case 'PUT':
            app.put(route, (req, res) => {
                res.json(GetResponse(request));
            });
            break;
        case 'DELETE':
            app.delete(route, (req, res) => {
                res.json(GetResponse(request));
            });
            break;
    }
}

module.exports = {
    app,
    GenerateRoutes
}