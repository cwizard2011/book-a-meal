import OrderController from '../controllers/OrderController';
import orderMiddleware from '../middleware/orderMiddleware';

const orderRoutes = (versionURL, app) => {
  app.get(`${versionURL}/orders`, orderMiddleware, OrderController.getOrder);
  app.post(`${versionURL}/orders`, orderMiddleware, OrderController.createOrder);
  app.put(`${versionURL}/orders/:orderId`, orderMiddleware, OrderController.editOrder);
};

export default orderRoutes;
