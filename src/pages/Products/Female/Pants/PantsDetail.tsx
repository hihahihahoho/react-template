import { Link, useLocation, useParams } from "react-router-dom";

const Pants: React.FC = () => {
  let { id } = useParams();
  let location = useLocation();
  console.log(location)

  return (
    <>
      <Link to={'../'}>Back</Link>
      <div>Pants {id}</div>
    </>
  )
}

export default Pants 
