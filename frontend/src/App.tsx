import { useState } from 'react';
import { Button, ChakraProvider } from '@chakra-ui/react';
import axios from 'axios';

import theme from './theme/theme';
import { Todo } from './Todo';

type TodoType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default function App(): JSX.Element {
  const [todos, setTodos] = useState<Array<TodoType>>([]);

  const onClickFetchData = () => {
    axios
      .get<Array<TodoType>>('https://jsonplaceholder.typicode.com/todos')
      .then((res) => {
        setTodos(res.data);
      });
  };
  return (
    <ChakraProvider theme={theme}>
      <Button colorScheme="teal" onClick={onClickFetchData}>
        ボタン
      </Button>
      {todos.map((todo, i: number) => (
        <Todo
          key={todo.id}
          title={todo.title}
          userId={todo.userId}
          completed={todo.completed}
        />
      ))}
    </ChakraProvider>
  );
}
