import MenuController from '../controllers/MenuController';
import menuMiddleware from '../middleware/menuMiddleware';

const menuRoutes = (versionURL, app) => {
  app.get(`${versionURL}/menus`, menuMiddleware, MenuController.getMenu);
  app.post(`${versionURL}/menus`, menuMiddleware, MenuController.createMenu);
};

export default menuRoutes;
