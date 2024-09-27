import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Avatar, Dropdown, Button } from 'antd';
import { UserOutlined, DashboardOutlined, MenuOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { currentUser, logOut } from '../../../redux/features/auth/authSlice';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user =useAppSelector(currentUser)

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const dispatch =useAppDispatch()
  const menu = (
    <Menu>
      <Menu.Item key="dashboard">
        <NavLink to="/dashboard">
          <DashboardOutlined /> Dashboard
        </NavLink>
      </Menu.Item>
      <Menu.Item key="logout">
        <Button onClick={()=>dispatch(logOut())}>Logout</Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <nav className="bg-blue-600 p-4 shadow-lg relative">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Left: Logo */}
        <div className="text-white text-2xl font-bold tracking-wide">
          MyLogo
        </div>

        {/* Middle: Navigation Items */}
        <div className="hidden md:flex space-x-6">
          <Menu mode="horizontal" className="bg-transparent border-none text-white">
            <Menu.Item key="home" className="hover:bg-transparent">
              <NavLink
               
                to="/"
                className="text-white hover:text-blue-300 transition-colors"
                
              >
                Home
              </NavLink>
            </Menu.Item>
            <Menu.Item key="about" className="hover:bg-transparent">
              <NavLink
                to="/about"
                className="text-white hover:text-blue-300 transition-colors"
               
              >
                About
              </NavLink>
            </Menu.Item>
            <Menu.Item key="services" className="hover:bg-transparent">
              <NavLink
                to="/services"
                className="text-white hover:text-blue-300 transition-colors"
               
              >
              Services
              </NavLink>
            </Menu.Item>
            <Menu.Item key="contact" className="hover:bg-transparent">
              <NavLink
                to="/contact"
                className="text-white hover:text-blue-300 transition-colors"
                
              >
                Contact
              </NavLink>
            </Menu.Item>
          </Menu>
        </div>

        {/* Right: User Avatar/Dashboard */}
        <div className="flex items-center space-x-4">
          {user ? (
            <Dropdown overlay={menu} trigger={['click']}>
              <Avatar
                className="cursor-pointer"
                size="large"
                icon={<UserOutlined />}
                alt="User Avatar"
              />
            </Dropdown>
          ) : (
            <Link to='/login'>
            <Button type="primary" className="bg-blue-700 border-none hover:bg-blue-800">
              Login
            </Button>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden">
          <Button
            className="text-white border-none bg-transparent"
            icon={<MenuOutlined />}
            onClick={toggleMenu}
          />
        </div>
      </div>

      {/* Mobile Menu as a Card */}
      {isOpen && (
        <div className="md:hidden absolute right-4 top-16 bg-white shadow-lg rounded-lg max-w-xs w-64 p-4 z-50">
          <Menu mode="vertical" className="bg-white text-blue-600">
            <Menu.Item key="home">
              <NavLink
              
                to="/"
                className="block py-2 text-blue-600 hover:text-blue-800"
               
              >
                Home
              </NavLink>
            </Menu.Item>
            <Menu.Item key="about">
              <NavLink
                to="/about"
                className="block py-2 text-blue-600 hover:text-blue-800"
              
              >
                About
              </NavLink>
            </Menu.Item>
            <Menu.Item key="products">
              <NavLink
                to="/products"
                className="block py-2 text-blue-600 hover:text-blue-800"
         
              >
                Products
              </NavLink>
            </Menu.Item>
            <Menu.Item key="contact">
              <NavLink
                to="/contact"
                className="block py-2 text-blue-600 hover:text-blue-800"
            
              >
                Contact
              </NavLink>
            </Menu.Item>
          </Menu>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
