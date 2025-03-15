"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const db_1 = require("./lib/db");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, db_1.ConnectToMongoDB)();
app.use((0, cors_1.default)({
    origin: (_a = process.env.CLIENT_URL) === null || _a === void 0 ? void 0 : _a.replace(/\/$/, ""),
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
// Enable Gzip compression for all responses - Reduces API payload size by ~70%.
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use('/auth', auth_routes_1.default);
app.use('/user', user_routes_1.default);
app.use('/product', product_routes_1.default);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
