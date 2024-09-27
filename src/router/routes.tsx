import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import Service from "../pages/Service";
import About from "../pages/About";
import Booking from "../pages/Booking";
import ServicesDetails from "../components/ui/ServicesDetails";
import DashBoardLayout from "../components/layout/DashboardLayout";
import ServicesManagement from "../pages/admin/ServicesManagement";
import SlotManagement from "../pages/admin/slotManagement";
import UserManagement from "../pages/admin/userManagemant";
import ProfilePage from "../components/ui/profile";
import PastBooking from "../components/ui/PastBooking";

import Login from "../pages/Login";
import Register from "../pages/Register";
import UpcomingBookings from "../components/ui/UpcomingBooking";



 const router= createBrowserRouter([
    {
        path: "/",
       element:<MainLayout></MainLayout>,
        children: [
            {
                index:true ,
                element:<Home></Home> 
              },  
            {
               path:'/services' ,
                element:<Service></Service>
              },  
            {
               path:'/about' ,
                element:<About></About>
              },  
            {
               path:'/booking' ,
                element:<Booking></Booking>
              },  
            {
               path:'/services-details/:id' ,
                element:<ServicesDetails></ServicesDetails>,
              
              },  
        ]
    },
    {
path:"/dashboard",
element:(
    
    <DashBoardLayout></DashBoardLayout>
 
),
children: [
  
  {
     path:'services-management' ,
      element:<ServicesManagement></ServicesManagement>
    },  
  {
     path:'slot-management' ,
      element:<SlotManagement></SlotManagement>
    },  
  {
     path:'user-management' ,
      element:<UserManagement></UserManagement>
    },  
  {
     path:'profile' ,
      element:<ProfilePage></ProfilePage>
    },  
  {
     path:'past-bookings' ,
      element:<PastBooking/>
    },  
  {
     path:'upcoming-bookings' ,
      element:<UpcomingBookings/>
    },  
  {
     path:'about' ,
      element:<About></About>
    },  
  {
     path:'booking' ,
      element:<Booking></Booking>
    },  
   
]
// path:"/user",
// element:(
//     <ProtectedRoute role ='faculty'>
//     <App></App>
//     </ProtectedRoute>
// ),
// children:routerGenaretore(facultyPaths)
     },
   
    {
        path: "login",
        element:<Login></Login>
 
    },
    
    {
        path: "register",
        element:<Register></Register>
 
    },
 ])

 export default router;