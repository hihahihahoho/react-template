import { DatePicker, Form, FormItemProps, Input, Select } from 'antd';
import classnames from 'classnames';
import React, { useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import StyledFormItem, { CustomFormItemProp } from './StyledFormItem';

const { TextArea } = Input;

interface Props extends FormItemProps {
	children?: React.ReactNode;
	customStyle?: CustomFormItemProp;
}

export default function MyFormItem({ customStyle, ...props }: Props) {
	const [focused, setFocused] = useState(false);
	const [hasValue, setHasValue] = useState(false);
	const [inputHeight, setInputHeight] = useState(0);

	const handleFocus = () => {
		setFocused(true);
	};

	const handleBlur = () => {
		setFocused(false);
	};

	const handleDropdownVisibleChange = (visible: boolean) => {
		if (visible) {
			setFocused(true);
		} else {
			setFocused(false);
		}
	};

	const handleChange = (value: any) => {
		if (value.length === 0) {
			setHasValue(false);
		} else {
			setHasValue(true);
		}
	};

	const className = classnames({
		'is-focused': focused,
		'has-value': hasValue,
	});

	const allowedTypes = [Input, TextArea, Select, DatePicker];
	return (
		<>
			<StyledFormItem inputHeight={inputHeight}>
				<Form.Item {...props} className={className}>
					{React.Children.map(props.children, (child: any) => {
						let modifyProps: { [key: string]: any } = { ...child.props };
						if (child.type === Select) {
							modifyProps.onDropdownVisibleChange =
								child.type === Select
									? (visible: boolean) => {
											handleDropdownVisibleChange(visible);
											child.props.onDropdownVisibleChange?.(visible);
									  }
									: child.props.onDropdownVisibleChange();
							modifyProps.onChange = (value: { value: string; label: React.ReactNode }) => {
								handleChange(value);
								child.props.onChange?.(value);
							};
							modifyProps.suffixIcon = child.props.suffixIcon ? child.props.suffixIcon : <RiArrowDownSLine />;
							modifyProps.showArrow = child.props.showArrow ? child.props.showArrow : true;
						}
						if (child.type === Input || child.type === TextArea) {
							modifyProps.onFocus = (event: React.FocusEvent) => {
								handleFocus();
								child.props.onFocus?.(event);
							};
							modifyProps.onBlur = (event: React.FocusEvent) => {
								handleBlur();
								child.props.onBlur?.(event);
							};
							modifyProps.onChange = (value: { value: string; label: React.ReactNode }) => {
								handleChange(value);
								child.props.onChange?.(value);
							};
							modifyProps.onResize = ({ width, height }: any) => {
								setInputHeight(height);
							};
						}
						return typeof allowedTypes.includes(child.type) ? React.cloneElement(child, modifyProps) : child;
					})}
				</Form.Item>
				<fieldset>
					<legend></legend>
				</fieldset>
			</StyledFormItem>
		</>
	);
}
