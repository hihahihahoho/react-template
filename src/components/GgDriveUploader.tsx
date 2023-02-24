import { LoadingOutlined } from '@ant-design/icons';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Button, Col, Image, Row } from 'antd';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Resizer from 'react-image-file-resizer';
import { useStore } from 'zustand';
import useThemeStore from '../states/useThemeStore';
import { uriToFile } from '../utils/utils';

export const FOLDER_ID = '1yHmyPb1Mr57E31ua1H2zL2bhOp_BASeM';
export const SCOPE = 'https://www.googleapis.com/auth/drive.file';

const resizeFile = (file: any) =>
	new Promise((resolve) => {
		Resizer.imageFileResizer(
			file,
			750,
			5000,
			'JPEG',
			80,
			0,
			(uri) => {
				resolve(uri);
			},
			'base64',
		);
	});

export function GoogleLoginButton() {
	const { setUser, user }: any = useStore(useThemeStore);
	const onSuccess = async (tokenResponse: any) => {
		try {
			const dataUser = await axios.get('https://openidconnect.googleapis.com/v1/userinfo', {
				params: {
					access_token: tokenResponse?.access_token,
				},
			});

			tokenResponse.data = dataUser.data;
			setUser(tokenResponse);
			console.log(tokenResponse);
		} catch (error) {
			console.error(error);
		}
	};

	const login = useGoogleLogin({
		scope: SCOPE,
		onSuccess,
	});
	return (
		<>
			{user ? (
				<div className="rounded-md p-2 max-w-xs">
					<Row align={'middle'} gutter={12}>
						<Col>
							<div className="w-9 h-9 rounded-full overflow-hidden isolate">
								<img src={user?.data?.picture} alt="" referrerPolicy="no-referrer" className="w-full" />
							</div>
						</Col>
						<Col>
							{user?.data?.name || ''} <br />
							{user?.data?.email || ''}
						</Col>
					</Row>
				</div>
			) : (
				<>
					<Button onClick={() => login()}>Login</Button>
				</>
			)}
		</>
	);
}

export function GoogleLogoutButton() {
	const { setUser }: any = useStore(useThemeStore);
	const handleLogout = () => {
		googleLogout();
		setUser(null);
	};
	return (
		<div>
			<Button onClick={handleLogout}>Logout</Button>
		</div>
	);
}

export function GoogleImageUpload({ file, accessToken }: { file: File; accessToken: string }) {
	const [imageState, setImageState] = useState<string | null>(null);

	const url = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
	const boundary = 'foo_bar_baz';

	const headers = {
		Authorization: `Bearer ${accessToken}`,
		'Content-Type': `multipart/related; boundary=${boundary}`,
	};

	const config = {
		headers,
		onUploadProgress: (progressEvent: any) => {
			console.log(progressEvent);
			const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
			console.log(percentCompleted);
		},
	};

	const metadata = {
		name: file.name,
		mimeType: file.type,
		parents: ['1mcNtQmCNT8cPqc1z7D9IgaDm5rdJSfAh'],
	};

	const uploadImage = async (resizedImageFile: File) => {
		try {
			setImageState('uploading');

			const body = new FormData();
			body.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
			body.append('file', resizedImageFile);

			const response = await axios.post(url, body, config);
			const uploadedImage = `https://drive.google.com/uc?export=view&id=${response.data.id}`;
			setImageState(uploadedImage);
		} catch (error) {
			console.log(error);
			setImageState('error');
		}
	};

	const handleResizeComplete = async (file: any) => {
		setImageState('optimizing');
		const resizedImageUri: any = await resizeFile(file);
		const resizedImageFile = uriToFile(resizedImageUri, file.name);
		await uploadImage(resizedImageFile);
	};

	useEffect(() => {
		handleResizeComplete(file);
	}, []);

	return (
		<>
			<div className="aspect-square rounded-lg overflow-hidden isolate">
				<div className="w-full h-full flex justify-center items-center bg-white">
					{imageState === 'optimizing' || imageState === 'uploading' ? (
						<div>
							<LoadingOutlined style={{ fontSize: 24 }} spin />
							<span className="mt-4">{imageState}</span>
						</div>
					) : (
						<Image
							src={imageState || 'https://via.placeholder.com/150'}
							alt=""
							placeholder={
								<div>
									<LoadingOutlined style={{ fontSize: 24 }} spin />
									<span className="mt-4">Loading Image</span>
								</div>
							}
							referrerPolicy="no-referrer"
							className="w-full h-full object-cover"
						/>
					)}
				</div>
			</div>
		</>
	);
}

export function GoogleImageUploadButton() {
	const [files, setFiles] = useState<any>(null);
	const inputRef = useRef<any>(null);
	const { user }: any = useStore(useThemeStore);
	let accessToken = user?.access_token;

	const handleOnClick = () => {
		const filesUpload = Array.from(inputRef.current.files);
		setFiles(filesUpload);
	};

	return (
		<>
			<input type="file" name="file" multiple ref={inputRef} />
			<Button onClick={handleOnClick}>Upload Image</Button>
			<div className="grid grid-cols-4 gap-4">
				{files &&
					files.map((file: any, index: any) => <GoogleImageUpload key={index} file={file} accessToken={accessToken} />)}
			</div>
		</>
	);
}
