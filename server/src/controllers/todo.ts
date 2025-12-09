import { Request, Response } from "express";
import { Todo } from "../models/todo";

export const createNewTodo = async (req : Request, res : Response)=>{
    try {
        const {title} = req.body;
        const newTodo = await Todo.create({
            title,
        });
        res.status(200).json({message : "New Todo added." , todo : newTodo})
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something went wrong."})
    }
}

export const getTodos = async (req : Request, res : Response)=>{
    try {
        const todos = await Todo.find();
        res.status(200).json({message : "all todos fetch." , todos})
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something went wrong."})
    }
}

export const getTodo = async (req : Request, res : Response)=>{
    try {
        const {todoId} = req.params;
        const todo = await Todo.findById(todoId);
        res.status(200).json({message : "Todo has been fetched." , todo})
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something went wrong."})
    }
}

export const updateTodo = async (req : Request, res : Response)=>{
    const {todoId} = req.params;
    const {title} = req.body;
    try {
        const upTodo = await Todo.findByIdAndUpdate(todoId, {
            title,
        })
        res.status(200).json({message : "Todo has been updated." , todo : upTodo})
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something went wrong."})
    }
}

export const deleteTodo = async (req : Request, res : Response)=>{
    try {
         const {todoId} = req.params;
        // await Todo.findByIdAndDelete(todoId);
        // res.status(500).json({message : "Todo has been destory." })
        // const { todoId } = req.params;

        const deleted = await Todo.findByIdAndDelete(todoId);

        if (!deleted) {
        return res.status(404).json({ message: "Todo not found." });
        }

        res.status(200).json({ message: "Todo has been destroyed." });
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something went wrong."})
    }
}