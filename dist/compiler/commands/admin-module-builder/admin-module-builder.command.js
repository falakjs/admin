const { fs } = require('@flk/fs');
const express = require('express');
const app = express();
const open = require('open');
var multer = require('multer');
var upload = multer();
var execute = require('child-process-promise').exec;

commander
    .command('amb, admin-module-builder', 'Create new admin module.')
    .then(openAdminBuilder);

const port = 8881;

const scriptUrl = 'http://localhost:' + port;

const path = path => __dirname + '/files' + path;

function openAdminBuilder(command) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    // // parse application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }));

    // // parse application/json
    app.use(upload.array());
    app.use(express.urlencoded({ extended: true }));

    let flkJsonFile = ROOT + '/flk.json';

    if (!fs.exists(flkJsonFile)) {
        fs.putJson(flkJsonFile, {});
    }

    app.get('/', (request, response) => {
        return response.sendFile(path('/index.html'));
    }).get('/settings', (request, response) => {
        return response.send(global.config)
    }).get('/*', (request, response) => {
        return response.sendFile(path(request.path));
    }).post('/create-module', (request, response) => {
        let flkJson = fs.getJson(flkJsonFile);

        if (!flkJson.commands) {
            flkJson.commands = {};
        }

        if (!flkJson.commands['new:admin-module']) {
            flkJson.commands['new:admin-module'] = [];
        }

        let route = '/' + request.body.route.ltrim('/');

        let moduleName = request.body.module;

        delete request.body.module;
        delete request.body.route;

        flkJson.commands['new:admin-module'].push({
            arguments: {
                module: moduleName,
            },
            options: {
                app: request.body.app || 'admin',
                route,
                data: request.body,
            },
        });

        fs.putJson(flkJsonFile, flkJson);

        execute(`flk run`, {
            cwd: ROOT,
        });

        return response.send({
            success: true,
        });
    });

    app.listen(port, (err) => {
        echo.sameLine(cli.green(`Preparing Admin Module Builder...`));
        echo();

        let openOptions = {};

        if (global.config.browser != 'default') {
            openOptions.app = config.browser;
        }

        open(scriptUrl, openOptions);
    });
}