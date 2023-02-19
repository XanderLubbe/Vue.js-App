import type { ToDo } from "./ToDoType";

enum Actions {
    Add,
    Edit,
    Remove,
    None 
}

type Undo = {
    action: Actions;
    ToDo: ToDo;
}

export type {Undo}
export {Actions}