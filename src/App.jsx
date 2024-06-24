
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ROUTES } from './routes'

function App() {
  const router = createBrowserRouter(ROUTES)

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
