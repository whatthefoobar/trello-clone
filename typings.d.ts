interface IBoard {
  columns: Map<TypedColumn, IColumn>;
}

type TypedColumn = "todo" | "inprogress" | "done";

interface IColumn {
  id: TypedColumn;
  todos: ITodo[];
}
//coming from appwrite
interface ITodo extends Models.Document {
  $id: string;
  $createdAt: string;
  title: string;
  status: TypedColumn;
  image?: IImage;
}
interface IImage {
  bucketId: string;
  fileId: string;
}

interface ITaskType {
  id: TypedColumn;
  name: string;
  description: string;
  color: string;
  ringColor: string;
}
