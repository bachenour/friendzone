import {UsersRoute} from "./routes/users.route";
import {PostsRoute} from "./routes/posts.route";

process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from './app';
import validateEnv from './utils/validateEnv';
validateEnv();

const app = new App([new UsersRoute(), new PostsRoute()]);
app.listen();