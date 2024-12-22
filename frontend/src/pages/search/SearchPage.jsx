import { getLocalTimeZone, now } from '@internationalized/date';
import {
  Button,
  DatePicker,
  Select,
  SelectItem,
  Spinner,
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { factories } from '../../factory';
import useRouter from '../../hook/use-router';
import SearchResult from './section/SearchResult';
import SideBarSearch from './section/SideBarSearch';

export default function SearchPage() {
  const router = useRouter();
  const {
    fromCity,
    toCity,
    busTripId,
    branchName,
    departureDateTime,
    amenities,
    isWithPet,
    price,
    page = 1,
    limit = 100,
    sort,
    type,
  } = router.getAll();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    setLoading(true);
    const newData = {
      fromCity,
      busTripId,
      toCity,
      departureDateTime: departureDateTime ? departureDateTime : new Date(),
      amenities,
      isWithPet,
      price,
      page,
      limit,
      sort,
      type,
    };
    factories
      .getBusTripSearch(newData)
      .then((data) => setData(data ?? []))
      .finally(() => setLoading(false));
  }, [
    fromCity,
    toCity,
    departureDateTime,
    amenities,
    price,
    page,
    limit,
    sort,
    type,
  ]);

  function handleSearch() {
    console.log('/search');
  }

  function Search() {
    return (
      <div className="items-center flex flex-col justify-center shadow-sm my-10 border rounded-xl overflow-hidden">
        <div className=" w-full flex h-full flex-col items-center justify-center gap-1 bg-white p-4 xl:flex-row">
          <Select
            className="flex-4 xl:flex-3 border-nonet"
            variant="flat"
            radius="sm"
            label="Nơi xuất phát"
            defaultSelectedKeys={[1]}
            placeholder="Bạn muốn đến đâu?"
            startContent={<i className="fas fa-dot-circle text-blue-500"></i>}
          >
            <SelectItem key={1}>{'Hội An'}</SelectItem>
            <SelectItem key={2}>{'Đà Nẵng'}</SelectItem>
            <SelectItem key={3}>{'Đà Lạt'}</SelectItem>
          </Select>

          <div className=" flex flex-col h-full rounded-full p-2 bg-gray-200 border-blue-500 justify-center items-center ">
            <i className="fas fa-exchange-alt text-gray-400"></i>
          </div>

          <Select
            className="flex-4 xl:flex-3 border-none"
            //   style={{
            //     backgroundColor: 'transparent',
            //   }}
            variant="flat"
            radius="sm"
            label="Nơi đến"
            defaultSelectedKeys={[1]}
            placeholder="Bạn muốn đến đâu?"
            startContent={<i className="fas fa-map-marker-alt text-error"></i>}
          >
            <SelectItem key={1}>{'Hội An'}</SelectItem>
            <SelectItem key={2}>{'Đà Nẵng'}</SelectItem>
            <SelectItem key={3}>{'Đà Lạt'}</SelectItem>
          </Select>

          <div className="flex flex-col h-full rounded-full p-2 mx-0 justify-center items-center ">
            {/* <i className="fas fa-exchange-alt text-gray-400"></i> */}
          </div>
          <DatePicker
            label="Ngày đi"
            radius="sm"
            classNames={{
              base: 'bg-white',
              selectorButton: 'bg-white',
              inputWrapper: 'bg-transparent',
              input: 'bg-white',
              // input,
            }}
            hideTimeZone
            showMonthAndYearPickers
            className="bg-white"
            defaultValue={now(getLocalTimeZone())}
          />
          <div className="flex flex-col h-full rounded-full p-2 mx-0 justify-center items-center "></div>
          <Button
            onClick={handleSearch}
            variant="solid"
            radius="sm"
            className="w-full min-w-[200px] bg-yellow-300 text-white px-4 py-2 text-xl xl:w-fit h-14"
          >
            Tìm kiếm
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-full px-5 lg:max-w-[80%] lg:px-0 2xl:max-w-[60%]">
      {/* <div className="w-full ">
        <Search />
      </div> */}
      <div className="mt-16 flex flex-row gap-4">
        <div className="w-64">
          <SideBarSearch />
        </div>
        <div className="flex-grow ">
          {loading ? (
            <div className="flex flex-row justify-center items-center mt-10">
              <Spinner />
            </div>
          ) : (
            <SearchResult data={data} />
          )}
        </div>
      </div>
    </div>
  );
}
