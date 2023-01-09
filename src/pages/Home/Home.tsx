import { Button } from "antd";
import { SiderContext } from "antd/es/layout/Sider";
import { useContext } from "react";

const Home: React.FC = () => {
  const context = useContext(SiderContext);
  console.log(context.siderCollapsed)
  return (
    <>
      <Button>{context.siderCollapsed}</Button>
      <div>Home</div>
    </>
  )
}

export default Home 
