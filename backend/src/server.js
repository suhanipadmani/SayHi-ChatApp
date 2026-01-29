import express from "express";
import cookieParser from "cookie-parser"; 
import { ENV } from "./lib/env.js";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { app as socketApp, server } from "./lib/socket.js";

const __dirname = path.resolve();
const PORT = ENV.PORT || 5000;

// Use the Express app from socket.js
const app = socketApp;

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(
  cors({
    origin: ENV.CLIENT_URL.replace(/\/$/, ""),
    credentials: true,
  })
);
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (ENV.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  // Catch-all for React routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// Start server + DB connection
server.listen(PORT, async () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
  try {
    await connectDB();
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
});
