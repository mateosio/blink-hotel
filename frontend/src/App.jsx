import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import Root from "./components/Root.jsx";
import Home from "./components/Home.jsx";
import Rooms from "./components/Rooms.jsx";



const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root/>}>
    <Route path="/" element={<Home/>}/>
    <Route path="/rooms" element={<Rooms/>}/>
  </Route>
))


function App() {
 return (
    <>
    <RouterProvider router={router}/>
    </> 
  )
}

export default App
