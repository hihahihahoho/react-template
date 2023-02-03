import { Button, Form, Input, Select } from 'antd';
import MyFormItem from '../../components/forms/MyFormItem';
const { TextArea } = Input;

const onFinish = (values: any) => {
	console.log('Success:', values);
};

const Home: React.FC = () => {
	return (
		<>
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
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default Home;
