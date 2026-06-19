import { Button } from "../ui/button";
import { type TPriority } from "@/redux/features/todoSlice";
import UpdateModal from "./UpdateModal";
import {
  useDeleteTodoFromDBMutation,
  useUpdateTodoIntoDBMutation,
} from "@/redux/api/api";

export type TTodoCardProps = {
  _id: string;
  title: string;
  description: string;
  priority: TPriority;
  isCompleted?: boolean;
};

const TodoCard = ({
  _id,
  title,
  description,
  isCompleted,
  priority,
}: TTodoCardProps) => {
  const [deleteTodo] = useDeleteTodoFromDBMutation();
  const [updateTodo] = useUpdateTodoIntoDBMutation();

  const toggleChecked = () => {
    const obj = {
      isCompleted: !isCompleted,
    };
    updateTodo({ id: _id, ...obj });
  };

  const getPriorityBg = (p: string) => {
    if (p === "high") return "bg-red-500";
    else if (p === "medium") return "bg-yellow-500";
    else if (p === "low") return "bg-green-500";
    else return "";
  };

  const handleDelete = (id: string) => {
    deleteTodo(id);
  };

  return (
    <div className="bg-white rounded-md flex justify-between items-center p-3 border">
      <input
        type="checkbox"
        name=""
        id=""
        checked={isCompleted}
        onChange={toggleChecked}
        className="mr-4"
      />
      <p
        className={`font-semibold ${isCompleted ? "line-through" : ""} flex-1`}
      >
        {title}
      </p>
      <div className="flex-1 flex items-center gap-2">
        <div
          className={`size-3 rounded-full ${getPriorityBg(priority)} `}
        ></div>
        <p>{priority}</p>
      </div>
      <div className="flex-1">
        {isCompleted ? (
          <p className="text-green-500">Done</p>
        ) : (
          <p className="text-red-600">Pending...</p>
        )}
      </div>
      <p className={`flex-2 ${isCompleted ? "line-through" : ""}`}>
        {description}
      </p>
      <div className="space-x-5">
        <UpdateModal
          id={_id}
          title={title}
          description={description}
          priority={priority as TPriority}
        />
        <Button className="bg-red-500 px-2" onClick={() => handleDelete(_id)}>
          {/* Trash */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default TodoCard;
