import express from 'express';
import dotenv from 'dotenv';
import connectToDB from './config/db.js';
import apiRoutes from './routes/routes.js';
import setupSwagger from './config/swagger.js';
dotenv.config();

connectToDB();

const app = express();
app.use(express.json());

app.use('/api', apiRoutes);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  });
  
setupSwagger(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
