import express from 'express';
import bookRoutes from './bookRoutes';

const app = express();

app.use(express.json());
app.use('/api', bookRoutes);

export default app;