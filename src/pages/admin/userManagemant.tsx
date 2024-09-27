/* eslint-disable @typescript-eslint/no-explicit-any */

import { Table, Button, Modal } from 'antd';
import { useState } from 'react';
import { useGetAllUserQuery, useUpdateUserRoleMutation } from '../../redux/features/user/userManagement.api';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import PhSelect from '../../components/form/PhSelect';
import PhForm from '../../components/form/PhForm';
import { toast } from 'sonner';
import { User } from '../../types/globalTypes';



const UserManagement = () => {
  const { data } = useGetAllUserQuery(undefined); // Fetch all users
  console.log(data);
  
  const [updateUserRole] = useUpdateUserRoleMutation(); // Mutation for updating user role
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // Initial state set to null

  const users = data?.data || [];
  const tableData = users?.map(
    ({ _id, name, email, role, address }:any) => ({
      key: _id,
      name,
      email,
      role,
      address,
    })
  );

  const columns = [
    {
      title: 'Username',
      dataIndex: 'name',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: User) => (
        <Button onClick={() => openRoleModal(record)}>Edit Role</Button>
      ),
    },
  ];

  const openRoleModal = (user: User) => {
    setSelectedUser(user); // Set selected user
    setIsModalOpen(true);
  };

  const handleRoleChange: SubmitHandler<FieldValues> = async (data) => {
    if (!selectedUser) return; // Safety check in case selectedUser is null
    
    console.log(data);
    const updateInfo = {
      id: selectedUser._id, // Optional chaining removed as we're certain selectedUser is not null
      data,
    };

    try {
      await updateUserRole(updateInfo).unwrap();
      setIsModalOpen(false);
      toast.success("User role updated successfully");
    } catch (error) {
      console.error('Error updating user role', error);
      toast.error("Failed to update user role");
    }
  };

  const userRole = [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
  ];

  return (
    <>
      <Table columns={columns} dataSource={tableData} rowKey="key" />

      {/* Role Edit Modal */}
      <Modal
        title="Edit User Role"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <PhForm onSubmit={handleRoleChange}>
          <PhSelect label="Role" name="role" options={userRole}></PhSelect>
          <Button type="primary" htmlType="submit">Update Role</Button>
        </PhForm>
      </Modal>
    </>
  );
};

export default UserManagement;
