const express = require("express");
const connectDB = require("./config/database");
const config = require("./config/config");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

// Middlewares
// app.js - update the CORS configuration
app.use(cors({
    credentials: true,
    origin: [
        'http://localhost:5173',  // Local development
        'https://point-of-sale-pi-eight.vercel.app'  // Your Vercel frontend
    ]
}));
app.use(express.json());
app.use(cookieParser());

// Root Endpoint
app.get("/", (req,res) => {
    res.json({message : "Hello from POS Server!"});
});

// Other Endpoints
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/order", require("./routes/orderRoute"));
app.use("/api/table", require("./routes/tableRoute"));
app.use("/api/payment", require("./routes/paymentRoute"));
app.use("/api/category", require("./routes/categoryRoute"));
app.use("/api/menu-item", require("./routes/menuItemRoute"));

// Global Error Handler
app.use(globalErrorHandler);

// IMPORTANT: Connect to database BEFORE starting server
const startServer = async () => {
    try {
        await connectDB(); // Wait for database connection
        const PORT = config.port; // This will use process.env.PORT or 3000
        app.listen(PORT, '0.0.0.0', () => { // Listen on all network interfaces
            console.log(`☑️ POS Server is listening on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
