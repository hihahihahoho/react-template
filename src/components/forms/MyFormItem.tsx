import { Form, FormItemProps } from 'antd';
import StyledFormItem, { CustomFormItemProp } from './StyledFormItem';

interface Props extends FormItemProps {
	customStyle?: CustomFormItemProp;
}

export default function MyFormItem({ customStyle, label, ...props }: Props) {
	return (
		<>
			<StyledFormItem {...customStyle}>
				<fieldset>
					<legend></legend>
				</fieldset>
				<Form.Item {...props} label={label}></Form.Item>
			</StyledFormItem>
		</>
	);
}
