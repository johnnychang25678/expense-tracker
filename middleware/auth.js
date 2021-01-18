module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash('warningMessage', '請先登入才能使用。')
  return res.redirect('/users/login')
}