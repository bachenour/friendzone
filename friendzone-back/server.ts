import {ActivityRoute} from "./routes/activity.route";
import {CategoryRoute} from "./routes/category.route";
import {PostsRoute} from "./routes/posts.route";
import {UsersRoute} from "./routes/users.route";
import {LikesRoute} from "./routes/like.route";

import 'dotenv/config';
import App from './app';
import validateEnv from './utils/validateEnv';
import {ScriptRoute} from "./routes/script.route";
import {OpinionRoute} from "./routes/opinion.route";

process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

validateEnv();

const app = new App([new UsersRoute(), new PostsRoute(), new CategoryRoute(), new ActivityRoute(), new LikesRoute(), new ScriptRoute(), new OpinionRoute()]);
app.listen();