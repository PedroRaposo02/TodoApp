import { Box, List } from "@mantine/core";
import { ENDPOINT, Todo } from "../App";
import axios from "axios";
import { KeyedMutator } from "swr";

const TodoList = ({
  data,
  mutate,
}: {
  data: Todo[] | undefined;
  mutate: KeyedMutator<Todo[]>;
}) => {
  const handleChange = async (todo : Todo) => {
    const updated = (
      await axios.patch(`${ENDPOINT}/api/todos/${todo.id}/done`)
    ).data;

    mutate(data?.map((t) => (t.id === todo.id ? updated : t)) ?? [], false);
  };
  return (
    <List spacing={"xs"} size="sm" mb={12} center>
      {data?.map((todo) => (
        <List.Item key={`todo_list__${todo.id}`} style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => handleChange(todo)}
          />
          <Box
            component="span"
            style={{
              textDecoration: todo.done ? "line-through" : "none",
              marginLeft: 10,
            }}
          >
            {todo.title}
          </Box>
        </List.Item>
      ))}
    </List>
  );
};

export default TodoList;
