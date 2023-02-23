import styled from '@emotion/styled/macro';
import tw from 'twin.macro';
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
	& .ant-select-arrow {
		font-size: 24px;
	}
	& .ant-select {
		width: 100%;
	}
	fieldset {
		left: 0;
		right: 0;
		z-index: 2;
		height: ${({ customSize = 'default' }) => getFormHeight(customSize)}px;
		min-height: ${({ inputHeight }) => {
			return inputHeight + 6;
		}}px;
		position: absolute;
		top: 0;
		padding: 0 14px 0 8px;
		${tw`rounded-lg`}
		margin: 0;
		border: 1px solid;
		${tw`border-formBorder`};
		pointer-events: none;
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
		display: flex !important;
		overflow: visible !important;
		label {
			transform: translateY(-50%);
		}
		&::after {
			content: '';
			flex: 1 0 auto;
			margin-left: 8px;
			border-top: 1px solid;
			${tw`border-formBorder`};
		}
	}
	& .ant-select-selector,
	& .ant-input {
		background-color: transparent !important;
		border: 0;
		box-shadow: none !important;
		padding: 5px 12px;
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
		.ant-select-selection-search-input {
			min-height: 0;
		}
		.ant-select-selector {
			min-height: ${({ customSize = 'default' }) => getFormHeight(customSize)}px;
		}
	}
`;

StyledFormItem.defaultProps = {
	customSize: 'default',
};

export default StyledFormItem;
