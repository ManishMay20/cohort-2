"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = require("express-rate-limit");
const app = (0, express_1.default)();
const PORT = 3000;
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
});
// Apply the rate limiting middleware to all requests.
app.use(limiter);
app.use(express_1.default.json());
const otpStore = {};
app.post("/generate-otp", (req, res) => {
    // Change return type to void
    const email = req.body.email;
    if (!email) {
        res.status(400).json({ message: "Email is required" });
        return;
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;
    console.log(`OTP for ${email}:${otp}`);
    res.status(200).json({ messsage: "OTP generated and logged" });
});
app.post("/reset-password", (req, res) => {
    // Change return type to void
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        res
            .status(400)
            .json({ message: "Email, OTP and new password are required" });
        return;
    }
    if (otpStore[email] === otp) {
        console.log(`Password for ${email} has been reset to: ${newPassword}`);
        delete otpStore[email];
        res.status(200).json({ message: "Password has been reset successfully" });
    }
    else {
        res.status(401).json({ message: "invalid OTP" });
    }
});
app.listen(PORT, () => {
    console.log("server is running on port: 3000");
});
