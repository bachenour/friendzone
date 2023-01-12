import * as express from "express";
import 'dotenv/config';
import validateEnv from './utils/validateEnv';
validateEnv();

process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

const app = express();

//Stopping the server
const server = app.listen(3031, function () {
    console.log("Server is running on port 3031");
    server.close(function () {"Server is stopped"});
    console.log("Server is stopped");
});