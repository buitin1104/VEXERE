import DatePickerField from '@components/common/DatePickerField';
import InputField from '@components/common/InputField';
import InputQuillForm from '@components/common/InputQuillForm';
import SelectField from '@components/common/SelectField';
import { getLocalTimeZone, now } from '@internationalized/date';
import { Button, Checkbox, Spinner } from '@nextui-org/react';
import { AMENITIES, BUSES_LIST, PROVINCES, ROLES } from '@utils/constants';
import { getDate, ToastInfo, ToastNotiError } from '@utils/Utils';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAuth } from '../../../context/AuthContext';
import { useModalCommon } from '../../../context/ModalContext';
import { factories } from '../../../factory';

export default function CreateBusTripModal({ onReload, item }) {
  const [formReady, setFormReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [locations, setLocations] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [buses, setBuses] = useState([]);
  const { auth } = useAuth();
  const { onClose } = useModalCommon();
  const methods = useForm();
  const { watch, setValue } = methods;
  useEffect(() => {
    setFormReady(false);
    fetchData();
  }, []);

  useEffect(() => {
    if (item) {
      setValue('bus', item.bus._id);
      setValue('driverId', item.driverId._id);
      setValue('origin', item.origin._id);
      setValue('destination', item.destination._id);
      //   setValue('departureTime', getDate(item.departureTime, 16));
      //   setValue('arrivalTime', getDate(item.arrivalTime, 16));
      setAmenities(item.amenity);
      setValue('price', item.price);
    }
  }, [item]);
  console.log(watch());
  async function fetchData() {
    ``;
    await loadListUser();
    await loadListLocation();
    await loadListBus();
    setFormReady(true);
  }

  const loadListUser = async () => {
    const params = {
      roles: ROLES.TICKET_CONTROLLER,
      status: true,
      bossId: auth._id,
      ownerId: auth._id,
      limit: 100,
    };
    factories.getListUser(params).then((data) => {
      const users = data?.users.map((item) => ({
        value: item._id,
        label: item.fullName,
      }));
      setUsers(users);
    });
  };

  const loadListLocation = async () => {
    factories.getListLocation().then((data) => {
      const locations = data?.locations.map((item) => ({
        value: item._id,
        label:
          item.name + ' - ' + PROVINCES.find((x) => x.value == item.city).label,
      }));
      setLocations(locations);
    });
  };

  const loadListBus = async () => {
    const params = {
      ownerId: auth._id,
      limit: 100,
    };
    factories.getListBuses(params).then((data) => {
      const bus_list = data?.buses.map((item) => ({
        value: item._id,
        label:
          item.busNumber +
          ' - ' +
          BUSES_LIST.find((x) => x.id == item.busModel).label,
      }));
      setBuses(bus_list);
    });
  };

  async function handleSave(values) {
    setIsLoading(true);
    let data = {
      ...values,
      price: Number(values.price),
      departureTime: getDate(values.departureTime, 14),
      arrivalTime: getDate(values.arrivalTime, 14),
      amenity: amenities,
    };
    if (item?._id) {
      factories
        .editBusTrip(data, item._id)
        .then(() => {
          ToastInfo('Cập nhật chuyến xe thành công');
          onClose();
          onReload();
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.response?.data?.message) {
            ToastNotiError(err.response?.data?.message);
          }
          setIsLoading(false);
        });
      return;
    }
    factories
      .createNewBusTrip(data)
      .then(() => {
        ToastInfo('Tạo mới chuyến xe thành công');
        onClose();
        onReload();
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          ToastNotiError(err.response?.data?.message);
        }
        setIsLoading(false);
      });
  }

  function handleChooseAmenity(id) {
    const newList = amenities.includes(id)
      ? amenities.filter((amenityId) => amenityId !== id)
      : [...amenities, id];
    setAmenities(newList);
  }
  function handleChoosePayment(id) {
    const newList = paymentMethods.includes(id)
      ? paymentMethods.filter((paymentMethod) => paymentMethod !== id)
      : [...paymentMethods, id];
    setPaymentMethods(newList);
  }
  return (
    <div className="p-5 pt-0 flex flex-col gap-4">
      {!formReady ? (
        <Spinner />
      ) : (
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleSave)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-4 max-h-[70vh] overflow-scroll">
              <div className="flex flex-row gap-2 w-full">
                <SelectField
                  options={buses || []}
                  placeholder="Chọn xe"
                  label="Chọn xe"
                  name={'bus'}
                  isRequired
                  validate={{ required: 'Bắt buộc chọn' }}
                />
                <SelectField
                  options={users || []}
                  placeholder="Chọn tài xế"
                  label="Chọn tài xế"
                  name={'driverId'}
                  isRequired
                  validate={{ required: 'Bắt buộc chọn tài xế' }}
                />
              </div>
              <div className="flex flex-row gap-2">
                <SelectField
                  options={locations || []}
                  placeholder="Chọn điểm đón"
                  isRequired
                  label="Điểm đón"
                  isMultiple
                  validate={{ required: 'Bắt buộc chọn' }}
                  name={'origin'}
                />
                <SelectField
                  options={
                    locations.filter((x) => x.value !== watch('origin')) || []
                  }
                  placeholder="Chọn điểm trả khách"
                  label="Điểm trả khách"
                  isRequired
                  validate={{ required: 'Bắt buộc chọn' }}
                  isMultiple
                  name={'destination'}
                />
              </div>
              <div className="flex flex-row gap-2">
                <DatePickerField
                  isHaveTime
                  placeholder="Chọn giờ đi"
                  label="Giờ đi"
                  isRequired
                  minValue={now(getLocalTimeZone())}
                  validate={{ required: 'Bắt buộc chọn' }}
                  name={'departureTime'}
                />
                <DatePickerField
                  placeholder="Chọn giờ đến"
                  isHaveTime
                  minValue={watch('departureTime')}
                  validate={{ required: 'Bắt buộc chọn' }}
                  label="Giờ đến"
                  isRequired
                  isMultiple
                  name={'arrivalTime'}
                />
              </div>
              <div className="flex flex-row gap-2">
                <InputField
                  placeholder="Nhập giá vé"
                  isRequired
                  label="Giá vé"
                  validate={{ required: 'Bắt buộc chọn' }}
                  name={'price'}
                />
              </div>
              <div className="bg-neutral-100 p-4 rounded-lg ">
                <p className="text-sm mb-2">Tiện nghi</p>
                <div className="flex flex-wrap gap-4">
                  {AMENITIES.map((x) => (
                    <div className="flex flex-row gap-1">
                      <Checkbox
                        key={x.id}
                        isSelected={amenities.includes(x.id)}
                        onValueChange={() => handleChooseAmenity(x.id)}
                      />
                      <p className="text-sm text-neutral-700">{x.name}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-neutral-100 p-4 rounded-lg ">
                {/* <p className="text-sm mb-2">Phương thức thanh toán</p> */}
                {/* <div className="flex flex-wrap gap-4">
                  {PAYMENT_METHODS.map((x) => (
                    <div className="flex flex-row gap-1">
                      <Checkbox
                        key={x.id}
                        isSelected={paymentMethods.includes(x.id)}
                        onValueChange={() => handleChoosePayment(x.id)}
                      />
                      <p className="text-sm text-neutral-700">{x.label}</p>
                    </div>
                  ))}
                </div> */}
              </div>
              <InputQuillForm
                defaultValue={item?.policy}
                placeholder="Ghi chú quy định"
                label="Quy định"
                name={'policy'}
              />
            </div>
            <Button isLoading={isLoading} type="submit">
              Tạo mới chuyến xe
            </Button>
          </form>
        </FormProvider>
      )}
    </div>
  );
}
