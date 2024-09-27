
// import { TQueryParams } from "@/types/globalTypes";
import { Pagination } from "antd";
import { useState } from "react";
import { useGetAllServicesQuery } from "../redux/features/user/servicesApi";
import ServiceCard from "../components/ui/ServiceCard";
import { TService } from "../types/globalTypes";


const Service = () => {
 
  const [page, setPage] = useState(1);
    const {data} = useGetAllServicesQuery( [
      { name: 'page', value: page },
     
      { name: 'sort', value: 'price' },
     
    ]);
    console.log(data?.data);
    const metaData = data?.data.meta;
    
  return (
    <div>
        <h1 className="text-blue-700 text-2xl font-semibold mb-4 p-4 text-center">Services</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
     {
        data?.data?.result?.map(({ service }: {
          service: TService;
      }) =><ServiceCard service={service}></ServiceCard> )
     }
    </div>
       <Pagination
       style={{padding: '20px'}}
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
   
    </div>
  );
};

export default Service;