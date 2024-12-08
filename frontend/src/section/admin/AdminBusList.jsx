import { CustomTable } from '@components/custom-table/CustomTable';
import { Button, Input, Tooltip } from '@nextui-org/react';
import { BUSES_LIST } from '@utils/constants';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useModalCommon } from '../../context/ModalContext';
import { factories } from '../../factory/index';
import CreateBusModal from './modal/CreateBusModal';

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
        <Tooltip content="Xóa">
          <Button variant="ghost" size="sm" className="border-none max-w-8 h-8">
            <i className="fas fa-trash-alt text-pink-500 text-sm"></i>
          </Button>
        </Tooltip>
      </div>
    ),
  },
];

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

  function createBus() {
    onOpen({
      view: <CreateBusModal onReload={loadList} />,
      title: 'Tạo xe mới',
      size: '2xl',
    });
  }
  function loadList() {
    setLoading(true);
    const params = {
      ownerId: isAdmin ? '' : auth._id,
      page: pagination?.current,
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
      <div className="flex items-center justify-between mb-3">
        <div className="mt-2 flex justify-end items-center w-full">
          {/* <Tabs
            variant="light"
            color="primary"
            aria-label="Tabs colors"
            radius="lg"
            selectedKey={activeTab}
            onSelectionChange={setActiveTab}
          >
            <Tab key="1" title="Tất cả" />
            <Tab key="2" title="Đang hoạt động" />
            <Tab key="3" title="Đang tạm nghỉ" />
          </Tabs> */}
          <Button onClick={createBus} size="sm" color="primary">
            Tạo mới xe
          </Button>
        </div>
      </div>

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
