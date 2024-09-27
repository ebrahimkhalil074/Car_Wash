/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetMyBookingsQuery } from "../../redux/features/user/bookingApi";
import { useEffect, useState } from 'react';
import moment from 'moment';
import { Table } from "antd";

const PastBooking = () => {
  const { data } = useGetMyBookingsQuery(undefined);
  const [pastBookings, setPastBookings] = useState([]);
  
  useEffect(() => {
    if (data?.data?.result) {
      const now = moment();

      // Filter past bookings based on slot end time being in the past
      const filteredBookings = data.data.result.filter(({ slotId }:any) =>
        moment(slotId.date).isBefore(now)
      );

      // Map filtered bookings to a table-compatible format
      const mappedBookings = filteredBookings.map(({ _id, serviceId, slotId }:any) => ({
        key: _id,
        name: serviceId.name,
        date: moment(slotId.date).format('YYYY-MM-DD'), 
        endTime:slotId.endTime ,
        status: slotId.isBooked 
      }));

      setPastBookings(mappedBookings);
    }
  }, [data]);

  
  const columns = [
    {
      title: 'Service',
       dataIndex: 'name',
       key: 'name' 
      },
    { title: 'Date',
       dataIndex: 'date',
       key: 'date' 
      },

    { title: 'End Time',
       dataIndex: 'endTime',
        key: 'endTime' 
      },  // Display the end time
    {
       title: 'Status', 
      dataIndex: 'status', 
      key: 'status' 
    },
  ];

  return (
    <div>
      <h3 className="text-3xl text-center p-2 text-blue-600 font-bold font-mono">Past Bookings</h3>
      <Table dataSource={pastBookings} columns={columns} rowKey="key" pagination={false} />
    </div>
  );
};

export default PastBooking;
