import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { AppDataSource } from "./data-source.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Built-in body parsing (no extra package)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Initialize DB once
async function startServer() {
  try {
    await AppDataSource.initialize();
    console.log("✅ SQLite connected via TypeORM");

    // Example route using repository
    app.get("/health", async (req, res) => {
      res.json({ status: "ok", db: "connected" });
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error starting server:", err);
  }
}

startServer();
