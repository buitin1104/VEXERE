import StarIcon from '@assets/base/icon/Star';
import { Flex } from '@chakra-ui/react';
import {
  Accordion,
  AccordionItem,
  Button,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Slider,
} from '@nextui-org/react';
import { AMENITIES, BUSES_LIST } from '@utils/constants';
import React, { useEffect, useState } from 'react';
import useRouter from '../../../hook/use-router';
export default function SideBarSearch() {
  const [typeSort, setTypeSort] = useState('S2');
  const [amenitiesSearch, setAmenitiesSearch] = useState([]);
  const [rateCount, setRateCount] = useState();
  const [price, setPrice] = useState([100000, 2000000]);
  const [typeBus, setTypeBus] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const newParams = {
      sort: typeSort,
      price: `${price[0]},${price[1]}`,
      rate: rateCount,
      type: typeBus,
      amenities: amenitiesSearch,
    };
    if (amenitiesSearch.length > 0) {
      newParams.amenities = amenitiesSearch.join(',');
    }
    if (typeBus.length > 0) {
      newParams.type = typeBus.join(',');
    }
    router.replace(newParams);
  }, [typeSort, typeBus, rateCount]);
  const handleSearch = () => {
    const newParams = {
      sort: typeSort,
      price: `${price[0]},${price[1]}`,
      amenities: amenitiesSearch.join(','),
      type: typeBus.join(','),
    };
    router.replace(newParams);
  };

  function handleChangeAmenity(value) {
    if (amenitiesSearch.includes(value)) {
      setAmenitiesSearch(amenitiesSearch.filter((item) => item !== value));
    } else {
      setAmenitiesSearch([...amenitiesSearch, value]);
    }
  }

  function handleChangeType(value) {
    if (typeBus.includes(value)) {
      setTypeBus(typeBus.filter((item) => item !== value));
    } else {
      setTypeBus([...typeBus, value]);
    }
  }
  return (
    <div className="px-2">
      <div className="w-64">
        <div className="flex flex-col rounded-lg border p-4 shadow-lg">
          <h2 className="mb-2 font-bold">Sắp xếp</h2>
          <div className="mb-4">
            <RadioGroup
              defaultValue="S2"
              onChange={(e) => setTypeSort(e.target.value)}
            >
              <Radio value="S2"> Giờ đi sớm nhất </Radio>
              <Radio value="S3"> Giờ đi muộn nhất</Radio>
              <Radio value="S4"> Giá tăng dần</Radio>
              <Radio value="S5"> Giá giảm dần</Radio>
            </RadioGroup>
          </div>
        </div>
        <div className="mb-4 rounded-lg border py-4 px-4 mt-4  shadow-lg">
          <h3 className="mb-2 font-semibold">Bộ lọc</h3>
          <Accordion className="px-0" variant="light">
            {/* <AccordionItem key="1" aria-label="Thời gian" title="Thời gian">
              <div className="flex flex-row gap-2">
                <TimeInput
                  label="Giờ đi"
                  hourCycle={24}
                  defaultValue={new Time(0, 0)}
                />
                <TimeInput
                  label="Giờ đến"
                  hourCycle={24}
                  defaultValue={new Time(0, 0)}
                />
              </div>
            </AccordionItem> */}
            <AccordionItem key="2" aria-label="Giá vé" title="Giá vé">
              <div className="">
                <Slider
                  step={50}
                  label="Giá"
                  minValue={100000}
                  maxValue={2000000}
                  defaultValue={[100000, 2000000]}
                  onChange={setPrice}
                  formatOptions={{ style: 'currency', currency: 'VND' }}
                  className="max-w-md"
                />
                <Flex justify={'flex-end'} marginTop={1}>
                  <Button onClick={() => handleSearch()}>Áp dụng</Button>
                </Flex>
              </div>
            </AccordionItem>
            <AccordionItem key="3" title="Tiêu chí phổ biến">
              <div className="flex flex-col gap-1 ">
                <CheckboxGroup label="">
                  {AMENITIES.map((x) => (
                    <Checkbox
                      onChange={(e) => handleChangeAmenity(x.id)}
                      value={x.id}
                      isSelected={amenitiesSearch.includes(x.id)}
                    >
                      {x.name}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
                <Button onClick={() => handleSearch()}>Áp dụng</Button>
              </div>
            </AccordionItem>
            <AccordionItem key="4" title="Loại xe">
              <div className="flex flex-col gap-1 ">
                <CheckboxGroup label="">
                  {BUSES_LIST.map((x) => (
                    <Checkbox
                      onChange={(e) => handleChangeType(x.id)}
                      value={x.id}
                      isSelected={typeBus.includes(x.id)}
                    >
                      {x.label}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </div>
            </AccordionItem>
            <AccordionItem key="5" title="Đánh giá">
              <div className="flex flex-col gap-1 w-3/4">
                <Button variant="ghost flex-start" className="flex-start">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  trở lên
                </Button>
                <Button variant="ghost flex-start" className="flex-start">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  trở lên
                </Button>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
