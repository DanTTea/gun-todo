import { rejects } from "assert";
import Gun from "gun/gun";
import { ToDoItem, ToDoList } from "../interfaces/todos";

const gun = Gun([
  // "https://gun-manhattan.herokuapp.com/gun",
  "https://gunjs.herokuapp.com/gun",
]);

export let activeToDo: ToDoList = { id: "", items: [], name: "" };

export function subscribeTodo(callBack: Function) {
  gun
    .get(activeToDo.id)
    .get("items")
    .map()
    .on((data, key) => {
      if (!data) {
        removeDeleteNode(key);

        return callBack(activeToDo.items);
      }

      const idx = activeToDo.items.findIndex((ele) => ele.id === data.id);

      if (idx === -1) {
        // Add item
        activeToDo.items.push({
          id: data.id,
          checked: data.checked,
          text: data.text.replace(/\\n/g, "\n"),
          order: data.order,
        });
      } else {
        // Update item
        activeToDo.items[idx] = {
          id: data.id,
          checked: data.checked,
          text: data.text.replace(/\\n/g, "\n"),
          order: data.order,
        };
      }
      callBack(activeToDo.items);
    }, true);
}

export async function editToDoItem(item: ToDoItem) {
  if (!activeToDo.id) {
    console.error("NO ID");
    return;
  }

  const saveItem = {
    ...item,
    order: item?.order ? item.order : -1,
    text: item?.text ? item.text : "",
    checked: item?.checked ? item.checked : false,
  };

  return new Promise<void>((resolve, rejects) => {
    gun
      .get(activeToDo.id)
      .get("items")
      .put({ [saveItem.id as string]: saveItem }, (ack) => {
        if (ack.err) {
          rejects(ack);
        }

        resolve();
      });
  });
}

export async function deleteNode(itemID: string) {
  return new Promise<void>((resolve, rejects) => {
    gun
      .get(activeToDo.id)
      .get("items")
      .get(itemID)
      // Needs to be null to delete a node
      .put(null as any, (ack) => {
        if (ack.err) {
          rejects(ack);
        }

        resolve();
      });
  });
}

function removeDeleteNode(itemID: string) {
  const idx = activeToDo.items.findIndex((item) => item.id === itemID);

  if (idx < 0) return;

  activeToDo.items.splice(idx, 1);
}
