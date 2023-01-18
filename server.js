import express from "express";
import { Schema,mongoose } from "mongoose";
import cors from 'cors'
import bodyParser from "body-parser";

const todoSchema = new Schema({
    text:{
        type: String,
        required: true
    },
    isComplete: {
        type: Boolean,
        default : false
    }
})


mongoose.connect("mongodb://localhost:27017/todoApp")
.then(()=> console.log("yaaay connected"))
.catch(() => console.log("error detected"))

const Todo = mongoose.model("todos",todoSchema)

const app = express()
app.use(cors())
let jsonParser = bodyParser.json()



app.get("/",async (req,res)=>{
    let firstTodo = await Todo.find()
    res.send(firstTodo)
})

app.post("/", jsonParser,(req, res) => {
       new Todo(req.body).save()
       res.send("status code 202")
  });

app.delete("/:id", async (req,res)=>{
    const {id} = req.params
    await Todo.deleteOne({_id: id})
    res.send("status code 202")
})

app.put("/:id", async (req,res)=>{
    const {id} = req.params
    await Todo.updateOne(
        {_id: id},
        {
            $set: { isComplete: true}
        }
    )
    res.send("status code 202")
})

app.listen(3003)