import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import path from 'path';
import usersRoute from './routes/api/users.js';
import authRoute from './routes/api/auth.js';
import profileRoute from './routes/api/profile.js';
import postsRoute from './routes/api/posts.js';
dotenv.config(); // Load environment variables
const app = express();
// Connect to MongoDB
connectDB();
// Init middleware to parse JSON
app.use(express.json({ extended: false }));
// Serve uploaded files statically
const __dirname = path.resolve(); // Needed for ES modules
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Base route
app.get('/', (req, res) => {
  res.send('API running');
});
// Define API routes
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);
app.use('/api/profile', profileRoute);
app.use('/api/posts', postsRoute);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
