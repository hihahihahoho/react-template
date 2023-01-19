import { Select, SelectProps } from 'antd';
import styled from 'styled-components';

const StyleSelect = styled.div`
	.ant-select {
		.ant-select-selector {
			height: 44px;
		}
	}
`;

export default function MySelect(props: SelectProps) {
	return (
		<StyleSelect>
			<Select {...props}></Select>
		</StyleSelect>
	);
}
