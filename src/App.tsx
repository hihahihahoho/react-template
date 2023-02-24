import { GoogleOAuthProvider } from '@react-oauth/google';
import { Suspense } from 'react';
import './App.css';
import RenderRouter from './routes/RenderRouter';

function App() {
	return (
		<GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID || ''}>
			<Suspense fallback={<h1>Loading ...</h1>}>
				<RenderRouter></RenderRouter>
			</Suspense>
		</GoogleOAuthProvider>
	);
}

export default App;
