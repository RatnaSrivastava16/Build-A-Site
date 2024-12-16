// const express = require('express');
// const auth = require('../middleware/auth');
// const Task = require('../models/Task');
// const router = express.Router();

// // Get all tasks for a user
// router.get('/', auth, async (req, res) => {
//   try {
//     const tasks = await Task.find({ userId: req.user.id });
//     res.status(200).json(tasks);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching tasks', error: err.message });
//   }
// });

// // Create a new task
// router.post('/', auth, async (req, res) => {
//   try {
//     const { title, description, status } = req.body;
//     const task = new Task({ title, description, status, userId: req.user.id });
//     await task.save();
//     res.status(201).json({ message: 'Task created successfully!', task });
//   } catch (err) {
//     res.status(500).json({ message: 'Error creating task', error: err.message });
//   }
// });

// // Update a task
// router.put('/:id', auth, async (req, res) => {
//   try {
//     const { title, description, status } = req.body;
//     const task = await Task.findOneAndUpdate(
//       { _id: req.params.id, userId: req.user.id },
//       { title, description, status },
//       { new: true }
//     );

//     if (!task) {
//       return res.status(404).json({ message: 'Task not found' });
//     }

//     res.status(200).json({ message: 'Task updated successfully!', task });
//   } catch (err) {
//     res.status(500).json({ message: 'Error updating task', error: err.message });
//   }
// });

// // Delete a task
// router.delete('/:id', auth, async (req, res) => {
//   try {
//     const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

//     if (!task) {
//       return res.status(404).json({ message: 'Task not found' });
//     }

//     res.status(200).json({ message: 'Task deleted successfully!' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error deleting task', error: err.message });
//   }
// });

// module.exports = router;
