import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import Home from "./components/Home.jsx";



const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Home/>}/>
))


function App() {
 

  return (
    <>
    <RouterProvider router={router}/>
    </> 
  )
}

export default App
