const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/employeeDB');
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);//mongodb://localhost:27017
        process.exit(1);
    }
};

connectDB();

// Employee Schema
const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    salary: { type: String, required: true },
    dateOfHire: { type: String, required: true }
});

const Employee = mongoose.model('Employee', employeeSchema);

// Routes
app.get('/api/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
        console.log("employee", employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/employees', async (req, res) => {
    console.log("body", req.body)
    const newEmployee = new Employee(req.body);
    try {
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
        console.log("savedEmployee", savedEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.put('/api/employees/:id', async (req, res) => {
    console.log("Came to Put")
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        console.log("Update Sucess")
        res.json(updatedEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/employees/:id', async (req, res) => {
    console.log("Came to Delete")
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
