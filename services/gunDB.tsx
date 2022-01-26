import { rejects } from "assert";
import Gun from "gun/gun";
import { ToDoItem, ToDoList } from "../interfaces/todos";

const gun = Gun(["https://gun-manhattan.herokuapp.com/gun"]);

export let activeToDo: ToDoList = { id: "", items: [], name: "" };

export function subscribeTodo(callBack: Function) {
  gun
    .get(activeToDo.id)
    .get("items")
    .map()
    .on((data, key) => {
      console.log("_data", data);
      console.log("_key", key);

      if (!data) {
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
  console.log(item?.checked);
  console.log(item?.checked ? item.checked : false);

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
  console.log("save this item", saveItem);

  return new Promise<void>((resolve, rejects) => {
    gun
      .get(activeToDo.id)
      .get("items")
      .put({ [saveItem.id as string]: saveItem }, (ack) => {
        console.log("ACK", ack);

        if (ack.err) {
          rejects(ack);
        }

        resolve();
      });
  });
}

export async function deleteNode(itemID: string) {
  const idx = activeToDo.items.findIndex((item) => item.id === itemID);

  activeToDo.items.splice(idx, 1);

  return new Promise<void>((resolve, rejects) => {
    gun
      .get(activeToDo.id)
      .get("items")
      .get(itemID)
      .put(null, (ack) => {
        if (ack.err) {
          rejects(ack);
        }

        resolve();
      });
  });
}
