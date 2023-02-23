import { GoogleOAuthProvider } from '@react-oauth/google';
import { Suspense } from 'react';
import './App.css';
import RenderRouter from './routes/RenderRouter';

export const CLIENT_ID = '70816812996-jdh084f0078r3g615ulf7djalm9a1m92.apps.googleusercontent.com';

function App() {
	return (
		<GoogleOAuthProvider clientId={CLIENT_ID}>
			<Suspense fallback={<h1>Loading ...</h1>}>
				<RenderRouter></RenderRouter>
			</Suspense>
		</GoogleOAuthProvider>
	);
}

export default App;
