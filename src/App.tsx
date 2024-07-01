import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../dist/output.css';
import Home from './Component/Home';
import Question from './Component/Question';
import Result from './Component/Result';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/question" element={<Question />}></Route>
					<Route path="/result" element={<Result />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
