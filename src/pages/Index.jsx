import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const clearCompleted = () => {
    const updatedTodos = todos.filter((todo) => !todo.completed);
    setTodos(updatedTodos);
  };

  const remainingTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-4">
        <h1 className="text-3xl font-bold">Todo App</h1>
      </header>
      <main>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Add a new todo</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Enter a new todo"
              className="flex-grow"
            />
            <Button onClick={addTodo}>Add</Button>
          </CardContent>
        </Card>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Todo List</CardTitle>
          </CardHeader>
          <CardContent>
            {todos.length === 0 ? (
              <p className="text-center">No todos yet!</p>
            ) : (
              <ul>
                {todos.map((todo, index) => (
                  <li key={index} className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Checkbox
                        checked={todo.completed}
                        onCheckedChange={() => toggleTodo(index)}
                        className="mr-2"
                      />
                      <span className={todo.completed ? "line-through" : ""}>{todo.text}</span>
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => deleteTodo(index)}>
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </main>
      <footer className="text-center mt-4">
        <Separator className="mb-4" />
        <p>{remainingTodos} items left</p>
        <Button variant="secondary" onClick={clearCompleted} className="mt-2">
          Clear Completed
        </Button>
      </footer>
    </div>
  );
};

export default Index;