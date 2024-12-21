import { CustomTable } from '@components/custom-table/CustomTable';
import { Button, Chip, Tab, Tabs } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';

import TicketModal from '@pages/ticket/TicketModal';
import { ROLES, TICKET_STATUS } from '@utils/constants';
import { getDate } from '@utils/Utils';
import { useAuth } from '../../context/AuthContext';
import { useModalCommon } from '../../context/ModalContext';
import { factories } from '../../factory';

export default function TicketListPage() {
  const [activeTab, setActiveTab] = useState();
  const [keyword, setKeyword] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState();
  const { onOpen } = useModalCommon();
  const { auth } = useAuth();
  useEffect(() => {
    if (auth) {
      loadList();
    }
  }, [auth, activeTab, keyword]);

  function getBranchId(auth) {
    if (auth.roles[0] === ROLES.BUS_OWNER) {
      return auth._id;
    }
    if (auth.roles[0] === ROLES.TICKET_CONTROLLER) {
      return auth.bossId;
    }
    return null;
  }
  function loadList() {
    setLoading(true);

    const params = {
      ...(getBranchId(auth) && { branchId: getBranchId(auth) }),
      ...(keyword ? { keyword } : {}),
      status: activeTab,
      page: pagination?.current,
    };
    factories
      .getListTicket(params)
      .then((data) => {
        setData(data?.tickets);
        setLoading(false);
        setPagination(data.pagination);
      })
      .finally(() => setLoading(false));
  }
  function openDetail(row) {
    onOpen({
      view: <TicketModal item={row} onReload={loadList} />,
      title: 'Chi tiết vé',
      size: 'xl',
    });
  }
  const columns = [
    {
      id: 'BusName',
      label: 'Tên xe',
      renderCell: (row) => <div className="w-28">{row.bus.busNumber}</div>,
    },
    {
      id: 'fullName',
      label: 'Khách hàng',
      renderCell: (row) => <div className="w-28">{row?.userId?.fullName}</div>,
    },
    {
      id: 'amil',
      label: 'email',
      renderCell: (row) => <div className="w-32">{row?.userId?.email}</div>,
    },
    {
      id: 'phone',
      label: 'SĐT',
      renderCell: (row) => <div className="w-28">{row?.userId?.phone}</div>,
    },
    {
      id: 'Route',
      label: 'Đi từ',
      renderCell: (row) => (
        <div className="w-32">
          <span>{row.tripId.origin.name}</span>
        </div>
      ),
    },
    {
      id: 'Route2',
      label: 'Đi đên',
      renderCell: (row) => (
        <div className="w-32">
          <span>{row.tripId.destination.name}</span>
        </div>
      ),
    },
    {
      id: 'time',
      label: 'Thời Gian',
      renderCell: (row) => (
        <div className="w-32">{getDate(row.tripId.departureTime, 3)}</div>
      ),
    },
    {
      id: 'Status',
      label: 'Trạng Thái',
      renderCell: (row) => (
        <Chip
          color={TICKET_STATUS.find((x) => x.value === row.status)?.color}
          className="text-white"
        >
          {TICKET_STATUS.find((x) => x.value === row.status)?.label}
        </Chip>
      ),
    },
    {
      id: 'detail',
      label: '',
      renderCell: (row) => (
        <Button
          onClick={() => openDetail(row)}
          variant="light"
          className="rounded-lg"
          color={'primary'}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];
  return (
    <div className="bg-white rounded shadow-md px-4 py-3 h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex">
          <Tabs
            variant="light"
            color="primary"
            aria-label="Tabs colors"
            radius="lg"
            selectedKey={activeTab}
            onSelectionChange={setActiveTab}
          >
            <Tab key="" title="Tất cả" />
            <Tab key="1" title="Đã đặt" />
            <Tab key="2" title="Đã hủy" />
            <Tab key="4" title="Đã đánh giá" />
          </Tabs>
        </div>
      </div>

      {/* <Input
        type="text"
        placeholder="Tìm kiếm tên, số điện thoại"
        className="w-full outline-none bg-gray-100 rounded-lg"
        onChange={(e) => setKeyword(e.target.value)}
        startContent={<i className="fas fa-search text-gray-500 mr-2"></i>}
      /> */}
      <div className="mt-4">
        <CustomTable columns={columns} data={data ?? []} isLoading={loading} />{' '}
      </div>
    </div>
  );
}
