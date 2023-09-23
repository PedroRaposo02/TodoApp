import { Box } from "@mantine/core";
import "@mantine/core/styles.css";
import useSwr from "swr";
import axios from "axios";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

export const ENDPOINT = "http://localhost:3000";

export interface Todo {
  id: number;
  title: string;
  body: string;
  done: boolean;
}

const fetcher = (url: string) =>
  axios.get(`${ENDPOINT}/${url}`).then((res) => res.data);

function App() {
  const { data, mutate } = useSwr<Todo[]>("api/todos", fetcher);

  return (
    <Box
      p="2rem"
      w="100%"
      maw="40rem"
      m="0 auto"
    >
      <TodoList data={data} mutate={mutate} />
      <AddTodo mutate={mutate} data={data} />
    </Box>
  );
}

export default App;
