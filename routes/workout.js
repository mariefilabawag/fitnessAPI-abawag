const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workout');
const { verify } = require('../auth');

// Add Workout
router.post('/addWorkout', verify, workoutController.addWorkout);

// Get Workouts for Authenticated User
router.get('/getMyWorkouts', verify, workoutController.getMyWorkouts);

// Update Workout
router.patch('/updateWorkout/:id', verify, workoutController.updateWorkout);

// Delete Workout
router.delete('/deleteWorkout/:id', verify, workoutController.deleteWorkout);

// Complete Workout Status
router.patch('/completeWorkoutStatus/:id', verify, workoutController.completeWorkoutStatus);

module.exports = router;