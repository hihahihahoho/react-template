import { GoogleOAuthProvider } from '@react-oauth/google';
import { Suspense } from 'react';
import './App.css';
import RenderRouter from './routes/RenderRouter';

export const CLIENT_ID = '70816812996-rouhd80qba9vvbu00vn2pd7oab8tnkrc.apps.googleusercontent.com';
export const API_KEY = 'AIzaSyDZ0UhrwW13scAgcHCIIvQCatIBOHF8Y_o';
export const FOLDER_ID = '1yHmyPb1Mr57E31ua1H2zL2bhOp_BASeM';
export const SCOPE = 'https://www.googleapis.com/auth/drive';

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
