import { Form } from 'antd';
import MyInput from '../../components/forms/MyInput';
import MySelect from '../../components/forms/MySelect';

const Home: React.FC = () => {
	return (
		<>
			<Form layout="vertical">
				<Form.Item label="Field A" required tooltip="This is a required field">
					<MyInput placeholder="abc"></MyInput>
				</Form.Item>
				<Form.Item label="Field A" required tooltip="This is a required field">
					<MySelect
						placeholder="abc"
						options={[
							{
								value: 'lucy',
								label: 'Lucy',
							},
						]}
					/>
				</Form.Item>
			</Form>
		</>
	);
};

export default Home;
