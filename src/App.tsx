import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useAppDispatch, type RootState } from './store/store'
import { useSelector } from 'react-redux'
import { increment } from './store/slices/sliceExports'
import { Todo, fetchTodos } from './store/slices/todosSlice'

function App() {
  const count = useSelector((state: RootState) => state.counter.value)
  const { items, loading, error, errorMsg } = useSelector((state: RootState) => state.todo)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => dispatch(increment())}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        {loading ? (
          <div>Loading todos...</div>
        ) : error ? (
          <div>Error: {errorMsg}</div>
        ) : (
          items.map((todo: Todo) => {
            return (
              <div>{todo.title}</div>
            )
          })
        )
        }
      </div>
    </>
  )
}

export default App
