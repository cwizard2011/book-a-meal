import MenuController from '../controllers/MenuController';
import Validation from '../helpers/Validation';
import Authentication from '../helpers/Authentication';
import isAdmin from '../helpers/isAdmin';


const menuRoutes = (versionURL, app) => {
  app.get(`${versionURL}/menus`, Authentication.verifyToken, MenuController.getMenus);
  app.post(`${versionURL}/menus`, Authentication.verifyToken, isAdmin, Validation.checkMenuDetails, MenuController.createMenus);
};

export default menuRoutes;
