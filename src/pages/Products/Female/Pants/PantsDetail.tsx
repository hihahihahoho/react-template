import { Link, useParams, useResolvedPath } from 'react-router-dom';

const Pants: React.FC = (props) => {
	let { id } = useParams();
	const resolvedPath = useResolvedPath(props);
	console.log(resolvedPath);
	return (
		<>
			<Link to={'../'}>Back</Link>
			<div>Pants {id}</div>
		</>
	);
};

export default Pants;
