const admin = true;
function isAdmin (req, res, next) {
  if (admin) {
    next();
  } else {
    res.send({error: -1, description: `ruta ${req.url} no autorizada`});
  }
}

module.exports = isAdmin;
