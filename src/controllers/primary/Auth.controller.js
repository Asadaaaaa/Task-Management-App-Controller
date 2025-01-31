import ResponsePreset from '../../helpers/ResponsePreset.helper.js';
import AuthValidator from '../../validators/primary/Auth.validator.js';
import AuthService from '../../services/primary/Auth.service.js';

// Library
import Ajv from 'ajv';

class AuthController {
  constructor(server) {
    this.server = server;

    this.ResponsePreset = new ResponsePreset();
    this.Ajv = new Ajv();
    this.DataScheme = new AuthValidator();
    this.AuthService = new AuthService(this.server);
  }

  async register(req, res) {
    const schemeValidate = this.Ajv.compile(this.DataScheme.register);
    
    if(!schemeValidate(req.body)) return res.status(400).json(this.ResponsePreset.resErr(
      400,
      schemeValidate.errors[0].message,
      'validator',
      schemeValidate.errors[0]
    ));
    
    const { email, username, password } = req.body;
    const resRegister = await this.AuthService.register(email, username, password);

    if(resRegister === -1) return res.status(403).json(this.ResponsePreset.resErr(
      403,
      'Forbidden, Email Already Exists',
      'service',
      { code: -1 }
    ));

    if(resRegister === -2) return res.status(403).json(this.ResponsePreset.resErr(
      403,
      'Forbidden, Username Already Exists',
      'service',
      { code: -2 }
    ));
    
    return res.status(200).json(this.ResponsePreset.resOK('OK', { token: resRegister }));
  }

  async login(req, res) {
    const schemeValidate = this.Ajv.compile(this.DataScheme.login);
    if(!schemeValidate(req.body)) return res.status(400).json(this.ResponsePreset.resErr(
      400,
      schemeValidate.errors[0].message,
      'validator',
      schemeValidate.errors[0]
    ));
    
    const { emailOrUsername, password } = req.body;
    const resLogin = await this.AuthService.login(emailOrUsername, password);

    if(resLogin === -1) return res.status(404).json(this.ResponsePreset.resErr(
      404,
      'Not Found, Identity or Password is wrong',
      'service',
      { code: -1 }
    ));

    return res.status(200).json(this.ResponsePreset.resOK('OK', { token: resLogin }));
  }

  async tokenCheck(req, res) {
    const getTokenCheckSrv = await this.AuthService.tokenCheck(req.middlewares.authorization.userId);

    if(getTokenCheckSrv === -1) return res.status(404).json(this.ResponsePreset.resErr(
      404,
      'Not Found, User Id Not Found',
      'service',
      { code: -1 }
    ));
    
    return res.status(200).json(this.ResponsePreset.resOK('OK', getTokenCheckSrv));
  }
}

export default AuthController;