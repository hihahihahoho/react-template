import { Input, InputProps } from 'antd';
import styled from 'styled-components';

const StyleInput = styled(Input)`
	&.ant-input {
		background-color: palevioletred;
		color: white;
		font-size: 1em;
		border-radius: 3px;
	}
`;

export default function MyInput(props: InputProps) {
	return <StyleInput {...props} />;
}
