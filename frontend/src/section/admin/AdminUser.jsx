import RegisterModal from '@components/header/Register';
import ConfirmModal from '@components/modal/ConfirmModal';
import EditUserModal from '@components/modal/EditUserModal';
import { Avatar, Button, Chip, Input, Tab, Tabs } from '@nextui-org/react';
import { GENDER, ROLES, STATUS } from '@utils/constants';
import { ToastInfo, ToastNotiError } from '@utils/Utils';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useModalCommon } from '../../context/ModalContext';
import { factories } from '../../factory';
import { CustomTable } from '@components/custom-table/CustomTable';

export default function AdminUser({ isAdmin }) {
  const { auth } = useAuth();
  const [activeTab, setActiveTab] = useState(
    isAdmin ? '' : ROLES.TICKET_CONTROLLER,
  );
  const [keyword, setKeyword] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState();

  useEffect(() => {
    loadList();
  }, [keyword, activeTab, pagination?.current]);

  function loadList() {
    setLoading(true);
    const params = {
      roles: activeTab,
      page: pagination?.current,
      ...(auth.roles[0] === ROLES.BUS_OWNER && { bossId: auth._id }),
      ...(keyword ? { keyword } : {}),
    };
    factories
      .getListUser(params)
      .then((data) => {
        setData(data?.users);
        setLoading(false);
        setPagination(data.pagination);
      })
      .finally(() => setLoading(false));
  }

  const columns = [
    {
      id: 'name',
      label: 'Họ và tên',
      renderCell: (row) => <div className="w-40">{row?.fullName}</div>,
    },
    {
      id: 'avatar',
      label: 'Ảnh đại diện',
      renderCell: (row) => <Avatar src={row?.profilePictureUrl} />,
    },
    {
      id: 'role',
      label: 'Email',
      renderCell: (row) => <span>{row?.email}</span>,
    },
    {
      id: 'phone',
      label: 'Số điện thoại',
      renderCell: (row) => <span>{row?.phone}</span>,
    },
    {
      id: 'gender',
      label: 'Giới tính',
      renderCell: (row) => <span>{GENDER[row?.gender]}</span>,
    },
    {
      id: 'dob',
      label: 'Ngày sinh',
      renderCell: (row) => <span>{row?.dob}</span>,
    },
    {
      id: 'status',
      label: 'Trạng thái',
      renderCell: (row) => (
        <Chip color={row.status ? 'success' : 'danger'} className="text-white">
          {STATUS[row?.status]}
        </Chip>
      ),
    },
    {
      id: 'action',
      label: 'Tác vụ',
      headCell: () => <span className="text-center w-full">Tác vụ</span>,
      renderCell: (row) => (
        <div className="w-48">
          <Button
            variant="ghost"
            size="sm"
            className="border-none w-2 max-w-2 h-8"
            onClick={() => handleEdit(row)}
          >
            <i className="fas fa-pen text-gray-400 text-sm"></i>
          </Button>
          <Button
            onClick={() => handleDisable(row)}
            variant="ghost"
            size="sm"
            className="border-none max-w-8 h-8"
          >
            {row?.status ? (
              <i className="fas fa-pause text-pink-500 text-sm"></i>
            ) : (
              <i className="fas fa-play text-blue-500 text-sm"></i>
            )}
          </Button>
        </div>
      ),
    },
  ];

  const { onOpen, onClose } = useModalCommon();
  function handleEdit(row) {
    onOpen({
      view: <EditUserModal auth={row} onReload={loadList} />,
      title: 'Chỉnh sửa tài khoản',
      showFooter: false,
      size: '4xl',
    });
  }
  function handleDisable(row) {
    onOpen({
      view: (
        <ConfirmModal
          content="Xác nhận vô hiệu hóa tài khoản này ?"
          onSubmit={() => onDelete(row)}
        />
      ),
      title: 'Xác nhận',
      showFooter: false,
    });
  }
  function onDelete(row) {
    const newValues = {
      ...row,
      status: !row.status,
    };
    factories
      .updateUserInfo(row._id, newValues)
      .then(() => {
        ToastInfo('Cập nhật thông tin thành công');
        onClose();
        loadList();
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          ToastNotiError(err.response?.data?.message);
        }
      });
  }
  function addEmployee() {
    onOpen({
      view: <RegisterModal addEmployee onReload={loadList} bossId={auth._id} />,
      title: 'Đăng ký tài khoản mới',
      showFooter: false,
    });
  }
  return (
    <div className="bg-white rounded px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex">
          {auth?.roles[0] === ROLES.ADMIN ? (
            <>
              <Tabs
                variant="light"
                color="primary"
                aria-label="Tabs colors"
                radius="lg"
                selectedKey={activeTab}
                onSelectionChange={setActiveTab}
              >
                <Tab key="" title="Tất cả" />
                <Tab key={ROLES.USER} title="Khách hàng" />
                <Tab key={ROLES.BUS_OWNER} title="Chủ nhà xe" />
                <Tab key={ROLES.TICKET_CONTROLLER} title="Nhân viên" />
              </Tabs>
            </>
          ) : (
            <Tabs
              variant="light"
              color="primary"
              aria-label="Tabs colors"
              radius="lg"
              selectedKey={activeTab}
              onSelectionChange={setActiveTab}
            >
              <Tab key={ROLES.TICKET_CONTROLLER} title="Nhân viên" />
            </Tabs>
          )}
        </div>
        {auth.roles?.[0] === ROLES.BUS_OWNER && (
          <Button
            onClick={addEmployee}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            size="sm"
          >
            + Thêm nhân viên
          </Button>
        )}
      </div>

      <Input
        type="text"
        placeholder="Tìm kiếm tên, số điện thoại"
        className="w-full outline-none bg-gray-100 rounded-lg"
        onChange={(e) => setKeyword(e.target.value)}
        startContent={<i className="fas fa-search text-gray-500 mr-2"></i>}
      />
      <div className="mt-4">
        <CustomTable columns={columns} data={data} isLoading={loading} />
      </div>
    </div>
  );
}
