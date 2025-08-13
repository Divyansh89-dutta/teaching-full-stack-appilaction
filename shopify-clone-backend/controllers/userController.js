import User from "../models/User.js";
import asyncHandler from "express-async-handler";


export const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
});

export const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!!user) return res.status(404).json({ message: "User not found" });

    const { name, email, password, addresses } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (addresses) user.addresses = addresses;

    if (password) user.password = password;

    const updated = await user.save();

    const userObj = updated.toObject();
    delete userObj.password;
    res.json(userObj);

})

export const listUsers = asyncHandler(async (req, res) => {
  // adminOnly middleware ensures admin
  const users = await User.find().select("-password");
  res.json(users);
});

export const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
});

export const updateUserByAdmin = asyncHandler(async (req, res) => {
    const { name, email, role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role; // validate on frontend that role is correct

    const updated = await user.save();
    const obj = updated.toObject();
    delete obj.password;
    res.json(obj);
});
export const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.remove();
    res.json({ message: "User removed" });
});
