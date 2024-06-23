const express = require('express');
const dotenv = require('dotenv');
var cors = require('cors');
// Load environment variables from .env file

const app = express();
dotenv.config();
app.use(cors());

const DatabaseConnect = require('./config/DatabaseConnect');
const Task = require('./models/task');


const port = process.env.PORT || 8080;
app.use(express.json());

// Connect to the database
DatabaseConnect();


///get all tasks
app.get('/api/tasks',async(req,res)=>{
    try {
        const tasks=await Task.find();
        res.json(tasks);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
})


///post new task

app.post('/api/tasks',async(req,res)=>{
    try {
        const {title,description}=req.body;
        const newtask=new Task({title,description});
        await newtask.save();
        res.status(201).json(newtask);
    } catch (error) {
        res.status(400).json({Message:error.message});
    }
})


//update tasks
app.put('/api/tasks/:id',async(req,res)=>{
    try {
        const {title,description,completed}=req.body;
        const task=await Task.findByIdAndUpdate(
            req.params.id,
            {title,description,completed},
            {new:true,runValidators:true}
        )
        if(!task){
            return res.status(404).json({Message:'Task not found!'});
            
        }
        res.json(task);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
})


app.delete('/api/tasks/:id',async(req,res)=>{
    try {
        const task=await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(404).json({Message:'Task not found'});
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({Message:error.message});
    }
})

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
