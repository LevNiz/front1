import { RouterProvider } from "react-router-dom"
import { router } from "./routes/router"

function App() {
  return (
    <RouterProvider name='Alex' router={router} />
  )
}

export default App
