const Workout = require('../models/Workout');

// Add Workout
module.exports.addWorkout = (req, res) => {
    const { name, duration } = req.body;
    const workout = new Workout({
        userId: req.user.id,
        name,
        duration,
        dateAdded: new Date(),
        status: "pending"
    });
    workout.save()
        .then(savedWorkout => res.status(201).json({ message: 'Workout added successfully.', workout: savedWorkout }))
        .catch(error => res.status(500).json({ message: 'Failed to add workout.', error: error.message }));
};

// Get Workouts for Authenticated User
module.exports.getMyWorkouts = (req, res) => {
    Workout.find({ userId: req.user.id })
        .then(workouts => res.status(200).json({"workouts": (workouts)}))
        .catch(error => res.status(500).json({ message: 'Failed to retrieve workouts.', error: error.message }));
};

// Update Workout
module.exports.updateWorkout = (req, res) => {
    const { name, duration } = req.body;
    Workout.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        { name, duration },
        { new: true }
    )
    .then(updatedWorkout => {
        if (!updatedWorkout) {
            return res.status(404).json({ message: 'Workout not found.' });
        }
        res.status(200).json({ message: 'Workout updated successfully.', updatedWorkout });
    })
    .catch(error => res.status(500).json({ message: 'Failed to update workout.', error: error.message }));
};

// Delete Workout
module.exports.deleteWorkout = (req, res) => {
    Workout.findOneAndDelete({ _id: req.params.id, userId: req.user.id })
        .then(workout => {
            if (!workout) {
                return res.status(404).json({ message: 'Workout not found.' });
            }
            res.status(200).json({ message: 'Workout deleted successfully.' });
        })
        .catch(error => res.status(500).json({ message: 'Failed to delete workout.', error: error.message }));
};

// Complete Workout Status
module.exports.completeWorkoutStatus = (req, res) => {
    Workout.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        { status: 'completed' },
        { new: true }
    )
    .then(updatedWorkout => {
        if (!updatedWorkout) {
            return res.status(404).json({ message: 'Workout not found.' });
        }
        res.status(200).json({ message: 'Workout status updated successfully', updatedWorkout });
    })
    .catch(error => res.status(500).json({ message: 'Failed to complete workout.', error: error.message }));
};