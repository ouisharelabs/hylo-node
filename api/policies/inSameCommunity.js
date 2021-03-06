module.exports = function inSameCommunity(req, res, next) {
  if (Admin.isSignedIn(req)) return next();

  if (req.session.userId === req.param('userId')) return next();

  Membership.inSameCommunity([req.session.userId, req.param('userId')])
    .then(function(inSameCommunity) {
      inSameCommunity ? next() : res.forbidden();
    })
    .catch(function(err) {
      res.forbidden();
    })
};
