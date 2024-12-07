import { CustomTable } from '@components/custom-table/CustomTable';
import { Button, Input } from '@nextui-org/react';
import { getDate, ToastInfo, ToastNotiError } from '@utils/Utils';
import React, { useEffect, useState } from 'react';
import { factories } from '../../factory';

export default function AdminRequestHost() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState([]);

  useEffect(() => {
    setLoading(true);
    loadList();
  }, []);

  function loadList() {
    factories
      .getRequestHost()
      .then((data) => {
        setData(data.requests);
        setPagination(data.pagination);
      })
      .finally(() => setLoading(false));
  }

  const columns = [
    {
      id: 'PassengerName',
      label: 'Họ và Tên',
      renderCell: (row) => <div className="w-40">{row.targetId?.fullName}</div>,
    },
    {
      id: 'BranchName',
      label: 'Tên Nhà xe',
      renderCell: (row) => (
        <div className="w-40">{row.targetId?.branchName}</div>
      ),
    },
    {
      id: 'PhoneNumber',
      label: 'Số Điện Thoại',
      renderCell: (row) => <span>{row.targetId?.phone}</span>,
    },
    {
      id: 'time',
      label: 'Thời Gian',
      renderCell: (row) => <span>{getDate(row.targetId?.createdAt, 3)}</span>,
    },
    {
      id: 'Status',
      label: '',
      renderCell: (row) => (
        <Button
          size="sm"
          color="primary"
          onClick={() => handleChangeStatus(row._id, 1)}
        >
          Duyệt
        </Button>
      ),
    },
    {
      id: 'Status',
      label: '',
      renderCell: (row) => (
        <Button
          size="sm"
          color={'danger'}
          onClick={() => handleChangeStatus(row._id, 2)}
        >
          Từ chối
        </Button>
      ),
    },
  ];

  function handleChangeStatus(id, status) {
    factories
      .updateStatusRequest(id, status)
      .then((e) => {
        ToastInfo(e.message);
        loadList();
      })
      .catch((error) => {
        const dataE = error.response.data.message;
        loadList();
        ToastNotiError(dataE);
      });
  }

  return (
    <div
      className="bg-white rounded shadow-md px-4 py-3  pt-6"
      style={{
        height: 'calc(100% - 100px)',
      }}
    >
      <Input
        type="text"
        placeholder="Tìm kiếm tên, số điện thoại"
        className="w-full outline-none bg-gray-100 rounded-lg"
        startContent={<i className="fas fa-search text-gray-500 mr-2"></i>}
      />
      <div className="mt-4">
        <CustomTable columns={columns} data={data} isLoading={loading} />
      </div>
    </div>
  );
}
