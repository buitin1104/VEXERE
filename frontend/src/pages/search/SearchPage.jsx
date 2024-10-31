import { getLocalTimeZone, now } from '@internationalized/date';
import { Button, DatePicker, Select, SelectItem } from '@nextui-org/react';
import React from 'react';
import SearchResult from './section/SearchResult';
import SideBarSearch from './section/SideBarSearch';

export default function SearchPage() {
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
      <div className="w-full ">
        <Search />
      </div>
      <div className="flex flex-row gap-4">
        <div className="w-64">
          <SideBarSearch />
        </div>
        <div className="flex-grow ">
          <SearchResult />
        </div>
      </div>
    </div>
  );
}
