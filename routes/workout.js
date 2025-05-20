const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workout');
const { verify } = require('../auth');

// Add Workout
router.post('/workouts/addWorkout', verify, workoutController.addWorkout);

// Get Workouts for Authenticated User
router.get('/workouts/getMyWorkouts', verify, workoutController.getMyWorkouts);

// Update Workout
router.patch('/workouts/updateWorkout/:id', verify, workoutController.updateWorkout);

// Delete Workout
router.delete('/workouts/deleteWorkout/:id', verify, workoutController.deleteWorkout);

// Complete Workout Status
router.patch('/workouts/completeWorkoutStatus/:id', verify, workoutController.completeWorkoutStatus);

module.exports = router;