import {UsersRoute} from "./routes/users.route";
import {PostsRoute} from "./routes/posts.route";
import {CategoryRoute} from "./routes/category.route";

import 'dotenv/config';
import App from './app';
import validateEnv from './utils/validateEnv';

process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

validateEnv();

const app = new App([new UsersRoute(), new PostsRoute(), new CategoryRoute()]);
app.listen();