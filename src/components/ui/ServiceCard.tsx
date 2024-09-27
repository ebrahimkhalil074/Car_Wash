import { Link } from "react-router-dom";
import { TService } from '../../types/globalTypes';

const ServiceCard = ({service}: {
  service: TService;
}) => {
  console.log(service);
  return (
    <div>
 <div className="max-w-sm mx-auto border shadow-lg rounded-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
  <div className="bg-cover bg-center h-48" style={{ backgroundImage: 'url(https://i.ibb.co/Thpg2xc/DALL-E-2024-09-01-21-50-44-A-hero-section-of-a-modern-car-wash-service-website-The-background-shows.webp)' }}>
    {/* Placeholder for image */}
  </div>
  <div className="p-6">
    <div className="  text-white text-center flex justify-center items-center rounded-md mb-4">
      <h1 className=" bg-blue-500 py-2  px-4 rounded-md text-xl font-bold">{service?.name}</h1>
    </div>
   <div className="flex justify-between">
   <h2 className="text-lg text-gray-600 text-center mb-2"><span className="text-xl font-medium ">Price</span>:${service?.price}</h2>
   <h2 className="text-md text-gray-500 text-center mb-2"><span className="text-xl font-medium ">Duration:</span> {service?.duration} mins</h2>
   </div>
   <div className="flex flex-col justify-between items-center">
   <h2 className="text-xl font-medium"> Description</h2>
   <p className="text-gray-700 text-sm text-center leading-relaxed">
      {service?.description}
    </p>
    <div className="mt-4 flex-1 flex justify-center items-center">
     <Link to={`/services-details/${service?._id}`}>
     <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out">
        Learn More
      </button>
     </Link>
    </div>
   </div>
    
  </div>
</div>


    </div>
  );
};

export default ServiceCard;