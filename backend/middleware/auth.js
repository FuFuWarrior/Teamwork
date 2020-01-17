const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

/**
 *
 *
 * @class Auth
 */
class Auth {
  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   * @memberof Auth
   */
  static verifyUser(req, res, next) {
    const token = req.headers.authorization// if the token has a Bearer as the prefix than use .split(' ')[1];
    if (!token || token === undefined) {
      return res.status(403).json({
        status: 403,
        error: 'No token provided.'
      });
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decode) => {
      if (err) {
        return res.status(500).json({ status: 500, error: `Failed to authenticate token.${err}` });
      }
      req.user = decode.username;
      req.admin = decode.admin;
      req.id = decode.id;
      req.employee = decode.employee
      next();
    });
  }

  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   * @memberof Auth
   */
  static verifyResetToken(req, res, next) {
    const { token } = req.params;
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decode) => {
      if (err) {
        return res.status(500).json({ status: 500, error: 'Failed to authenticate token.' });
      }
      req.id = decode.id;
      req.token = token;
      next();
    });
  }
}

module.exports = Auth;


/*module.exports = (req,res) => {
    try {
        const token = req.headers.authorization.split(' ')
        const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET)
        const userId = decodeToken.id
        req.admin = decodeToken.admin
        if (req.body.user_id && req.body.userId !== userId) {
            throw 'Invalid User ID'
        } else {
          next();
        }
    } catch {
        res.status(401).json({status:401, message:'Invalid Request!'});
    }
}*/