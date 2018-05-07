const isAdmin = (req, res, next) => {
  if (req.decode.role !== 'admin') {
    return res.status(403).json({ message: 'You are not authorized to access this resources' });
  }
  return next();
};
export default isAdmin;
