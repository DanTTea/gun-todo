import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import _router from "next/router";
import { StateInterface, ToDoList } from "../../interfaces/todos";
import { activeToDo, subscribeTodo } from "../../services/gunDB";

const ToDos = () => {
  const router = useRouter();
  const { id } = router.query;
  let [state, setState] = useState<ToDoList>({
    id: id as string,
    items: [],
  });

  // useEffect(() => {
  //   console.log("id-userEffekt", id);
  //   if (!id) {
  //     return;
  //   }

  //   activeToDo.id = id as string;

  //   subscribeTodo(id as string, (data: any, key: any) => {
  //     console.log("key", key);
  //     console.log("obj", data);
  //     const idx = state.items.findIndex((ele) => ele?.id === key);

  //     if (idx === -1) {
  //       state.items.push({
  //         text: data.text,
  //         checked: data.checked,
  //         order: data?.order,
  //         id: key,
  //       });

  //       setState((state) => {
  //         return { ...state, items: [...state.items] };
  //       });
  //     } else {
  //       state.items[idx] = {
  //         ...state.items[idx],
  //         checked: data.checked,
  //         text: data.text,
  //       };

  //       setState({ ...state, items: [...state.items] });
  //     }

  //     console.log("STATE ITEMS", state.items);
  //   });
  // }, [router]);

  return (
    <>
      {/* {state.items.map((ele) => {
        return (
          <p>
            <span>{!!ele.checked}</span>: {ele.text}
          </p>
        );
      })} */}
      <div>ID: {activeToDo.id}</div>
      <div className="container">{!id && <h1>Loading...</h1>}</div>
    </>
  );
};

async function saveItemChanges(item: any, id: string) {
  console.table("saveItemChanges", item);
  console.log(id);

  // await editToDoItem(id, item);
  // gun.get(id).put({ items }, (ack) => console.log("ack", ack));

  //   const tmp = gun.get(id).get("items");
  //   console.log("tmp", tmp);

  return;
}

function saveToNode(state: StateInterface) {
  console.log("saveToList", state);

  // gun.get(state.id).put({ count: state.count + 1 });

  return;
}

function updateStateObjec(stateObj: any) {
  console.log("stateObj", stateObj);
  return;
}

export default ToDos;
