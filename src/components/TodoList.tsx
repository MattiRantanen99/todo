import { AgGridReact } from "ag-grid-react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import type { Todo } from "../types/types";
   
ModuleRegistry.registerModules([ AllCommunityModule ]);

interface TodoListProps {
  todos: Todo[];
  deleteTodo: (id: string) => void;
}

function TodoList({ todos, deleteTodo }: TodoListProps) {
  const columnDefs: ColDef<Todo>[] = [
    { field: "description", sortable: true, filter: true },
    { field: "date", sortable: true, filter: true },
    { field: "priority", sortable: true, filter: true },
    {
      headerName: "",
      field: "id",
      width: 90,
      cellRenderer: (params: ICellRendererParams<Todo, string>) => (
        <IconButton
          onClick={() => deleteTodo(params.value as string)}
          size="small"
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div className="ag-theme-material" style={{ height: 400, width: 700 }}>
      <AgGridReact<Todo> rowData={todos} columnDefs={columnDefs} />
    </div>
  );
}

export default TodoList;