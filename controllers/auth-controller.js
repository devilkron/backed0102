const bcrypt = require("bcryptjs");
const db = require("../models/db");

module.exports.register = async (req, res, next) => {
  const { username, password, confirmPassword, email } = req.body;
  try {
    //validation
    if (!(username && password && confirmPassword)) {
      return next(new Error("Fulfill all inputs"));
    }
    if (confirmPassword !== password) {
      throw new Error("password not match");
    }
    const hased = await bcrypt.hash(password, 8);
    console.log(hased);

    const data = {
      username,
      password: hased,
      email
    };
    //                                db  / const db
    const rs = await db.user.create({ data: data });
    console.log(rs);

    res.json({message: "Register SUCCESSFUL!!!"});
  } catch (err) {
    next(err);
  }
};

module.exports.login = (req, res, next) => {
  res.send("LOGIN");
};
