const mongooose = require("mongoose");
const Workout = require("../models/workout");
const express = require("express");
const router = express.Router();

//get all workouts
const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.json(workouts);
  } catch (err) {
    res.json({ message: err });
  }
};

//get workout by id
const getWorkoutById = async (req, res) => {
  try {
    const workoutID = req.params.id;
    const workout = await Workout.findById(workoutID);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.json(workout);
  } catch (err) {
    res.json({ message: err });
  }
};

//add new workout
const addNewWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  if (isNaN(reps) || isNaN(load)) {
    return res.status(400).json({ message: "Reps and load must be numbers" });
  }

  const workout = new Workout({ title, reps: Number(reps), load: Number(load) });

  try {
    const savedWorkout = await workout.save();
    res.json(savedWorkout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//update workout
const updateWorkout = async (req, res) => {
  try {
    const workoutID = req.params.id;
    const updatedWorkout = await Workout.findByIdAndUpdate(
      { _id: workoutID },
      req.body,
      { new: true }
    );
    if (!updatedWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.json(updatedWorkout);
  } catch (err) {
    res.json({ message: err });
  }
};

//delete workout
const deleteWorkout = async (req, res) => {
  try {
    const workoutID = req.params.id;
    const deletedWorkout = await Workout.findByIdAndDelete(workoutID);
    if (!deletedWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.json(deletedWorkout);
  } catch (err) {
    res.json({ message: err });
  }
};

module.exports = {
  getAllWorkouts,
  getWorkoutById,
  addNewWorkout,
  updateWorkout,
  deleteWorkout,
};
