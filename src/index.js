// dependencies
import express from "express";
import authRoutes from "./routes/auth.route.js";

const app = express();

// use routers
app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log(`Server Is Live🔥`);
});
