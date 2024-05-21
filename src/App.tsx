import { AppBar, Container, Toolbar, Stack, Typography, TextField, Button } from "@mui/material"
import TodoItem from "./components/TodoItem"
import { useEffect, useState } from "react"
import { getTodos, saveTodos } from "./utils/features";

function App() {

  const [todos, setTodos] = useState<TodoItemType[]>(getTodos())
  const [title, setTitle] = useState<TodoItemType['title']>('')

  const completeHandler = (id: TodoItemType['id']): void => { 
    const newTodo: TodoItemType[] = todos.map((i)=>{
      if(i.id===id) i.isCompleted = !i.isCompleted
      return i;
    })
    setTodos(newTodo)
  }
  const editHandler = (
    id: TodoItemType["id"],
    newTitle: TodoItemType["title"]
  ): void => {
    const newTodos: TodoItemType[] = todos.map((i) => {
      if (i.id === id) i.title = newTitle;
      return i;
    });

    setTodos(newTodos);
  };
  const deleteHandler = (id: TodoItemType['id']): void => { 
    const newTodo: TodoItemType[] = todos.filter((i)=>i.id !==id )
    setTodos(newTodo)
   }

  const submitHandler = (): void => {
    const newTodo: TodoItemType = {
      title,
      isCompleted: false,
      id: String(Math.random() * 1000)
    };
    setTodos(prev => ([...prev, newTodo]))
    setTitle("")
    
  }

  useEffect(()=>{
    saveTodos(todos)
  },[todos])

  return (
    <Container maxWidth="sm" sx={{ height: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography>TODO APP USING REACT AND TYPESCRIPT</Typography>
        </Toolbar>
      </AppBar>
      <Stack height={'80%'} direction={'column'} spacing={'1rem'} p={'1rem'}>
        {todos.map((i) => (
          <TodoItem editHandler={editHandler} deleteHandler={deleteHandler} completeHandler={completeHandler} key={i.id} todo={i} />
        ))
        }
      </Stack>
      <TextField onKeyDown={(e)=>{
        if(e.key==='Enter' && title !== "") submitHandler()
      }} value={title} onChange={(e) => setTitle(e.target.value)} fullWidth label={'New Task'} />
      <Button sx={{ margin: "1rem 0" }} onClick={submitHandler}
      disabled={title===""} fullWidth variant="contained">Add</Button>
    </Container>
  )
}

export default App
