const { hashPassword } = require("../utils/hashPassword");

const signUp = async (req, res) => {
  try {
    const { name, email, password, role = "user" } = req.body;
    const hashedPassword = await hashPassword(password);

    // const user = await User.create({
    //   name,
    //   email,
    //   password: hashedPassword,
    //   role,
    // });
    console.log(name, email, password, role);

    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(500).send("Error registering user");
  }
};

const login = async (req, res) => {
  try {
    // Logic for user login
    res.status(200).send("User logged in successfully");
  } catch (error) {
    res.status(500).send("Error logging in user");
  }
};

module.exports = {
  signUp,
  login,
};
