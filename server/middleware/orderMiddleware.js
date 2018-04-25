import orders from '../data/orders';

const orderMiddleware = (req, res, next) => {
  req.orders = orders;
  next();
};

export default orderMiddleware;
