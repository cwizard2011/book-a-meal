import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import MenuController from './controllers/MenuController';
import menuMiddleware from './middleware/menuMiddleware';


const port = process.env.PORT || 3000;
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.post('/api/v1/menus', menuMiddleware, MenuController.createMenu);
app.get('/api/v1/menus', menuMiddleware, MenuController.getMenu);

app.listen(port);

export default app;
