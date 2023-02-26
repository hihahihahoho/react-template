import { Button, Form, Input, Modal, Select } from 'antd';
// import { gapi } from 'gapi-script';
import produce from 'immer';
import { useState } from 'react';
import { useStore } from 'zustand';
import MyFormItem from '../../components/forms/MyFormItem';
import {
	GoogleImageUploadButton,
	GoogleImageUploadImage,
	GoogleLoginButton,
	GoogleLogoutButton,
} from '../../components/GgDriveUploader';
import useThemeStore from '../../states/useThemeStore';
const { TextArea } = Input;

const onFinish = (values: any) => {
	console.log('Success:', values);
};

const Home: React.FC = () => {
	const { setTheme, theme, mode, toggleMode }: any = useStore(useThemeStore);
	const handleClickMode = () => toggleMode('dark');
	const handleClickThemeDefault = () => setTheme('');
	const handleClickThemeVietcombank = () => setTheme('vietcombank');
	// const [data, setData] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [tree, setTree] = useState<any>({
		forest: {
			contains: {
				a: 'bear',
			},
			weather: {
				isRaining: true,
			},
		},
	});

	const handleClickTree = () => {
		setTree(
			produce((draft: any) => {
				draft.forest.weather.isRaining = !draft.forest.weather.isRaining;
			}),
		);
	};

	const handleButtonModalClick = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	// console.log(data);
	return (
		<>
			<GoogleLoginButton />
			<GoogleLogoutButton />
			<GoogleImageUploadButton />
			<GoogleImageUploadButton />
			<GoogleImageUploadImage />
			<div className={`box bg-boxColor p-8 rounded-xl ${mode} ${theme}`}>
				<Button onClick={handleClickMode}>{mode} mode</Button>
				<Button onClick={handleClickThemeDefault}>Default theme</Button>
				<Button onClick={handleClickThemeVietcombank}>Vietcombank theme</Button>
				<Button onClick={handleClickTree}>Test tree</Button>
				<Button onClick={handleButtonModalClick}>Modal Open</Button>

				<Form layout="vertical" onFinish={onFinish}>
					<MyFormItem
						label="Field A"
						tooltip="This is a required field"
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input></Input>
					</MyFormItem>
					<MyFormItem
						label="Field A"
						tooltip="This is a required field"
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<TextArea autoSize></TextArea>
					</MyFormItem>
					<MyFormItem
						label="Field B"
						tooltip="This is a required field"
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Select
							showSearch
							mode="multiple"
							options={[
								{
									value: 'lucy',
									label: 'Lucy',
								},
								{
									value: 'dan',
									label: 'Dan',
								},
								{
									value: 'tom',
									label: 'Tom',
								},
							]}
						/>
					</MyFormItem>
					<MyFormItem
						label="Field B"
						tooltip="This is a required field"
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Select
							showSearch
							options={[
								{
									value: 'lucy',
									label: 'Lucy',
								},
								{
									value: 'dan',
									label: 'Dan',
								},
								{
									value: 'tom',
									label: 'Tom',
								},
							]}
						/>
					</MyFormItem>
					<Form.Item>
						<Button type="primary" htmlType="submit" className="">
							Submit
						</Button>
					</Form.Item>
				</Form>
			</div>
			<Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel}>
				<Form layout="vertical">
					<MyFormItem label="focus input">
						<Input ref={(input) => input && input.focus()}></Input>
					</MyFormItem>
				</Form>
			</Modal>
		</>
	);
};

export default Home;
