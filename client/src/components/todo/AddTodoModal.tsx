import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "../ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { useState, type SubmitEvent } from "react";
import {
  type TPriority,
  type TTodo,
} from "@/redux/features/todoSlice";
import { useAddTodoIntoDBMutation } from "@/redux/api/api";
import { toast } from "sonner";

const AddTodoModal = () => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");


  const [addTodoIntoDB, { data, isLoading, isError, isSuccess }] =
    useAddTodoIntoDBMutation();

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const taskDetails: TTodo = {
      title: task,
      description,
      isCompleted: false,
      priority: priority as TPriority,
    };
    addTodoIntoDB(taskDetails);
    if (isSuccess) {
      console.log({ data, isLoading, isError, isSuccess });
      toast.success("Task added", {
        position: "top-right",
        richColors: true,
        closeButton: true,
      });
      setPriority("medium");
    }
    // dispatch(addTodo(taskDetails));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary-gradient text-lg font-semibold p-5 hover:bg-reverse-primary-gradient cursor-pointer">
          Add Todo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
          <DialogDescription>
            Add your task that you want to finish
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <Label htmlFor="task">Task</Label>
              <Input
                id="task"
                name="task"
                placeholder="Task name"
                onBlur={(e) => setTask(e.target.value)}
              />
            </Field>
            <Field>
              <Label htmlFor="priority">Priority</Label>
              <Select
                defaultValue="medium"
                onValueChange={(value: TPriority) => setPriority(value)}
              >
                <SelectTrigger className="w-full ">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Priority</SelectLabel>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Type your description here."
                onBlur={(e) => setDescription(e.target.value)}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Add</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoModal;
