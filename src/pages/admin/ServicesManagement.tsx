/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, Pagination, Table, TableProps } from 'antd';
import { useState } from 'react';
import { TQueryParams } from '../../types/globalTypes';
import { useAddServiceMutation, useDeleteServiceMutation, useGetAllServicesQuery } from '../../redux/features/user/servicesApi';
import UpdateServiceModal from '../../components/ui/modal/UpdateServicesModal';
import { toast } from 'sonner';
import PhForm from '../../components/form/PhForm';
import PhInput from '../../components/form/PhInput';
import { FieldValues, SubmitHandler } from 'react-hook-form';

// Define the type for the service record
interface ServiceRecord {
  key: string;
  name: string;
  description: string;
  price: string;
  duration: string;
}

const ServicesManagement: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceRecord | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);

  const [deleteService] = useDeleteServiceMutation();
  const { data: servicesData } = useGetAllServicesQuery([
    { name: 'page', value: page },
    { name: 'sort', value: 'price' },
    ...params,
  ]);

  const metaData = servicesData?.data?.meta;
  const tableData: ServiceRecord[] = servicesData?.data?.result.map(
    ({ _id, name, description, price, duration }:any) => ({
      key: _id,
      name,
      description,
      price: `${price}$`,
      duration: `${duration} Mins`,
    })
  ) || [];

  const columns = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Price',
      key: 'price',
      dataIndex: 'price',
    },
    {
      title: 'Duration',
      key: 'duration',
      dataIndex: 'duration',
    },
    {
      title: 'Description',
      key: 'description',
      dataIndex: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: ServiceRecord) => (
        <div>
          <Button onClick={() => handleUpdate(record)}>Update</Button>
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: ServiceRecord) => (
        <div>
          <Button danger onClick={() => showDeleteConfirm(record.key)}>Delete</Button>
        </div>
      ),
    },
  ];

  const handleUpdate = (service: ServiceRecord) => {
    setSelectedService(service);  // Set the service to update
    setIsUpdateModalOpen(true);   // Open the update modal
  };

  const showDeleteConfirm = (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this service?',
      content: 'This action cannot be undone.',
      okText: 'Confirm',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        handleDelete(id);
      },
    });
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteService(id).unwrap();
      if (res.success) {
        toast.success('Service deleted successfully');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to delete service');
    }
  };

  const onChange: TableProps<ServiceRecord>['onChange'] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === 'filter') {
      const queryParams: TQueryParams[] = [];
      filters.name?.forEach((item) =>
        queryParams.push({ name: 'name', value: item })
      );
      setParams(queryParams);
    }
  };

  return (
    <div>
      <div>
        <AddServiceModal />
      </div>

      <Table
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />

      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />

      {isUpdateModalOpen && (
        <UpdateServiceModal
          service={selectedService}
          isVisible={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
        />
      )}
    </div>
  );
};

// AddServiceModal component with TypeScript


const AddServiceModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addService,] = useAddServiceMutation();

  const handleSubmit : SubmitHandler<FieldValues>= async (data) => {
    const toastId = toast.loading('Creating...');
    const serviceData = {
      name: data.name,
      duration: Number(data.duration),
      price: Number(data.price),
      description: data.description,
      isDeleted: false,
    };

    try {
      const res = await addService(serviceData);
      if ((res.error) ) {
        toast.error('SERVICE CREATION FAILED', { id: toastId });
      } else {
        toast.success(res.data?.message, { id: toastId });
      }
    } catch (err) {
      toast.error(`Something went wrong: ${err}`, { id: toastId });
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Add Service</Button>
      <Modal
        title="Add New Service"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PhForm onSubmit={handleSubmit}>
          <PhInput type="text" name="name" label="Name" />
          <PhInput type="text" name="duration" label="Duration" />
          <PhInput type="text" name="price" label="Price" />
          <PhInput type="text" name="description" label="Description" />
          <Button onClick={handleCancel} htmlType="submit">Submit</Button>
        </PhForm>
      </Modal>
    </>
  );
};

export default ServicesManagement;
