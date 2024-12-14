import { CustomTable } from '@components/custom-table/CustomTable';
import Sidebar from '@components/sidebar/SideBar';
import { Button, Card, CardBody, Chip } from '@nextui-org/react';
import { convertStringToNumber, getDate } from '@utils/Utils';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useModalCommon } from '../../context/ModalContext';
import { factories } from '../../factory';
import AddWalletModal from './AddWalletModal';

const columns = [
  {
    id: 'code',
    label: 'Mã giao dịch',
    renderCell: (row) => <div className="w-20">{row.txnRef}</div>,
  },
  {
    id: 'time',
    label: 'Thời Gian',
    renderCell: (row) => (
      <div className="flex-grow">{getDate(row.createAt, 5)}</div>
    ),
  },
  {
    id: 'description',
    label: 'Nội dung giao dịch',
    renderCell: (row) => <div className="flex-grow">{row.description}</div>,
  },
  {
    id: 'amount',
    label: 'Số tiền',
    renderCell: (row) => (
      <div className="w-20">
        <span className="">{convertStringToNumber(row.amount)}</span>
      </div>
    ),
  },
  {
    id: 'Status',
    label: 'Trạng Thái',
    renderCell: (row) => (
      <Chip color={row.status === 1 ? 'primary' : 'default'}>
        {row.status ? 'Thành công' : 'Thất bại'}
      </Chip>
    ),
  },
];

export default function MyWalletPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [balance, setBalance] = useState(0);
  const [pagination, setPagination] = useState();
  const { auth } = useAuth();
  const { onOpen } = useModalCommon();
  function loadList() {
    setLoading(true);
    factories
      .getWalletInfo(auth._id)
      .then((data) => {
        setData(data?.payments);
        setBalance(data?.balance);
        setLoading(false);
        setPagination(data.pagination);
      })
      .finally(() => setLoading(false));
  }
  function handleAddWallet() {
    onOpen({
      title: 'Nộp tiền',
      view: <AddWalletModal />,
    });
  }
  useEffect(() => {
    if (!auth?._id) return;
    loadList();
  }, [auth]);
  return (
    <div className="mx-auto my-20 flex justify-center">
      <div className="flex w-full max-w-[80%] gap-6">
        <div className="w-fit">
          <Sidebar active="1" />
        </div>
        <div className="flex flex-grow">
          <Card className="w-full">
            <CardBody className="w-full gap-4">
              <div className="flex flex-row justify-between p-2">
                <h5 className="text-2xl font-bold">Số dư ví</h5>
                <div className="flex flex-col gap-2 justify-end items-end">
                  <span className="text-2xl font-bold">
                    {convertStringToNumber(balance)}
                  </span>
                  <Button color="primary" onPress={() => handleAddWallet()}>
                    Nộp tiền
                  </Button>
                </div>
              </div>

              <div className="flex flex-row justify-between p-2">
                <h5 className="text-2xl font-bold">Lịch sử giao dịch</h5>
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
