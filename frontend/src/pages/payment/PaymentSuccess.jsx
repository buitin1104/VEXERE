import { Button, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import { convertStringToNumber, ToastNotiError } from '@utils/Utils';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { factories } from '../../factory';

export default function PaymentSuccessPage() {
  const navigator = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlParams);
  const { auth, loading } = useAuth();
  const vnp_Amount = params.vnp_Amount / 100;
  const vnp_BankCode = params.vnp_BankCode;
  const vnp_BankTranNo = params.vnp_BankTranNo;
  //   const vnp_CardType = params.vnp_CardType;
  //   const vnp_OrderInfo = params.vnp_OrderInfo;
  //   const vnp_TransactionNo = params.vnp_TransactionNo;
  const vnp_TxnRef = params.vnp_TxnRef;
  const [status, setStatus] = useState();

  useEffect(() => {
    if (auth && vnp_TxnRef) {
      const data = { userId: auth._id, txnRef: vnp_TxnRef };
      factories
        .updatePayment(data)
        .then((resp) => {
          if (resp.status === 200) {
            setStatus(true);
          } else {
            setStatus(false);
          }
        })
        .catch((error) => {
          ToastNotiError(error?.response?.data?.message);
          setStatus(false);
        });
    }
  }, [vnp_TxnRef, auth]);
  return (
    <div className="mx-auto max-w-full px-5 flex  mt-32 gap-4 mb-20 justify-center">
      <Card css={{ mw: '400px', p: '$10' }}>
        <CardHeader className="flex gap-3">
          {status ? (
            <div className="w-full flex flex-col gap-4 items-center justify-center">
              <div className="flex rounded-full bg-green-100 p-4 w-14 h-14 justify-center items-center">
                <i className="fa fa-check text-green-600 text-xl"></i>
              </div>
              <p className="text-center font-bold">
                Thanh toán giao dịch thành công
              </p>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-4 items-center justify-center">
              <div className="flex rounded-full bg-red p-4 w-14 h-14 justify-center items-center">
                <i className="fa fa-check text-white text-xl"></i>
              </div>
              <p className="text-center font-bold">
                Thanh toán giao dịch thất bại
              </p>
            </div>
          )}
        </CardHeader>
        <Divider />
        <CardBody className="min-w-[330px] gap-5 px-4">
          <div className="flex justify-between items-center">
            <p className="font-bold">Ngân hàng:</p>
            <p>{vnp_BankCode}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold">Mã chuyển khoản:</p>
            <p>{vnp_BankTranNo}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold">Mã giao dịch:</p>
            <p>{vnp_TxnRef}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold">Số tiền:</p>
            <p>{convertStringToNumber(vnp_Amount)}</p>
          </div>
          <Button
            className="mt-5"
            auto
            color="primary"
            onPress={() => navigator('/')}
          >
            Trang chủ
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
