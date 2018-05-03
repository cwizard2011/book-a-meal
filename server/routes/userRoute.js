import UserControllers from '../controllers/UserController';
import Validation from '../helpers/Validation';

const userRoutes = (versionURL, app) => {
  app.post(`${versionURL}/auth/signup`, Validation.checkPassword, UserControllers.signUp);
  app.post(`${versionURL}/auth/login`, Validation.checkUser, UserControllers.signIn);
};

export default userRoutes;
