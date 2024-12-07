import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import { RequestActionConstant } from "../constants/requestAction.constant.js";
import { Role } from "../constants/role.constant.js";
import Request from "../models/request.schema.js";
import User from "../models/user.schema.js";

const router = express.Router();

router.post("/sign-up", async (req, res) => {
    try {
        const { email, password, fullName, phone, branchName, roles, profilePictureUrl } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            fullName,
            roles,
            profilePictureUrl,
            phone,
            ...(branchName ? { branchName } : {}),
        });

        await newUser.save();

        if (roles.includes(Role.BUS_OWNER)) {
            newUser.isRequestBusOwner = true;

            const newRequest = new Request({
                actionNeeded: RequestActionConstant.BUS_OWNER_APPROVAL,
                target: "User",
                targetId: newUser._id,
                isResolved: false,
            });

            await newRequest.save();
        }

        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error creating user",
            error: error.message,
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Tạo token JWT
        const token = jwt.sign(
            { userId: user._id, roles: user.roles },
            process.env.JWT_SECRET || "default_jwt_secret",
            { expiresIn: "1h" },
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error during login",
            error: error.message,
        });
    }
});

router.post("/change-password", async (req, res) => {
    const { userId, oldPassword, newPassword } = req.body;
    if (!userId || !oldPassword || !newPassword) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
        const user = await User.findById(userId);
        if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(userId, { password: hashedPassword });

        res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
        console.error("Error changing password:", error);
        res
            .status(500)
            .json({ message: "Failed to update password.", error: error.message });
    }
});
export default router;
