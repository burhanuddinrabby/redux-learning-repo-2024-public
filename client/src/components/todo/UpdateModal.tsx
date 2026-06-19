import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
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
import { Field, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState, type SubmitEvent } from "react";
import { type TPriority } from "@/redux/features/todoSlice";
import { useUpdateTodoIntoDBMutation } from "@/redux/api/api";

const UpdateModal = ({
  id,
  title,
  description: des,
  priority: pri,
}: {
  id: string,
  title: string;
  description: string;
  priority: TPriority;
}) => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  const [updateTodo] = useUpdateTodoIntoDBMutation();

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const taskDetails = {
      title: task,
      description,
      priority: priority ? priority : pri,
    };
    setPriority("");
    updateTodo({id, ...taskDetails});
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#5c53fe] px-2 cursor-pointer">
          {/* Edit */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Update task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <Label htmlFor="task">Task</Label>
              <Input
                id="task"
                name="task"
                placeholder="Task name"
                defaultValue={title}
                onBlur={(e) => setTask(e.target.value)}
              />
            </Field>
            <Field>
              <Label htmlFor="priority">Priority</Label>
              <Select
                defaultValue={pri ? pri : ""}
                onValueChange={(e: TPriority) => setPriority(e)}
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
                defaultValue={des}
                onBlur={(e) => setDescription(e.target.value)}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateModal;
