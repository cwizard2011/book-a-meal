import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import menuRoutes from './routes/menuRoutes';
import mealRoutes from './routes/mealRoutes';
import orderRoutes from './routes/orderRoutes';
import localPort from './port/port'


const port = process.env.PORT || localPort;
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

menuRoutes('/api/v1', app);
mealRoutes('/api/v1', app);
orderRoutes('/api/v1', app);

app.listen(port);

export default app;

