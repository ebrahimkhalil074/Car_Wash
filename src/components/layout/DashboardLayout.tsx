import { Layout, Menu } from "antd";

// import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Link, NavLink, Outlet } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { currentUser, logOut } from "../../redux/features/auth/authSlice";
import Sidebar from "./Sidebar";




const { Header, Content,} = Layout;


const DashBoardLayout  = () => {
  const dispacch =useAppDispatch();
const user =useAppSelector(currentUser)

  const handleLogout =()=>{
console.log("logOut");
dispacch(logOut())
  }
    return (
        <div>
           <Layout  style={{height:'100vh', }}>
   <Sidebar></Sidebar>
   
      <Layout>
        <Header style={{ 
          display:'flex',
          backgroundColor: '#fff',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: 0,
          zIndex: 1,
          width: '100%',
          height: '64px',

         }} >
          <Menu  mode="horizontal">
            <Menu.Item key="0"><NavLink to='/contact'>Contact</NavLink></Menu.Item>
            <Menu.Item key="1"><NavLink to='/home'>home</NavLink></Menu.Item>
            <Menu.Item key="2"><Link to='/login'>login</Link></Menu.Item>
            <Menu.Item key="3" onClick={handleLogout}>LogOut</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ margin: ' 0',height:"100vh", overflow:'scroll' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
             
            }}
          >
           <div className="h-[100px] bg-gray-400 rounded-lg p-4">

            <h1 className="text-2xl">Hi,{user?.name}</h1>
            <h2 className="text-xl">Welcome to DashBoard</h2>
           </div>
 
           <Outlet></Outlet>
          </div>
        </Content>
        
      </Layout>
    </Layout>  
        </div>
    );
};

export default DashBoardLayout;