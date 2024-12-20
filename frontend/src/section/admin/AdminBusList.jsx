import { CustomTable } from '@components/custom-table/CustomTable';
import { Button, Input, Tooltip } from '@nextui-org/react';
import { BUSES_LIST, ROLES } from '@utils/constants';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useModalCommon } from '../../context/ModalContext';
import { factories } from '../../factory/index';
import CreateBusModal from './modal/CreateBusModal';

export default function AdminBusList({ isAdmin }) {
  const [keyword, setKeyword] = useState();
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState();
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const { onOpen } = useModalCommon();
  useEffect(() => {
    loadList();
  }, [keyword, pagination?.current]);

  const columns = [
    {
      id: 'BusName',
      label: 'Biển số xe',
      renderCell: (row) => <div className="w-40">{row.busNumber}</div>,
    },
    {
      id: 'BranchName',
      label: 'Mẫu xe',
      renderCell: (row) => (
        <div className="w-40">
          {BUSES_LIST.find((x) => x.id.toString() === row.busModel)?.label}
        </div>
      ),
    },
    {
      id: 'seats',
      label: 'Số ghế',
      renderCell: (row) => (
        <div className="w-40">
          {BUSES_LIST.find((x) => x.id.toString() === row.busModel)?.seats}
        </div>
      ),
    },
    {
      id: 'phone',
      label: 'Số điện thoại chủ xe',
      renderCell: (row) => <span>{row.owner?.phone}</span>,
    },
    {
      id: 'name',
      label: 'Tên chủ xe',
      renderCell: (row) => <span>{row.owner?.fullName}</span>,
    },
    {
      id: 'mail',
      label: 'Email chủ xe',
      renderCell: (row) => <span>{row.owner?.email}</span>,
    },
    {
      id: 'action',
      label: 'Tác vụ',
      headCell: () => <span className="text-center w-full">Tác vụ</span>,
      renderCell: (row) => (
        <div className="">
          <Tooltip content="Sửa">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editBus(row)}
              className="border-none max-w-8 h-8"
            >
              <i className="fas fa-edit text-blue-500 text-sm"></i>
            </Button>
          </Tooltip>
          {/* <Tooltip content="Xóa">
            <Button
              variant="ghost"
              size="sm"
              className="border-none max-w-8 h-8"
            >
              <i className="fas fa-trash-alt text-pink-500 text-sm"></i>
            </Button>
          </Tooltip> */}
        </div>
      ),
    },
  ];

  function createBus(item) {
    onOpen({
      view: <CreateBusModal onReload={loadList} />,
      title: 'Tạo xe mới',
      size: '2xl',
    });
  }
  function editBus(item) {
    onOpen({
      view: <CreateBusModal onReload={loadList} item={item} />,
      title: 'Cập nhật xe',
      size: '2xl',
    });
  }
  function loadList() {
    setLoading(true);
    const params = {
      page: pagination?.current,
      ...(auth.roles[0] === ROLES.BUS_OWNER ? { ownerId: auth._id } : {}),
      ...(keyword ? { keyword } : {}),
    };
    factories
      .getListBuses(params)
      .then((data) => {
        setData(data?.buses);
        setLoading(false);
        setPagination(data.pagination);
      })
      .finally(() => setLoading(false));
  }
  return (
    <div className="bg-white rounded shadow-md px-4 py-3 h-full">
      {auth?.roles[0] === ROLES.BUS_OWNER && (
        <div className="flex items-center justify-between mb-3">
          <div className="mt-2 flex justify-end items-center w-full">
            <Button onClick={createBus} size="sm" color="primary">
              Tạo mới xe
            </Button>
          </div>
        </div>
      )}
      <Input
        type="text"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Tìm kiếm biển số"
        className="w-full outline-none bg-gray-100 rounded-lg"
        startContent={<i className="fas fa-search text-gray-500 mr-2"></i>}
      />
      <div className="mt-4">
        <CustomTable columns={columns} data={data} isLoading={loading} />
      </div>
    </div>
  );
}
