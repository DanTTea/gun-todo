export interface StateInterface {
  id: string;
  count: number;
}

export interface ToDoList {
  id: string;
  name?: string;
  items: ToDoItem[];
}

// export interface ToDoItem {
//   text: string;
//   checked: boolean;
//   subList?: ToDoItem[];
// }

export interface ToDoItem {
  text: string;
  checked: boolean;
  order?: number;
  id?: string;
}
