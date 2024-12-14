import { CustomTable } from '@components/custom-table/CustomTable';
import { Button, Chip, Input, Tab, Tabs } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';

import TicketModal from '@pages/ticket/TicketModal';
import { TICKET_STATUS } from '@utils/constants';
import { getDate } from '@utils/Utils';
import { useAuth } from '../../context/AuthContext';
import { useModalCommon } from '../../context/ModalContext';
import { factories } from '../../factory';

export default function TicketListPage() {
  const [activeTab, setActiveTab] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState();
  const { onOpen } = useModalCommon();
  const { auth } = useAuth();
  useEffect(() => {
    if (auth) {
      loadList();
    }
  }, [auth, activeTab]);
  function loadList() {
    setLoading(true);
    const params = {
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

      <Input
        type="text"
        placeholder="Tìm kiếm tên, số điện thoại"
        className="w-full outline-none bg-gray-100 rounded-lg"
        startContent={<i className="fas fa-search text-gray-500 mr-2"></i>}
      />
      <div className="mt-4">
        <CustomTable columns={columns} data={data ?? []} isLoading={loading} />{' '}
      </div>
    </div>
  );
}
