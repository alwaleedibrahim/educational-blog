const express = require("express");
const userController = require("../controllers/user");
const auth = require("./../middleware/auth");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", auth, userController.logout);
router.get("/user/:id", auth, userController.showUser);
router.get("/users", userController.allUsers);

module.exports = router;
