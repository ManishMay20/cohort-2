import express, { Request, Response } from "express";
import {rateLimit} from 'express-rate-limit';
const app = express();
const PORT = 3000;

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)

app.use(express.json());

const otpStore: Record<string, string> = {};

app.post("/generate-otp", (req: Request, res: Response): void => {
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

app.post("/reset-password", (req: Request, res: Response): void => {
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
  } else {
    res.status(401).json({ message: "invalid OTP" });
  }
});

app.listen(PORT, () => {
  console.log("server is running on port: 3000");
});
