const express = require("express");
const router = express.Router();
const {
  getAllWorkouts,
  getWorkoutById,
  addNewWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workout");

// Define routes
router.get("/", getAllWorkouts);
router.get("/:id", getWorkoutById);
router.post("/", addNewWorkout);
router.put("/:id", updateWorkout);
router.delete("/:id", deleteWorkout);

module.exports = router;