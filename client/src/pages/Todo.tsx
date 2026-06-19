import TodoContainer from "@/components/todo/TodoContainer";
import Container from "@/components/ui/Container";
import { Toaster } from "sonner";

export const Todo = () => {
  return (
    <Container>
      <h1 className="text-center text-3xl font-semibold my-8">My todos</h1>
      <TodoContainer />
      <Toaster />
    </Container>
  );
};
