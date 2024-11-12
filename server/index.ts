import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import { TFilter, TUpdateField } from "./type";

// Create an Express application instance
const app = express();

// Enable CORS middleware to allow cross-origin requests
app.use(cors());

// Enable JSON parsing middleware for incoming requests
app.use(express.json());

// MongoDB connection URI and Client setup
const MONGODB_URI =
  "mongodb+srv://admin_um:admin1234@cluster0.xmeadqe.mongodb.net/todo-app?retryWrites=true&w=majority";

const client = new MongoClient(MONGODB_URI);

// Define a basic API endpoint
const port = 3000;

async function connectToDatabase() {
  try {
    await client.connect();
    // Connect to the database
    const db = client.db("todo-app");
    // Define the tasks collection
    const taskCollection = db.collection("tasks");

    // get all tasks
    app.get("/tasks", async (req, res) => {
      try {
        const { status, priority, category } = req.query;
        const filter: TFilter = { isDeleted: false };

        //apply additional filters based on the query parameters
        if (status) filter.status = status as string;
        if (priority) filter.priority = priority as string;
        if (category) filter.category = category as string;

        const result = await taskCollection.find(filter).toArray();
        res.status(200).json(result);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Failed to fetch tasks" });
      }
    });

    //add new task
    app.post("/tasks", async (req, res) => {
      try {
        const data = req.body;
        console.log(data);
        const result = await taskCollection.insertOne(data);
        res.status(201).json(result);
      } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({ error: "Failed to add task" });
      }
    });

    //update a task
    app.put("/tasks/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const { title, description, priority, category, status } = req.body;
        const updateFields: TUpdateField = {};

        if (title) updateFields.title = title;
        if (description) updateFields.description = description;
        if (priority) updateFields.priority = priority;
        if (category) updateFields.category = category;
        if (status) updateFields.status = status;

        const result = await taskCollection.updateOne(
          { _id: new ObjectId(id), isDeleted: false },
          { $set: updateFields }
        );
        if (result.modifiedCount > 0) {
          const updatedTask = await taskCollection.findOne({
            _id: new ObjectId(id),
          });
          res.status(200).json(updatedTask);
        } else {
          res.status(404).json({ error: "Task not found or no changes made" });
        }
      } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({ error: "Failed to update task" });
      }
    });

    // Mark a task as deleted (soft delete)
    app.delete("/tasks/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const result = await taskCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { isDeleted: true } } // Mark task as deleted
        );

        if (result.modifiedCount > 0) {
          res.status(200).json({ message: "Task deleted successfully" });
        } else {
          res.status(404).json({ error: "Task not found" });
        }
      } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Failed to delete task" });
      }
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Start the MongoDB connection
connectToDatabase();

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
