import { Suspense } from 'react';
import './App.css';
import RenderRouter from './routes/RenderRouter';

function App() {
	return (
		<Suspense fallback={<h1>Loading ...</h1>}>
			<RenderRouter></RenderRouter>
		</Suspense>
	);
}

export default App;
