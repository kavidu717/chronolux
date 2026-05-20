import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body

        const userExist = await User.findOne({ email })

        if (userExist) {
            return res.status(400).json({
                error: "User already exist"
            })
        }

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        return res.status(201).json({
            message: "User created successfully",
            user
        })

    }

    catch (error) {

        return res.status(500).json({
            error: error.message
        })

    }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // blocked check
    if (user.isBlocked) {
      return res.status(403).json({
        message: "User is blocked by admin",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // generate token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const blockUser = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.isBlocked = true;

    await user.save();

    res.json({
      message: "User blocked successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {

    const users = await User.find().select("-password");

    res.json(users);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const unblockUser = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.isBlocked = false;

    await user.save();

    res.json({
      message: "User unblocked successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


