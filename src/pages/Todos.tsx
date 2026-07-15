import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import type { Todo } from "../types/types";
import { db, auth, logOut } from "../services/firebase";

import {
  ref,
  push,
  set,
  remove,
  onValue,
  DataSnapshot,
} from "firebase/database";

function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (!auth.currentUser) return;

    const itemsRef = ref(db, `items/${auth.currentUser.uid}`);
    const unsubscribe = onValue(itemsRef, (snapshot: DataSnapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const todosWithIds: Todo[] = Object.entries(data).map(([key, value]) => ({
          ...(value as Omit<Todo, "id">),
          id: key,
        }));
        setTodos(todosWithIds);
      } else {
        setTodos([]);
      }
    });

    return () => unsubscribe();
  }, [auth.currentUser?.uid]);

  const addTodo = async (newTodo: Todo) => {
    if (!auth.currentUser) return;
    const itemsRef = ref(db, `items/${auth.currentUser.uid}`);
    const newItemRef = push(itemsRef);
    await set(newItemRef, {
      description: newTodo.description,
      date: newTodo.date,
      priority: newTodo.priority,
    });
  };

  const deleteTodo = async (id: string) => {
    if (!auth.currentUser) return;
    const todoRef = ref(db, `items/${auth.currentUser.uid}/${id}`);
    await remove(todoRef);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            TodoList
          </Typography>
          <Button color="inherit" onClick={logOut}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <AddTodo addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </>
  );
}

export default Todos;