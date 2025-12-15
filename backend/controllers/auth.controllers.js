import generateToken from "../config/token.js";
import User from "../models/user.model.js";

export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password, userName } = req.body;
    let existUser = await User.findOne({ email });

    if (!firstName || !lastName || !email || !password || !userName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userName,
    });
    let token;
    try {
      token = generateToken(user._id);
    } catch (error) {
      console.log(error);
    }
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENVIRONMENT == "production",
      samesite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json(
      { message: "User created successfully" },
      {
        user: {
          firstName,
          lastName,
          email,
          userName,
        },
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let existUser = await User.findOne({ email });

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!existUser) {
      return res.status(400).json({ message: "User does not exists" });
    }

    const isMatch = await bcrypt.compare(password, existUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    let token;
    try {
      token = generateToken(existUser._id);
    } catch (error) {
      console.log(error);
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENVIRONMENT == "production",
      samesite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(
      { message: "Login successful" },
      {
        user: {
          firstName: existUser.firstName,
          lastName: existUser.lastName,
          email: existUser.email,
          userName: existUser.userName,
        },
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};


export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};