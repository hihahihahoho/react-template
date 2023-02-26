import { LoadingOutlined } from '@ant-design/icons';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Button, Col, Row } from 'antd';
import axios from 'axios';
import { useCallback, useEffect, useRef } from 'react';
import Resizer from 'react-image-file-resizer';
import { useStore } from 'zustand';
import { useImageUploadStateStore } from '../states/useAllstores';
import useAuthStore from '../states/useAuthStore';
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
	const { setUser, user }: any = useStore(useAuthStore);
	const checkUser = async () => {
		if (user) {
			try {
				const dataUser = await axios.get(
					`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${user?.access_token}`,
				);
				setUser(user);
			} catch (error) {
				setUser(null);
			}
		} else {
			setUser(null);
		}
	};
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

	useEffect(() => {
		checkUser();
	}, [user]);

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
	const { setUser, user }: any = useStore(useAuthStore);
	const handleLogout = () => {
		googleLogout();
		setUser(null);
	};
	return <>{user && <Button onClick={handleLogout}>Logout</Button>}</>;
}

export function GoogleImageUploadButton() {
	const { user }: any = useStore(useAuthStore);
	const inputRef = useRef<any>(null);
	const { filesStates, createFile, updateFileState, updateFileUrl, updateFileID }: any =
		useStore(useImageUploadStateStore);

	let accessToken = user?.access_token;

	const handleOnChange = useCallback(async () => {
		const files = Array.from(inputRef.current.files);

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

		const promises = files.map(async (file: any) => {
			const metadata = {
				name: file.name,
				mimeType: file.type,
				parents: ['1mcNtQmCNT8cPqc1z7D9IgaDm5rdJSfAh'],
			};

			if (!filesStates[file.name]) {
				createFile(file.name);
			}
			updateFileState(file.name, 'optimizing image');

			const resizedImageUri: any = await resizeFile(file);
			const resizedImageFile = uriToFile(resizedImageUri, file.name);
			updateFileUrl(file.name, resizedImageUri);

			const body = new FormData();
			body.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
			body.append('file', resizedImageFile);

			// Use Immer to update the imageStates object

			try {
				// let uploadedImage = '';
				let uploadedImageId = '';
				if (filesStates[file.name]?.id) {
					updateFileState(file.name, 'updating image');
					const response = await axios.patch(
						`https://www.googleapis.com/upload/drive/v3/files/${filesStates[file.name].id}?uploadType=media`,
						resizedImageFile,
						{
							headers: {
								Authorization: `Bearer ${accessToken}`,
								'Content-Type': file.type,
							},
							onUploadProgress: (progressEvent: any) => {
								console.log(progressEvent);
								const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
								console.log(percentCompleted);
							},
						},
					);
					// await axios.patch(
					// 	`https://www.googleapis.com/drive/v3/files/${imageStates[file.name].id}`,
					// 	{ modifiedTime: new Date().toISOString() },
					// 	{
					// 		headers: {
					// 			Authorization: `Bearer ${accessToken}`,
					// 			'Content-Type': 'application/json',
					// 		},
					// 	},
					// );
					// uploadedImage = `https://drive.google.com/uc?export=view&id=${response.data.id}`;
					uploadedImageId = response.data.id;
				} else {
					updateFileState(file.name, 'uploading');
					const response = await axios.post(url, body, config);
					// uploadedImage = `https://drive.google.com/uc?export=view&id=${response.data.id}`;
					uploadedImageId = response.data.id;
				}

				// Use Immer to update the imageStates object
				updateFileState(file.name, 'success');
				updateFileID(file.name, uploadedImageId);
			} catch (error) {
				console.log(error);
				updateFileState(file.name, 'error');
			}
		});

		await Promise.all(promises);
	}, [accessToken, filesStates, createFile, updateFileState, updateFileUrl, updateFileID]);

	return (
		<div>
			<label className="w-full h-52 flex items-center justify-center relative">
				<input type="file" name="file" onChange={handleOnChange} multiple className="" ref={inputRef} />
			</label>
			{/* <Button onClick={handleOnClick}>Upload Images</Button> */}
		</div>
	);
}

export function GoogleImageUploadImage() {
	const { filesStates }: any = useStore(useImageUploadStateStore);

	return (
		<div className="grid grid-cols-5 gap-5">
			{Object.keys(filesStates).map((filename: string) => {
				const { state: imageState, url: imageUrl } = filesStates[filename];
				return (
					<div
						key={filename}
						className="aspect-square isolate rounded-lg bg-white flex items-center justify-center text-center relative overflow-hidden"
					>
						{(imageState === 'optimizing' ||
							imageState === 'uploading' ||
							imageState === 'error' ||
							imageState === 'updating image' ||
							imageState === 'optimizing image') && (
							<div className="absolute w-full h-full bg-black/70 z-10 text-white flex items-center justify-center text-center">
								<div>
									<LoadingOutlined style={{ fontSize: 24 }} spin />
									<div className="mt-4">{imageState}</div>
								</div>
							</div>
						)}
						<div className="w-full h-full">
							<img
								src={imageUrl}
								alt=""
								// placeholder={
								// 	<div>
								// 		<LoadingOutlined style={{ fontSize: 24 }} spin />
								// 		<div className="mt-4">Loading Image</div>
								// 	</div>
								// }
								referrerPolicy="no-referrer"
								className="w-full h-full object-cover"
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
}
