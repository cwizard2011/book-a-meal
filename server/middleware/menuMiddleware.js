import menus from '../data/menus';

const menuMiddleware = (req, res, next) => {
  req.menus = menus;
  next();
};

export default menuMiddleware;
