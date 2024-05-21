const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { full_name, username, email, password } = req.body;
  if (!email || !password || !full_name || !username) {
    return res
      .status(400)
      .json({ success: false, error: "Please fill all fields" });
  }
  try {
    const user = await req.db.collection("Users").findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await req.db
      .collection("Users")
      .insertOne({ full_name, username, email, password: hashedPassword });
    const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET);
    const user_email = user.email;
    res.status(200).json({ success: true, token: token, email: user_email });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, error: "Email or password is missing" });
  }
  try {
    const user = await req.db.collection("Users").findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "User does not exist" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Password does not match" });
    }
    const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET);
    const user_email = user.email;
    res.status(200).json({ success: true, token: token, email: user_email });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getProfileData = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userEmail = decoded.email;

    const user = await req.db.collection("Users").findOne({ email: userEmail });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "User does not exist" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  register,
  login,
  getProfileData,
};
