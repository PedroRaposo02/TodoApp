import { Button, Group, Modal, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useEffect, useState } from "react";
import { KeyedMutator } from "swr";
import { ENDPOINT, Todo } from "../App";

function AddTodo({ mutate, data }: { mutate: KeyedMutator<Todo[]>, data: Todo[] | undefined }) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    initialValues: {
      title: "",
      body: "",
    },
  });

  const createTodo = async () => {
    const updated = (await axios.post(`${ENDPOINT}/api/todos`, form.values)).data;

    mutate([...data!, updated], false);
    
    form.reset();
    setOpen(false);
  };

  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)} title="Create Todo">
        <form onSubmit={form.onSubmit(createTodo)}>
          <TextInput
            required
            mb={12}
            label="Title"
            placeholder="What do you want to do?"
            {...form.getInputProps("title")}
          />
          <Textarea
            required
            mb={12}
            label="Body"
            placeholder="Tell me more..."
            {...form.getInputProps("body")}
          />

          <Button type="submit">Create Todo</Button>
        </form>
      </Modal>

      <Group>
        <Button fullWidth mb={10} onClick={() => setOpen(true)}>
          Add Todo
        </Button>
      </Group>
    </>
  );
}

export default AddTodo;
