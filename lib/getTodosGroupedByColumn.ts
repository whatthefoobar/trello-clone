import { databases } from "@/appwrite";
import { log } from "console";

// all todos in todo column inprogress column and done column
export const getTodosGroupedByColumm = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  );
  //   console.log(data);
  const todos = data.documents;
  // console.log("todos:", todos);

  //set n get are Map data structure methods
  const columns = todos.reduce((acc, todo) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      });
    }
    acc.get(todo.status)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
      //get image if it exists on the todo
      ...(todo.image && { image: JSON.parse(todo.image) }),
    });
    return acc;
  }, new Map<TypedColumn, IColumn>());
  // console.log("columns as coming from the db", columns);
  //this created key value pairs of todo type(todo inprogress done) and how many todos match this status
  // example todo: ["learn next.js", "learn appwrite"] done: ["take out dog"]

  //if columns doesn't have inprogress, todo and done, add them with empty todos
  const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"];
  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }
  // now i got a status column whether its empty or not so todo inprogress done
  console.log("default dolumns", columns);
  //sort columns by columnTypes , when fetching we may get them in a random order
  const sortedColumns = new Map(
    Array.from(columns.entries()).sort(
      (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )
  );

  const board: IBoard = {
    columns: sortedColumns,
  };

  return board;
};
