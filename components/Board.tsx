"use client";

import { useBoardStore } from "@/store/BoardStore";
import { useEffect } from "react";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import Column from "./Column";
import { log } from "console";

const Board = () => {
  const [board, getBoard, setBoardState, updateTodoInDb] = useBoardStore(
    (state) => [
      state.board,
      state.getBoard,
      state.setBoardState,
      state.updateTodoInDb,
    ]
  );

  useEffect(() => {
    getBoard();
  }, [getBoard]);
  console.log("board", board);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    console.log("destination", destination);
    console.log("source", source);
    console.log("type", type);

    // check if user dragged card outside board
    if (!destination) return;
    console.log("board", board);
    console.log("entries", board.columns.entries());

    // handle column drag
    if (type === "column") {
      //make key value pairs
      //0 todo, 1 inprogress, 2 done
      const entries = Array.from(board.columns.entries());
      // remove 1 element from source.index
      const [removed] = entries.splice(source.index, 1);
      //insert removed at destination.index and remove 0 elements in entries
      entries.splice(destination.index, 0, removed);
      // now re-arrange the map
      const rearrangedColumns = new Map(entries);
      setBoardState({
        ...board,
        columns: rearrangedColumns,
      });
    }
    //Handle card drag
    //this step is needed as the indexes are stored as numbers instead of ids with dnd library
    //create a copy of my columns
    const columns = Array.from(board.columns);
    const startColIndex = columns[Number(source.droppableId)];
    const finishColIndex = columns[Number(destination.droppableId)];

    const startCol: IColumn = {
      //todo inprogress or done
      id: startColIndex[0],
      todos: startColIndex[1].todos,
    };

    const finishCol: IColumn = {
      id: finishColIndex[0],
      todos: finishColIndex[1].todos,
    };
    console.log(startCol, finishCol);
    if (!startCol || !finishCol) return;

    if (source.index === destination.index && startCol === finishCol) return;
    const newTodos = startCol.todos;
    const [todoMoved] = newTodos.splice(source.index, 1);

    if (startCol.id === finishCol.id) {
      // same column task drag
      newTodos.splice(destination.index, 0, todoMoved);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };
      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);

      setBoardState({ ...board, columns: newColumns });
    } else {
      // dragging to a different column
      const finishTodos = Array.from(finishCol.todos);
      finishTodos.splice(destination.index, 0, todoMoved);

      const newColumns = new Map(board.columns);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };

      newColumns.set(startCol.id, newCol);
      newColumns.set(finishCol.id, {
        id: finishCol.id,
        todos: finishTodos,
      });

      // update in db
      updateTodoInDb(todoMoved, finishCol.id);

      setBoardState({ ...board, columns: newColumns });
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {/* render all the columns */}
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column
                key={id}
                id={id}
                todos={column.todos}
                index={index}
              ></Column>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
