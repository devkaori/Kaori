import * as chalk from 'chalk';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';

dotenv.config();

interface IBadge extends Document {
  User: string;
  FLAGS: string[];
}

const BadgeSchema: Schema = new Schema({
  User: String,
  FLAGS: [String],
});

const BadgeModel = mongoose.model<IBadge>('Badge', BadgeSchema);

if (!process.argv[2]) {
  console.log(chalk.red(`[ERROR]`), chalk.white(`>>`), chalk.red(`Developer Badge`), chalk.white(`>>`), chalk.red(`Please provide a member id!`));
  process.exit(1);
}

mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.MONGO_TOKEN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(chalk.green(`[SUCCESS]`), chalk.white(`>>`), chalk.green(`Developer Badge`), chalk.white(`>>`), chalk.green(`Connected to the database!`));
  })
  .catch((err) => {
    console.log(chalk.red(`[ERROR]`), chalk.white(`>>`), chalk.red(`Developer Badge`), chalk.white(`>>`), chalk.red(`Failed to connect to the database!`));
    console.log(err);
    process.exit(1);
  });

BadgeModel.findOne({ User: process.argv[2] }, async (err, data) => {
  if (err) {
    console.log(err);
  }

  if (!data) {
    // Create a new document
    const newData = new BadgeModel({
      User: process.argv[2],
      FLAGS: ["DEVELOPER"],
    });

    try {
      await newData.save();
    } catch (err) {
      console.log(err);
    }

    console.log(chalk.white(`>>`), chalk.red(`Developer Badge`), chalk.green(`has been added to the user!`));
    mongoose.connection.close();
    process.exit(0);
  }

  if (data) {
    // Update the document
    data.FLAGS.push("DEVELOPER");

    try {
      await data.save();
    } catch (err) {
      console.log(err);
    }

    console.log(chalk.white(`>>`), chalk.red(`Developer Badge`), chalk.green(`has been added to the user!`));
    mongoose.connection.close();
    process.exit(0);
  }
});