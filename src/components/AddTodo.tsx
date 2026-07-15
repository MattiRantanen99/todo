import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export interface Todo {
  description: string;
  date: string;
  priority: string;
  id?: string;
}

interface AddTodoProps {
  addTodo: (todo: Todo) => void
}

const AddTodo = ({addTodo}: AddTodoProps) => {
  const [open, setOpen] = useState(false);
  const [todo, setTodo] = useState<Todo>({description: '', date: '', priority: ''});

  const inputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSave = () => {
    addTodo(todo);
    handleClose();
    setTodo({description: '', date: '', priority: ''})
  }

  return(
    <>
      <Button variant="outlined" onClick={handleOpen}>
        Add todo
      </Button>
      <Dialog open={open}>
        <DialogTitle>New todo</DialogTitle>
        <DialogContent>
          <TextField
            name="description"
            value={todo.description}
            onChange={inputChanged}
            margin="dense"
            label="Description"
            fullWidth
          /> 
           <TextField
            name="date"
            value={todo.date}
            onChange={inputChanged}
            margin="dense"
            label="Date"
            fullWidth
          /> 
          <TextField
            name="priority"
            value={todo.priority}
            onChange={inputChanged}
            margin="dense"
            label="Priority"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>Cancel</Button>
          <Button color="primary" onClick={handleSave}>Save</Button>
        </DialogActions>
       </Dialog> 
     </>
  );
}

export default AddTodo;