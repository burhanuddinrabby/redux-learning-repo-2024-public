/* eslint-disable @typescript-eslint/no-unused-vars */
import AddTodoModal from "./AddTodoModal";
import TodoCard, { type TTodoCardProps } from "./TodoCard";
import TodoFilter from "./TodoFilter";
import type { TPriority, TTodo } from "@/redux/features/todoSlice";
import { useState } from "react";
import { useGetAllTodosQuery, useGetSingleTodoQuery } from "@/redux/api/api";

const priorityWeights: Record<TPriority, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export default function TodoContainer() {
  const [filterBy, setFilterBy] = useState("");

  //rtk query
  const { data, error, isLoading } = useGetAllTodosQuery(filterBy, {});
  const todos = data?.data;

  /* 
  todos = [...todos].sort((a: TTodo, b: TTodo) => {
    const aComp = a.isCompleted ?? false;
    const bComp = b.isCompleted ?? false;
    if (aComp !== bComp) {
      return Number(aComp) - Number(bComp);
    }

    const aMatchesFilter = a.priority === filterBy;
    const bMatchesFilter = b.priority === filterBy;
    if (aMatchesFilter !== bMatchesFilter) {
      return Number(bMatchesFilter) - Number(aMatchesFilter);
    }

    const aPri = priorityWeights[a.priority] ?? 0;
    const bPri = priorityWeights[b.priority] ?? 0;

    return bPri - aPri;
  }); 
  */

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) console.error(error);

  return (
    <div>
      <div className="flex justify-between mb-5">
        <AddTodoModal />
        <TodoFilter filterBy={filterBy} setFilterBy={setFilterBy} />
      </div>
      <div className="bg-primary-gradient w-full h-full rounded-xl p-1">
        <div className="bg-white p-5 w-full rounded-lg  space-y-4">
          {todos.length ? (
            todos.map((item: TTodoCardProps) => (
              <TodoCard
                key={item._id}
                // title={item.title}
                // description={item.description}
                // id={item.id}
                // isCompleted={item?.isCompleted}
                {...item}
              />
            ))
          ) : (
            <div className="bg-white text-red-500 text-2xl font-bold p-5 flex justify-center items-center rounded-md">
              <p>There is no task pending...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
