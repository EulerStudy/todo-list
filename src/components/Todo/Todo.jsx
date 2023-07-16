import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import styles from './Todo.module.css'

export default function Todo({ todo, onUpdate, onDelete }) {
  const { id, text, status } = todo
  
  const handleChange = (event) => {
    const status = event.target.checked ? 'complete' : 'active'
    onUpdate({...todo, status})
  }

  const handleDelete = () => {
    onDelete(todo)  
  }

  return (
    <li className={styles.todo}>
      <input 
        className={styles.checkbox}
        type='checkbox' 
        id={id} 
        checked={ status === 'complete' } 
        onChange={ handleChange }
      />
      <label htmlFor={id} className={styles.text}>{text}</label>
      <span className={styles.icon}>
        <button onClick={handleDelete} className={styles.button}>
          <FaTrashAlt />
        </button>
      </span>
    </li>
  )
}
