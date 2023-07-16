import React, { useEffect, useState } from 'react'
import AddTodo from '../AddTodo/AddTodo'
import Todo from '../Todo/Todo'
import styles from './TodoList.module.css'

export default function TodoList({filter}) {
  // 컴포턴트가 마운트 될 때 딱 한번만 호출하려면 useState에 콜백 함수로 전달해야 한다.
  const [todos, setTodos] = useState(() => readTodosFromLocalStorage())
  
  const handleAdd = (todo) => {
    // 새로운 투두를 todos에 업데이트 해야 함
    console.log(todo)
    setTodos([...todos, todo])
  }

  const handleUpdate = (updated) => {
    setTodos(todos.map((todo) => (todo.id === updated.id ? updated : todo)))
  }

  const handleDelete = (deleted) => {
    setTodos(todos.filter((todo)=>(todo.id !== deleted.id)))
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const filtered = getFilteredItem(todos, filter)

  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {
          filtered.map((todo) => (
            <Todo key={todo.id} todo={todo} onUpdate={handleUpdate} onDelete={handleDelete}/>
          ))
        }
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  )
}

function getFilteredItem(todos, filter) {
  if(filter === 'all') {
    return todos
  }
  return todos.filter((todo) => todo.status === filter)
}

function readTodosFromLocalStorage() {
  const todos = localStorage.getItem('todos')
  return todos ? JSON.parse(todos) : []
}