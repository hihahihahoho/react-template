import { Button, Form, Input, Select } from 'antd';
import MyFormItem from '../../components/forms/MyFormItem';

const onFinish = (values: any) => {
	console.log('Success:', values);
};

const Home: React.FC = () => {
	return (
		<>
			<Form layout="vertical" onFinish={onFinish}>
				<Form.Item
					label="Field A"
					name="Field A"
					tooltip="This is a required field"
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input></Input>
				</Form.Item>
				<MyFormItem
					label="Field B"
					name="Field B"
					tooltip="This is a required field"
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Select
						placeholder="abc"
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
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default Home;
