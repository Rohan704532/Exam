import Home from "./pages/Home/Home";
import {
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom"
import Data from "./components/data";


function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/data" element={<Data/>}/>
			</Routes>
		</Router>
	);
}


export default App;