
// const verifyMenu = (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const menuById = req.menus.filter(menu => (menu.id === id));
//     if (menuById) {
//       res.status(201).json({ menu });
//       next();
//     } else {
//       res.status(400).json({
//         error: 'Menu does not exist',
//       });
//     }
//   } catch (error) {
//     if (error.name === 'CastError' && error.kind === 'ObjectId') {
//       res.status(400).json({
//         error: 'menuId is ivalid',
//       });
//     } else {
//       res.sendStatus(500);
//     }
//   }
// };
// export default verifyMenu;
