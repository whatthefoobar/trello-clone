import React from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import TodoCard from "./TodoCard";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useBoardStore } from "@/store/BoardStore";
import { useModalStore } from "@/store/ModalStore";

type Props = {
  id: TypedColumn;
  todos: ITodo[];
  index: number;
};

const idToColumnText: {
  [key in TypedColumn]: string;
} = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

const Column = ({ id, todos, index }: Props) => {
  const [searchString, setNewTaskType] = useBoardStore((state) => [
    state.searchString,
    state.setNewTaskType,
  ]);

  const [openModal] = useModalStore((state) => [
    state.openModal,
    state.closeModal,
  ]);

  const handleAddTodo = () => {
    setNewTaskType(id);
    openModal();
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {/* render dropable todos */}
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? "bg-green-200/50" : "bg-white/50"
                }`}
              >
                <h2 className="flex justify-between font-bold text-xl ">
                  {idToColumnText[id]}
                  <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-2 text-sm font-normal">
                    {/* {todos.length} */}
                    {/* shows zero if searched by keword and it does not match */}
                    {!searchString
                      ? todos.length
                      : todos.filter((todo) =>
                          todo.title
                            .toLowerCase()
                            .includes(searchString.toLowerCase())
                        ).length}
                  </span>
                </h2>
                <div className="space-y-2">
                  {todos.map((todo, index) => {
                    if (
                      searchString &&
                      !todo.title
                        .toLowerCase()
                        .includes(searchString.toLowerCase())
                    )
                      return null;
                    return (
                      <Draggable
                        key={todo.$id}
                        draggableId={todo.$id}
                        index={index}
                      >
                        {(provided) => (
                          <TodoCard
                            todo={todo}
                            index={index}
                            id={id}
                            innerRef={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
                          ></TodoCard>
                        )}
                      </Draggable>
                    );
                  })}
                  {/* stretches column to fit new todo when a todo is dragged into it */}
                  {provided.placeholder}

                  <div className="flex items-end justify-end p-2">
                    <button
                      className="text-green-500 hover:text-green-600"
                      onClick={handleAddTodo}
                    >
                      <PlusCircleIcon className="h-10 w-10"></PlusCircleIcon>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
