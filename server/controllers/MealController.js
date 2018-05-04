import database from '../models';

const Meals = database.Meal;
/**
 * @class MealController
 */
class MealController {
  /**
   * Create a new meal
   *
   * @static
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} res
   *
   */
  static createMeals(req, res) {
    const {
      mealName,
      description,
      userId,
      mealAvatar,
      price,
    } = req.body;
    Meals.create({
      mealName,
      description,
      userId,
      mealAvatar,
      price,
    }).then((meals) => {
      res.status(201).json({
        message: 'Meal created',
        meals: {
          id: meals.id,
          mealName: meals.mealName,
          userId: meals.userId,
          mealAvatar: meals.mealAvatar,
          price: meals.price,
          description: meals.description,
        }
      });
    });
  }

  /**
   * get meal
   *
   * @static
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} res
   *
   */
  static getMeals(req, res) {
    Meals.findAll().then((meals) => {
      res.status(200).json({
        message: 'Meal found', meals
      });
    });
  }
  /**
   * get meal by id
   *
   * @static
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} res
   *
   */
  static getMealById(req, res) {
    const mealId = req.params.id;
    Meals.findById(mealId)
      .then((meals) => {
        res.status(200).json({
          message: 'Meal found', meals
        });
      });
  }
  /**
   *Edit meals by Id
   *
   * @static
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} res
  */
  static editMeal(req, res) {
    const { id } = req.params;
    const {
      mealName,
      description,
      mealAvatar,
      price,
    } = req.body;
    Meals.update(
      {
        mealName,
        description,
        mealAvatar,
        price
      },
      { returning: true, where: { id } }
    )
      .then(([rows, [updatedMeal]]) => {
        res.status(200).json({ message: 'update succesful', rows, updatedMeal });
      });
  }
  /**
   *delete meals by Id
   *
   * @static
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} res
  */
  static removeMeal(req, res) {
    const { id } = req.params;
    Meals.destroy({
      where: { id }
    }).then((deletedMeal) => {
      res.status(200).json({ message: 'meal deleted successfully', deletedMeal });
    });
  }
}

export default MealController;
