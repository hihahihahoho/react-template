import styled from 'styled-components';
import { THEME } from '../../config/theme';

export interface CustomFormItemProp {
	inputHeight: number;
	customSize?: keyof typeof THEME.form.size;
	customColor?: string;
}

const getFormHeight = (size: keyof typeof THEME.form.size) => THEME.form.size[size];
const getFormHeightMinusBorder = (size: keyof typeof THEME.form.size) => THEME.form.size[size] - 2;

const StyledFormItem = styled.div<CustomFormItemProp>`
	& {
		position: relative;
	}
	& .ant-select {
		width: 100%;
	}
	fieldset {
		width: 100%;
		z-index: 2;
		height: ${({ customSize = 'default' }) => getFormHeight(customSize)}px;
		min-height: ${({ inputHeight }) => {
			return inputHeight + 6;
		}}px;
		position: absolute;
		top: 0;
	}
	& .ant-form-item-control-input,
	input {
		min-height: ${({ customSize = 'default' }) => getFormHeight(customSize)}px;
	}
	& textarea {
		margin: 6px 0;
	}
	& .ant-form-item-label {
		position: absolute;
		width: 100%;
		padding: 0 12px;
		height: ${({ customSize = 'default' }) => getFormHeight(customSize)}px;
	}
	& .ant-select-single {
		.ant-select-selector {
			height: ${({ customSize = 'default' }) => getFormHeight(customSize)}px;
			.ant-select-selection-item,
			.ant-select-selection-placeholder {
				line-height: ${({ customSize = 'default' }) => getFormHeight(customSize)}px;
			}
			.ant-select-selection-search-input {
				height: ${({ customSize = 'default' }) => getFormHeightMinusBorder(customSize)}px;
			}
		}
	}
	& .ant-select-multiple {
		.ant-select-selector {
			min-height: ${({ customSize = 'default' }) => getFormHeight(customSize)}px;
		}
	}
`;

StyledFormItem.defaultProps = {
	customSize: 'default',
};

export default StyledFormItem;
