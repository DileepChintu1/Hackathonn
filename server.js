const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files from the public directory

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/course-selection', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Teacher Schema
const teacherSchema = new mongoose.Schema({
    name: String,
    background: String,
    researchProjects: String,
    ratings: Number,
    patents: String,
});

const Teacher = mongoose.model('Teacher', teacherSchema);

// API Endpoint to get teachers
app.get('/api/teachers', async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// API Endpoint to submit course selection (for demonstration)
app.post('/api/course-selection', (req, res) => {
    const { theoryCourses, labCourses } = req.body;
    // Save selection logic here
    console.log('Course Selection:', theoryCourses, labCourses);
    res.status(201).json({ message: 'Course selection submitted successfully!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
