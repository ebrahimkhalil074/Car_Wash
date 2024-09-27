import { Layout, Menu } from "antd";

import { verifyToken } from "../../utills/verifyToken";

import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { token as crToken} from "../../redux/features/auth/authSlice";
import { MenuProps } from "antd";
import { User } from "../../types/globalTypes";

type MenuItem = Required<MenuProps>['items'][number];



const {  Sider } = Layout;
const Sidebar = () => {
  const token =useAppSelector(crToken)
 console.log(token);  


const user  =verifyToken(token as string) as User;
const role  =(user).role 
console.log(role);

let sidebarItems: MenuItem[] = [];

const userRole ={
    ADMIN: 'admin',
    USER:'user',
 
   
}

switch (role) {
  case userRole.ADMIN:
    sidebarItems=[
      {
        key: '1',
        icon: <UserOutlined />,
        label: <Link to='user-management'>userManagement</Link>,
      },
      {
        key: '2',
        icon: <VideoCameraOutlined />,
        label: <Link to='slot-management'>SlotManagement</Link>,
      },
      {
        key: '3',
        icon: <UploadOutlined />,
        label: <Link to='services-management'>ServicesManagement</Link>,

      },
      {
        key:'4',
        icon: <UploadOutlined />,
        label: <Link to='profile'>Profile</Link>,

      },
      
    
    ]
    break;
  case userRole.USER:
    sidebarItems = [
      {
        key:'6',
        icon: <UploadOutlined />,
        label: <Link to='profile'>Profile</Link>,

      },
      {
        key:'7',
        icon: <UploadOutlined />,
        label: <Link to='past-bookings'>Past Booking</Link>,

      },
      {
        key:'9',
        icon: <UploadOutlined />,
        label: <Link to='upcoming-bookings'>Upcoming Bookings</Link>,

      },
    ]
    
    break;
   
  default:
    break;
}


  return (
    <div  >
      <Sider
      style={{ height: '100vh' }}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '64px',
            width: '100%',
           
        }}>
            <p style={{color:"white",fontSize:"25px",fontWeight:"bold"}}>ph univercity</p>
            
        </div>
        <div className="demo-logo-vertical" />
        <Menu 
        theme="dark" 
        mode="inline"
         defaultSelectedKeys={['4']}
          items ={sidebarItems} />
      </Sider>
    </div>
  );
};

export default Sidebar;