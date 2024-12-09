import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import adminRoutes from './routes/adminRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 8200;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
