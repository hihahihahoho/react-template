import { Button, Form, Input, Select } from 'antd';
import { useState } from 'react';
import MyFormItem from '../../components/forms/MyFormItem';
const { TextArea } = Input;
const defaultTheme = require('tailwindcss/defaultTheme');

const onFinish = (values: any) => {
	console.log('Success:', values);
};

console.log(defaultTheme.colors);

const Home: React.FC = () => {
	const [theme, setTheme] = useState('');
	const handleClick = () => {
		setTheme(theme === 'dark' ? '' : 'dark');
	};
	return (
		<>
			<div className={`box bg-boxColor p-8 rounded-xl ${theme}`}>
				<Button onClick={handleClick}>Change Theme</Button>

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
							<span className="text-primary">Submit</span>
						</Button>
					</Form.Item>
				</Form>
			</div>
		</>
	);
};

export default Home;
