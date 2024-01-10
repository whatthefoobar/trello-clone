import { databases } from "@/appwrite";
import { getTodosGroupedByColumm } from "@/lib/getTodosGroupedByColumn";
import { create } from "zustand";

interface IBoardState {
  board: IBoard;
  getBoard: () => void;
  setBoardState: (board: IBoard) => void;
  updateTodoInDb: (todo: ITodo, columnId: TypedColumn) => void;
}

export const useBoardStore = create<IBoardState>((set) => ({
  board: {
    columns: new Map<TypedColumn, IColumn>(),
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumm();
    set({ board });
  },
  setBoardState: (board) => set({ board }),

  updateTodoInDb: async (todo, columnId) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    );
  },
}));
