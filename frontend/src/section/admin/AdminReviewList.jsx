import { CustomTable } from '@components/custom-table/CustomTable';
import { Button, Tab, Tabs } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';

import TicketModal from '@pages/ticket/TicketModal';
import { getDate, ToastInfo, ToastNotiError } from '@utils/Utils';
import { useAuth } from '../../context/AuthContext';
import { useModalCommon } from '../../context/ModalContext';
import { factories } from '../../factory';

export default function AdminReviewList() {
  const [activeTab, setActiveTab] = useState(true);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { onOpen } = useModalCommon();
  const { auth } = useAuth();
  useEffect(() => {
    if (auth) {
      loadList();
    }
  }, [auth, activeTab]);
  function loadList() {
    setLoading(true);
    const params = activeTab === '2' ? { isShow: 1 } : {};
    factories
      .getReviews(params)
      .then((data) => {
        setData(data);
        setLoading(false);
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
      renderCell: (row) => <div className="w-24">{row.bus.busNumber}</div>,
    },
    {
      id: 'BusName2',
      label: 'Tài xế',
      renderCell: (row) => <div className="w-24">{row.driverId.fullName}</div>,
    },
    {
      id: 'Route',
      label: 'Đi từ',
      renderCell: (row) => (
        <div className="w-28">
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
      id: 'user',
      label: 'Người đánh giá',
      renderCell: (row) => <div className="w-32">{row?.userId?.fullName}</div>,
    },
    {
      id: 'star2',
      label: 'Số sao',
      renderCell: (row) => (
        <div className="w-32">
          {[...Array(5)].map((_, i) => (
            <i
              key={i}
              className={`fa${i < row.star ? 's' : 'r'} fa-star text-yellow-500`}
            ></i>
          ))}
        </div>
      ),
    },
    {
      id: 'star',
      label: 'Đánh giá',
      renderCell: (row) => <div className="w-72">{row?.review}</div>,
    },
    {
      id: 'pin',
      label: 'Ghim',
      renderCell: (row) => (
        <Button
          size="sm"
          color={row.isShow ? 'secondary' : 'primary'}
          onClick={() => handleChangeStatus(row._id, row.isShow ? false : true)}
        >
          {row.isShow ? 'Bỏ ghim' : 'Ghim'}
        </Button>
      ),
    },
  ];
  function handleChangeStatus(id, status) {
    factories
      .updatePinReview(id, status)
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
            <Tab key="1" title="Tất cả" />
            <Tab key="2" title="Đã ghim" />
          </Tabs>
        </div>
      </div>
      <div className="mt-4">
        <CustomTable
          columns={columns}
          data={data ?? []}
          isLoading={loading}
          isShowPagination={false}
        />
      </div>
    </div>
  );
}
