import styled from 'styled-components';
import { THEME } from '../../config/theme';

export interface CustomFormItemProp {
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
		/* height: ${({ customSize = 'default' }) => getFormHeight(customSize)}px; */
	}
	& .ant-select-single {
		.ant-select-selector {
			position: absolute;
			top: 0;
			height: ${({ customSize = 'default' }) => getFormHeight(customSize)}px;
			.ant-select-selection-item,
			.ant-select-selection-placeholder {
				line-height: ${({ customSize = 'default' }) => getFormHeightMinusBorder(customSize)}px;
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
