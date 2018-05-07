import OrderController from '../controllers/OrderController';
import Validation from '../helpers/Validation';
import Authentication from '../helpers/Authentication';
import isAdmin from '../helpers/isAdmin';


const orderRoutes = (versionURL, app) => {
  app.get(`${versionURL}/orders`, Authentication.verifyToken, isAdmin, OrderController.getOrders);
  app.post(`${versionURL}/orders`, Authentication.verifyToken, Validation.checkOrderDetails, OrderController.createOrders);
  app.put(`${versionURL}/orders/:id`, Authentication.verifyToken, Validation.checkOrderDetails, OrderController.editOrder);
};

export default orderRoutes;
