import Users from '../../models/Users.model.js';
import JwtHelper from '../../helpers/JWT.helper.js';
import Sha256Helper from '../../helpers/SHA256.helper.js';

class AuthService {
  constructor(server) {
    this.server = server;
    this.Users = new Users(this.server).table;
    this.JwtHelper = new JwtHelper(this.server);
    this.Sha256Helper = new Sha256Helper();
  }

  async register(email, username, password) {
    // Check if email already exists
    const existingEmail = await this.Users.findOne({ email });
    if (existingEmail) return -1;

    // Check if username already exists
    const existingUsername = await this.Users.findOne({ username });
    if (existingUsername) return -2;

    // Hash password with SHA256
    const hashedPassword = this.Sha256Helper.getHash(password, null);

    // Create new user
    const newUser = await this.Users.create({
      email,
      username,
      password: hashedPassword
    });

    // Generate token for new registration
    return this.JwtHelper.generateToken({
      userId: newUser._id
    });
  }

  async login(emailOrUsername, password) {
    // Hash password for comparison
    const hashedPassword = this.Sha256Helper.getHash(password, null);

    // Find user by email or username
    const user = await this.Users.findOne({
      $or: [
        { email: emailOrUsername },
        { username: emailOrUsername }
      ],
      password: hashedPassword
    });

    if (!user) return -1;

    // Generate token
    return this.JwtHelper.generateToken({
      userId: user._id,
      email: user.email,
      username: user.username
    });
  }

  async tokenCheck(userId) {
    const user = await this.Users.findOne({
      _id: userId,
      deleted_at: null
    });

    if (!user) return -1;

    return {
      userId: user._id,
      email: user.email,
      username: user.username
    };
  }
}

export default AuthService;