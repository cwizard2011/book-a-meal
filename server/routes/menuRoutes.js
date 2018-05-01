import MenuController from '../controllers/MenuController';


const menuRoutes = (versionURL, app) => {
  app.get(`${versionURL}/menus`, MenuController.getMenus);
  app.post(`${versionURL}/menus`, MenuController.createMenus);
};

export default menuRoutes;
