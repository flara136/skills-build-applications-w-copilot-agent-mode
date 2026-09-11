import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [maya, jordan, priya, lucas] = await User.create([
      { name: 'Maya Chen', email: 'maya.chen@mergington.edu', avatarUrl: 'https://i.pravatar.cc/150?img=47' },
      { name: 'Jordan Brooks', email: 'jordan.brooks@mergington.edu', avatarUrl: 'https://i.pravatar.cc/150?img=12' },
      { name: 'Priya Shah', email: 'priya.shah@mergington.edu', avatarUrl: 'https://i.pravatar.cc/150?img=32' },
      { name: 'Lucas Martin', email: 'lucas.martin@mergington.edu', avatarUrl: 'https://i.pravatar.cc/150?img=11' },
    ]);

    const [trailblazers, powerSquad] = await Team.create([
      { name: 'Trailblazers', coach: 'Coach Paul Octo', members: [maya._id, jordan._id] },
      { name: 'Power Squad', coach: 'Coach Jessica Cat', members: [priya._id, lucas._id] },
    ]);

    await User.bulkWrite([
      { updateOne: { filter: { _id: maya._id }, update: { team: trailblazers._id } } },
      { updateOne: { filter: { _id: jordan._id }, update: { team: trailblazers._id } } },
      { updateOne: { filter: { _id: priya._id }, update: { team: powerSquad._id } } },
      { updateOne: { filter: { _id: lucas._id }, update: { team: powerSquad._id } } },
    ]);

    await Activity.create([
      { user: maya._id, type: 'Running', durationMinutes: 32, distanceMiles: 3.1, points: 45, completedAt: new Date('2026-09-08') },
      { user: jordan._id, type: 'Strength training', durationMinutes: 40, points: 50, completedAt: new Date('2026-09-09') },
      { user: priya._id, type: 'Cycling', durationMinutes: 55, distanceMiles: 12.4, points: 70, completedAt: new Date('2026-09-07') },
      { user: lucas._id, type: 'Walking', durationMinutes: 35, distanceMiles: 2.2, points: 30, completedAt: new Date('2026-09-10') },
    ]);

    await Leaderboard.create([
      { user: priya._id, team: powerSquad._id, points: 320, rank: 1, period: 'September 2026' },
      { user: maya._id, team: trailblazers._id, points: 285, rank: 2, period: 'September 2026' },
      { user: jordan._id, team: trailblazers._id, points: 260, rank: 3, period: 'September 2026' },
      { user: lucas._id, team: powerSquad._id, points: 230, rank: 4, period: 'September 2026' },
    ]);

    await Workout.create([
      { name: 'Starter Circuit', description: 'A balanced introduction to full-body movement.', difficulty: 'Beginner', durationMinutes: 20, exercises: ['Bodyweight squats', 'Incline push-ups', 'Plank'], target: 'Full body' },
      { name: 'Cardio Builder', description: 'Build steady endurance with simple intervals.', difficulty: 'Intermediate', durationMinutes: 30, exercises: ['Jog', 'High knees', 'Walking recovery'], target: 'Cardio' },
      { name: 'Core Focus', description: 'Improve stability and posture with controlled movements.', difficulty: 'Intermediate', durationMinutes: 25, exercises: ['Dead bug', 'Bird dog', 'Side plank'], target: 'Core' },
    ]);

    console.log('Seeded users, teams, activities, leaderboard, and workouts');

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
