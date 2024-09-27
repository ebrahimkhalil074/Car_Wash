
import { useGetAllServicesQuery } from "../../../redux/features/user/servicesApi";
import { TService } from "../../../types/globalTypes";
import ServiceCard from "../ServiceCard";

const HomeService = () => {

    const {data} = useGetAllServicesQuery( [
      { name: 'limit', value: 6 },
     
      { name: 'sort', value: '-createAt' },
     
    ]);
    console.log(data?.data?.result);
    
    
  return (
    <div>
        <h1 className="text-blue-700 text-2xl font-semibold mb-4 p-4 text-center">Services</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
     {
        data?.data?.result?.map(( service :TService ) =><ServiceCard service={service}></ServiceCard> )
     }
    </div>
   
    </div>
  );
};

export default HomeService;