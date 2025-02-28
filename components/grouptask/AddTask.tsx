import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  AlertCircle,
  Calendar as CalendarIcon,
  Plus,
  Trash,
} from "lucide-react";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createTask } from "@/lib/actions/action";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface AddTaskDialogProps {
  groupId?: string;
}

const formSchema = z.object({
  task: z.string().min(1, "Task name is required"),
  description: z.string().optional(),
  date: z.date().nullable(),
  priority: z.enum(["low", "medium", "high", "urgent", "none"]),
  subtasks: z.array(
    z.object({
      name: z.string().min(1, "Subtask cannot be empty"),
    })
  ),
});

export function AddTaskDialog({ groupId }: AddTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(createTask, {});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: "",
      description: "",
      date: null,
      priority: "medium",
      subtasks: [],
    },
  });

  // Setup field array for subtasks
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subtasks",
  });

  useEffect(() => {
    if (state?.success) {
      form.reset();
      setOpen(false);
    }
  }, [state, form]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Transform the data to match your API requirements
    const formData = new FormData();

    formData.append("task", data.task);
    if (data.description) {
      formData.append("description", data.description);
    }
    if (data.date) {
      formData.append("date", data.date.toISOString());
    }
    formData.append("priority", data.priority);

    // Add subtasks
    data.subtasks.forEach((subtask, index) => {
      formData.append(`subtasks[${index}]`, subtask.name);
    });

    if (groupId) {
      formData.append("group_id", groupId);
    }

    // Submit the form
    startTransition(() => {
      formAction(formData);
    });
  };

  const handleAddSubtask = () => {
    if (fields.length < 10) {
      append({ name: "" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full md:w-auto bg-primary hover:bg-primary/90 transition-colors">
          <Plus className="mr-2 size-4" />
          Add Task
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[95%] sm:max-w-lg shadow-xl rounded-lg p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl font-semibold">
            Create New Task
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 mt-2"
          >
            {/* Task Name */}
            <FormField
              control={form.control}
              name="task"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Task Name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="What needs to be done?"
                      aria-label="Task name"
                      autoComplete="off"
                      className="text-sm md:text-base focus-visible:ring-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Task Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add details about this task..."
                      rows={3}
                      aria-label="Task description"
                      className="text-sm md:text-base resize-none focus-visible:ring-primary"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Due Date & Priority Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Due Date Picker */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Due Date
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value || undefined}
                          onSelect={field.onChange}
                          initialFocus
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              {/* Priority Selector */}
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium">
                      Priority
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="w-full"
                          aria-label="Task priority"
                        >
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none" className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-gray-400 mr-2"></div>
                          None
                        </SelectItem>
                        <SelectItem value="low" className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-blue-400 mr-2"></div>
                          Low
                        </SelectItem>
                        <SelectItem
                          value="medium"
                          className="flex items-center"
                        >
                          <div className="h-2 w-2 rounded-full bg-yellow-400 mr-2"></div>
                          Medium
                        </SelectItem>
                        <SelectItem value="high" className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                          High
                        </SelectItem>
                        <SelectItem
                          value="urgent"
                          className="flex items-center"
                        >
                          <div className="h-2 w-2 rounded-full bg-purple-600 mr-2"></div>
                          Urgent
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            {/* Subtasks Section */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium">Subtasks</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddSubtask}
                  disabled={fields.length >= 10}
                  className={cn(
                    "text-xs px-2 py-1 h-auto",
                    fields.length >= 10 && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Plus className="mr-1 h-3 w-3" /> Add
                </Button>
              </div>

              <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
                {fields.length === 0 && (
                  <p className="text-sm text-muted-foreground italic">
                    No subtasks added yet
                  </p>
                )}

                {fields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`subtasks.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input
                              {...field}
                              placeholder={`Subtask ${index + 1}`}
                              aria-label={`Subtask ${index + 1}`}
                              className="text-sm"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => remove(index)}
                              className="h-8 w-8 opacity-70 hover:opacity-100 hover:bg-destructive/10"
                            >
                              <Trash className="h-4 w-4 text-destructive" />
                              <span className="sr-only">Remove subtask</span>
                            </Button>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              {fields.length >= 10 && (
                <p className="text-xs text-muted-foreground">
                  Maximum of 10 subtasks allowed
                </p>
              )}
            </div>

            {state?.error && (
              <Alert variant="destructive" className="text-sm">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}

            <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto order-2 sm:order-1"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="w-full sm:w-auto order-1 sm:order-2"
              >
                {isPending ? "Creating..." : "Create Task"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
