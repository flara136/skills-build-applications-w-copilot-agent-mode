import cors from 'cors';
import express, { Request, Response } from 'express';
import { Document, Model } from 'mongoose';
import './config/database';
import { Activity, Leaderboard, Team, User, Workout } from './models';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

export { app, apiBaseUrl };

app.use(cors());
app.use(express.json());

const respondWithCollection = <T extends Document>(collection: string, model: Model<T>) => async (_request: Request, response: Response) => {
  try {
    const data = await model.find().lean();
    response.json({ collection, data });
  } catch (error) {
    console.error(`Error loading ${collection}:`, error);
    response.status(500).json({ error: `Unable to load ${collection}` });
  }
};

app.get('/', (_request, response) => {
  response.json({ name: 'Octofit Tracker API', apiBaseUrl });
});

app.get('/api/users/', respondWithCollection('users', User));
app.get('/api/teams/', respondWithCollection('teams', Team));
app.get('/api/activities/', respondWithCollection('activities', Activity));
app.get('/api/leaderboard/', respondWithCollection('leaderboard', Leaderboard));
app.get('/api/workouts/', respondWithCollection('workouts', Workout));
