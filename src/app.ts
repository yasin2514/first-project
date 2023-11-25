import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';

const app: Application = express();
// const port = 3000;

//parser--
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoutes);

const getAController = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Hello Server is working good',
  });
};

app.get('/', getAController);

export default app;
