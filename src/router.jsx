import { createBrowserRouter } from "react-router-dom";
import Aboutus from "./components/Aboutus";
import App from "./App";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import MedicinePage from "./components/MedicinePage";

const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'aboutus', element: <Aboutus/> },
    {path: 'register', element:<Register/>},
    {path:'login', element:<Login/>},
    {path:'medicinepage', element:<MedicinePage/>}
]);

export default router;