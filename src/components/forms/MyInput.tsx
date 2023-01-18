import { Input, InputProps } from 'antd';

export default function MyInput(props: InputProps) {
	return (
		<Input
			{...props}
			className={`${props.className} h-11 rounded-lg hover:border-blue-900 focus:border-blue-900 hover:bg-slate-300 focus:bg-slate-50`}
		/>
	);
}
