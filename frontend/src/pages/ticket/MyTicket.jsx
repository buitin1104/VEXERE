import { CustomTable } from '@components/custom-table/CustomTable';
import ConfirmModal from '@components/modal/ConfirmModal';
import { Button, Card, CardBody, Chip } from '@nextui-org/react';
import { TICKET_STATUS } from '@utils/constants';
import { getDate, ToastInfo, ToastNotiError } from '@utils/Utils';
import { default as React, useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/SideBar';
import { useAuth } from '../../context/AuthContext';
import { useModalCommon } from '../../context/ModalContext';
import { factories } from '../../factory';
import TicketModal from './TicketModal';

export default function MyTicketPage() {
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
        <>
          <Button
            onClick={() => openDetail(row)}
            variant="light"
            className="rounded-lg"
            color={'primary'}
          >
            Xem chi tiết
          </Button>
          {row.status === 1 && (
            <Button
              onClick={() => openConfirm(row)}
              variant="light"
              className="rounded-lg"
              color={'danger'}
            >
              Huỷ vé
            </Button>
          )}
        </>
      ),
    },
  ];
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState();
  const { onOpen } = useModalCommon();
  const { auth } = useAuth();
  useEffect(() => {
    if (auth) {
      loadList();
    }
  }, [auth]);
  function loadList() {
    setLoading(true);
    const params = {
      userId: auth._id,
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
  function openConfirm(row) {
    onOpen({
      view: (
        <ConfirmModal
          content="Xác nhận huỷ vé đã đặt?"
          onSubmit={() => onCancelTicket(row._id)}
        />
      ),
      title: 'Chi tiết vé',
      size: 'xl',
    });
  }

  function onCancelTicket(id) {
    factories
      .cancelTicket(id)
      .then(() => {
        ToastInfo('Huỷ vé thành công');
      })
      .catch((e) => {
        ToastNotiError(e.response.data.message);
      })
      .finally(() => {
        loadList();
      });
  }
  return (
    <div className="mx-auto my-20 flex justify-center items-center">
      <div className="flex w-full max-w-[80%] gap-6">
        <div className="w-fit">
          <Sidebar />
        </div>
        <div className="flex flex-grow">
          <Card className="w-full">
            <CardBody className="w-full gap-4">
              <div className="flex flex-row justify-between p-2">
                <h5 className="text-2xl font-bold">Lịch sử đặt vé</h5>
              </div>
              <div>
                <CustomTable
                  columns={columns}
                  data={data ?? []}
                  isLoading={loading}
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
