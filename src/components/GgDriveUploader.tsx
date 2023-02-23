import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Button } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useStore } from 'zustand';
import useThemeStore from '../states/useThemeStore';

export const CLIENT_ID = '70816812996-rouhd80qba9vvbu00vn2pd7oab8tnkrc.apps.googleusercontent.com';
export const FOLDER_ID = '1yHmyPb1Mr57E31ua1H2zL2bhOp_BASeM';
export const SCOPE = 'https://www.googleapis.com/auth/drive';

export function GoogleLoginButton() {
	const { setUser, user }: any = useStore(useThemeStore);
	const login = useGoogleLogin({
		scope: SCOPE,
		onSuccess: (tokenResponse) => {
			setUser(tokenResponse);
			console.log(user);
		},
	});
	return (
		<div>
			;<Button onClick={() => login()}>Login</Button>
		</div>
	);
}

export function GoogleLogoutButton() {
	const { setUser }: any = useStore(useThemeStore);
	const handleLogout = () => {
		googleLogout();
		setUser({});
	};
	return (
		<div>
			<Button onClick={handleLogout}>Logout</Button>
		</div>
	);
}

export function GoogleImageUploadButton() {
	const { user }: any = useStore(useThemeStore);
	const [file, setFile] = useState<any>(null);
	const [image, setImage] = useState<any>(
		'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ocean-quotes-index-1624414741.jpg',
	);
	let accessToken = user?.access_token;

	const handleOnClick = async () => {
		const url = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
		const boundary = 'foo_bar_baz';
		const metadata = {
			name: file.name,
			mimeType: file.type,
			parents: ['1mcNtQmCNT8cPqc1z7D9IgaDm5rdJSfAh'],
		};

		const body = new FormData();
		body.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
		body.append('file', file);

		const headers = {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': `multipart/related; boundary=${boundary}`,
		};

		console.log(headers);

		const config = {
			headers,
			onUploadProgress: (progressEvent: any) => {
				console.log(progressEvent);
				const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
				console.log(percentCompleted);
			},
		};

		const response = await axios.post(url, body, config);
		setImage(`https://drive.google.com/uc?export=view&id=${response.data.id}`);
	};
	const handleOnChange = (e: any) => {
		setFile(e.target.files[0]);
	};
	return (
		<div>
			<input type="file" name="file" onChange={handleOnChange} />
			<Button onClick={handleOnClick}>Upload Image</Button>
			<img src={image} alt="" />
		</div>
	);
}
