import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  avatarUrl: string;
  team?: Types.ObjectId;
}

export interface TeamDocument extends Document {
  name: string;
  coach: string;
  members: Types.ObjectId[];
}

export interface ActivityDocument extends Document {
  user: Types.ObjectId;
  type: string;
  durationMinutes: number;
  distanceMiles?: number;
  points: number;
  completedAt: Date;
}

export interface LeaderboardDocument extends Document {
  user: Types.ObjectId;
  team?: Types.ObjectId;
  points: number;
  rank: number;
  period: string;
}

export interface WorkoutDocument extends Document {
  name: string;
  description: string;
  difficulty: string;
  durationMinutes: number;
  exercises: string[];
  target: string;
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatarUrl: { type: String, required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
});

const teamSchema = new Schema<TeamDocument>({
  name: { type: String, required: true },
  coach: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const activitySchema = new Schema<ActivityDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  distanceMiles: { type: Number, min: 0 },
  points: { type: Number, required: true, min: 0 },
  completedAt: { type: Date, required: true },
});

const leaderboardSchema = new Schema<LeaderboardDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  points: { type: Number, required: true, min: 0 },
  rank: { type: Number, required: true, min: 1 },
  period: { type: String, required: true },
});

const workoutSchema = new Schema<WorkoutDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  exercises: [{ type: String, required: true }],
  target: { type: String, required: true },
});

export const User: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);
export const Team: Model<TeamDocument> = mongoose.models.Team || mongoose.model<TeamDocument>('Team', teamSchema);
export const Activity: Model<ActivityDocument> = mongoose.models.Activity || mongoose.model<ActivityDocument>('Activity', activitySchema);
export const Leaderboard: Model<LeaderboardDocument> = mongoose.models.Leaderboard || mongoose.model<LeaderboardDocument>('Leaderboard', leaderboardSchema);
export const Workout: Model<WorkoutDocument> = mongoose.models.Workout || mongoose.model<WorkoutDocument>('Workout', workoutSchema);