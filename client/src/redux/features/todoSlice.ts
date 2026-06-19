// import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TTodo = {
    _id?: string;
    title: string;
    description: string;
    isCompleted?: boolean;
    priority: TPriority;
}
export type TPriority = "high" | "medium" | "low";

// const initialState: { todos: TTodo[] } = {
//     todos: []
// }

// const todoSlice = createSlice({
//     name: 'todo',
//     initialState,
//     reducers: {
//         addTodo: (state, action: PayloadAction<TTodo>) => {
//             state.todos.push({ ...action.payload });
//         },
//         deleteTodo: (state, action: PayloadAction<string>) => {
//             state.todos = state.todos.filter(item => item._id !== action.payload)
//         },
//         toggleTodo: (state, action) => {
//             const todo = state.todos.find(item => item._id === action.payload)
//             todo!.isCompleted = !todo?.isCompleted;
//         },
//         updateTodo: (state, action) => {
//             const rest = state.todos.filter(item => item._id !== action.payload._id);
//             const todo = state.todos.find(item => item._id === action.payload._id)
//             const updatedTask = {
//                 id: action.payload._id,
//                 title: action.payload.title || todo!.title,
//                 description: action.payload.description || todo!.description,
//                 priority: action.payload.priority || todo!.priority,
//                 isCompleted: todo!.isCompleted
//             }
//             state.todos = [...rest, updatedTask]
//         }
//     }
// });

// export const { addTodo, deleteTodo, toggleTodo, updateTodo } = todoSlice.actions;

// export default todoSlice.reducer;