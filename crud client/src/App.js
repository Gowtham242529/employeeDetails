import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Router,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import AddEmployees from "./pages/AddEmployees";
import UpdateEmployees from "./pages/UpdateEmployees";
import ViewEmployee from "./pages/ViewEmployee";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/addEmployee" element={<AddEmployees/>}/>
          <Route path="/updateEmployee/:id" element={<UpdateEmployees/>}/>
          <Route path="/viewEmployee/:id" element={<ViewEmployee/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
