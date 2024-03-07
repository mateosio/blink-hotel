import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from "react-router-dom";
import Root from "./components/Root.jsx";
import Home from "./components/Home.jsx";
import Rooms from "./components/Rooms.jsx";
import Detail from "./components/Detail.jsx";



const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root/>}>
    <Route path="/" element={<Home/>}/>
    <Route path="/rooms" element={<Rooms/>}/>
    <Route path="/rooms/:detail" element={<Detail/>} />
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
