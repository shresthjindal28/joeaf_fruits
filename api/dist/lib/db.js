"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectToMongoDB = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const ConnectToMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
        yield mongoose_1.default.connect(url, {
            maxPoolSize: 10, // Maintain up to 10 socket connections
            socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
        });
        console.log("Successfully connected to the Database");
    }
    catch (error) {
        console.log("Failed to connect to the Database. ", error);
    }
});
exports.ConnectToMongoDB = ConnectToMongoDB;
