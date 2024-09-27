/* eslint-disable @typescript-eslint/no-explicit-any */


import { Button, Table, Tag, Modal, Switch, Form, Input, Select } from 'antd';
import { useState } from 'react';
import { useGetAllSlotsQuery, useUpdateSlotStatusMutation } from '../../redux/features/user/slot.api';
import { FieldValues, SubmitHandler } from 'react-hook-form';

const SlotManagement = () => {
  const [isAddSlotModalOpen, setIsAddSlotModalOpen] = useState(false);
 ;
  const {data} = useGetAllSlotsQuery(undefined)
  const [updateSlotStatus] = useUpdateSlotStatusMutation(); 
  const slots =data?.data?.result;

  const handleStatusToggle = async (id:string, currentStatus:'booked' | 'cancelled' | 'available') => {
    // Check if the slot is booked. If it is, prevent status change.
   console.log(currentStatus)
    
    if (currentStatus === 'booked') {
      return;
    }

    // Determine the new status (toggle between AVAILABLE and CANCELLED)
    const newStatus = currentStatus === 'available' ? 'cancelled' : 'available';

    // Call the API to update the slot status
    const slotInfo={
      id,
      data:{isBooked:newStatus}
    }
    console.log(slotInfo);
    
    try {
      const response = await updateSlotStatus(slotInfo);
      console.log('Slot status updated:', response);

      // Handle success case, maybe update the local state or refetch the slots
    } catch (error) {
      console.error('Error updating slot status:', error);
    }
  };

  const handleAddSlot :SubmitHandler<FieldValues> = (values) => {
    // Add a new slot based on form values
    console.log('New Slot: ', values);
    setIsAddSlotModalOpen(false);
  };
  const tableData = slots?.map(
    ({_id,startTime,endTime,
      isBooked,service
      }:any) => ({
      key:_id,
      name:service?.name,
      startTime,
      endTime, 
      isBooked

      
    })
  );
  console.log(tableData);
  const columns = [
 
    {
      title: 'Service Name',
      dataIndex: 'name',
      key: 'serviceName',
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'time',
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'time',
    },
    {
      title: 'Status',
      dataIndex: 'isBooked',
      key: 'isBooked',
      render: (isBooked :'booked' | 'cancelled' | 'available') => (
        <Tag color={isBooked === 'booked' ? 'red' : isBooked === 'available' ? 'green' : 'volcano'}>
          {isBooked}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_ :any, record:any) => { 
      
        return(
      
        <Switch 
          checked={record.isBooked === 'available'||record.isBooked === 'cancelled'}
      
          disabled={record.isBooked === 'booked'}
          onChange={() => handleStatusToggle(record.key,record.isBooked)}
        />
      )}
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => setIsAddSlotModalOpen(true)}>Add Slot</Button>

      <Table
        columns={columns}
        dataSource={tableData}
        rowKey="key"
      />

      {/* Add Slot Modal */}
      <Modal
        title="Add Slot"
        visible={isAddSlotModalOpen}
        onCancel={() => setIsAddSlotModalOpen(false)}
        footer={null}
      >
        <Form onFinish={handleAddSlot}>
          <Form.Item name="service" label="Service" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="service1">Service 1</Select.Option>
              <Select.Option value="service2">Service 2</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="time" label="Time" rules={[{ required: true }]}>
            <Input placeholder="9:00 AM - 10:00 AM" />
          </Form.Item>

          <Form.Item name="status" label="Status" initialValue="AVAILABLE">
            <Select>
              <Select.Option value="AVAILABLE">Available</Select.Option>
              <Select.Option value="CANCELLED">Cancelled</Select.Option>
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit">Submit</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default SlotManagement;
