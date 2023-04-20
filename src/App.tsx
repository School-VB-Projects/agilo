import {RouterProvider} from "react-router-dom";
import {Router} from "./Router";

function App() {
    return <div className="app">
        <RouterProvider router={Router} />
    </div>;
}

export default App;
