const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { 
    return next(); 
  }
  res.redirect('/login')
};

const checkRole = (roles) => { 
  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) { 
      return res.status(403).json({ error: 'Forbidden - Insufficient privileges' });
    }

    next(); 
  };
};
export {
  ensureAuthenticated,
  checkRole
}
