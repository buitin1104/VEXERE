import { CustomTable } from '@components/custom-table/CustomTable';
import { Chip } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';

import { convertStringToNumber, getDate } from '@utils/Utils';
import { useAuth } from '../../context/AuthContext';
import { factories } from '../../factory';

export default function AdminPaymentsPage() {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  //   const [pagination, setPagination] = useState();
  //   const { onOpen } = useModalCommon();
  const { auth } = useAuth();
  useEffect(() => {
    if (auth) {
      loadList();
    }
  }, [auth]);

  function loadList() {
    setLoading(true);
    // const params = {
    //   ...(getBranchId(auth) && { branchId: getBranchId(auth) }),
    //   ...(keyword ? { keyword } : {}),
    //   status: activeTab,
    //   page: pagination?.current,
    // };
    factories
      .getWalletInfo(auth._id)
      .then((data) => {
        setData(data?.payments);
        setBalance(data?.balance);
        setLoading(false);
        // setPagination(data.pagination);
      })
      .finally(() => setLoading(false));
  }

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
        <div className="w-44">
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
  return (
    <div className="bg-white rounded shadow-md px-4 py-3 h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex justify-end w-full mt-5">
          <div className="text-lg font-semibold">
            Tổng số dư: {convertStringToNumber(balance)}
          </div>
          {/* <Tabs
            variant="light"
            color="primary"
            aria-label="Tabs colors"
            radius="lg"
            selectedKey={activeTab}
            onSelectionChange={setActiveTab}
          >
            <Tab key="" title="Tất cả" />
            <Tab key="1" title="Hoan" />
            <Tab key="2" title="Đã hủy" />
            <Tab key="4" title="Đã đánh giá" />
          </Tabs> */}
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
