const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findById } = require("../models/user");

class userController {
  static register = async (req, res) => {
    try {
      const { first_name, last_name, email, password } = req.body;
      if (!(email && password && first_name && last_name)) {
        res.status(400).send("All fields are required");
      }
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(409).send("User Already Exist. Please Login");
      }
      const encryptedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        email: email.toLowerCase(),
        first_name,
        last_name,
        password: encryptedPassword,
      });

      const token = jwt.sign(
        {
          user_id: user._id,
          email,
        },
        process.env.JWT_SECRET
      );

      user.token = token;

      res.status(201).json(user);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  static login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).send("Email isn't registered");
      } else {
        const passwordIsCorrect = await bcrypt.compare(password, user.password);
        if (passwordIsCorrect) {
          const token = jwt.sign(
            {
              user_id: user._id,
              email,
            },
            process.env.JWT_SECRET
          );

          user.token = token;
          await user.save();

          res.status(201).json(user);
        } else {
          res.status(400).send("Incorrect password");
        }
      }
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  static logout = async (req, res) => {
    try {
      const user = await User.findById(req.user.user_id);
      if (!user) {
        res.status(400).send("User is not found");
      } else {
        user.token = undefined;
        await user.save();
        res.status(204).send("Logged out");
      }
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  static showUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(404).send("Cannot find user");
      } else {
        res.send(user);
      }
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  static allUsers = async (req, res) => {
    try {
      const users = await User.find();
      if (!users) {
        res.status(404).send("Cannot find user");
      } else {
        res.send(users);
      }
    } catch (e) {
      res.status(500).send(e.message);
    }
  };
}

module.exports = userController;
