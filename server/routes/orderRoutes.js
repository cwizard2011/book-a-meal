import OrderController from '../controllers/OrderController';


const orderRoutes = (versionURL, app) => {
  app.get(`${versionURL}/orders`, OrderController.getOrders);
  app.post(`${versionURL}/orders`, OrderController.createOrders);
  app.put(`${versionURL}/orders/:orderId`, OrderController.editOrder);
};

export default orderRoutes;
