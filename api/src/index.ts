import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { ConnectToMongoDB } from './lib/db';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';

dotenv.config();
const app = express();
ConnectToMongoDB();

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/product', productRoutes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});