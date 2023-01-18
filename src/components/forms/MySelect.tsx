import { Select, SelectProps } from 'antd';

export default function MySelect(props: SelectProps) {
	return (
		<Select
			{...props}
			className={`${props.className} h-11 rounded-lg hover:border-blue-900 focus:border-blue-900 hover:bg-slate-300 focus:bg-slate-50`}
		>
			{/* {props.children} */}
		</Select>
	);
}
