import StarIcon from '@assets/base/icon/Star';
import { Time } from '@internationalized/date';
import {
  Accordion,
  AccordionItem,
  Button,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Slider,
  TimeInput,
} from '@nextui-org/react';
import { AMENITIES, BUSES_LIST } from '@utils/constants';
import React from 'react';
export default function SideBarSearch() {
  return (
    <div className="px-2">
      <div className="w-64">
        <div className="flex flex-col rounded-lg border p-4 shadow-lg">
          <h2 className="mb-2 font-bold">Sắp xếp</h2>
          <div className="mb-4">
            <RadioGroup>
              <Radio value="S1">Mặc định</Radio>
              <Radio value="S2"> Giờ đi sớm nhất </Radio>
              <Radio value="S3"> Giờ đi muộn nhất</Radio>
              <Radio value="S4"> Đánh giá cao nhất</Radio>
              <Radio value="S5"> Giá tăng dần</Radio>
              <Radio value="S6"> Giá giảm dần</Radio>
            </RadioGroup>
          </div>
        </div>
        <div className="mb-4 rounded-lg border py-4 px-4 mt-4  shadow-lg">
          <h3 className="mb-2 font-semibold">Bộ lọc</h3>
          <Accordion className="px-0" variant="light">
            <AccordionItem key="1" aria-label="Giờ đi" title="Giờ đi">
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
            </AccordionItem>
            <AccordionItem key="2" aria-label="Giá vé" title="Giá vé">
              <div className="">
                <Slider
                  step={50}
                  label="Giá"
                  minValue={100000}
                  maxValue={2000000}
                  defaultValue={[100000, 2000000]}
                  formatOptions={{ style: 'currency', currency: 'VND' }}
                  className="max-w-md"
                />
              </div>
            </AccordionItem>
            <AccordionItem key="3" title="Tiêu chí phổ biến">
              <div className="flex flex-col gap-1 ">
                <CheckboxGroup label="">
                  {AMENITIES.map((x) => (
                    <Checkbox value={x.id}>{x.name}</Checkbox>
                  ))}
                </CheckboxGroup>
              </div>
            </AccordionItem>
            <AccordionItem key="4" title="Loại xe">
              <div className="flex flex-col gap-1 ">
                <CheckboxGroup label="">
                  {BUSES_LIST.map((x) => (
                    <Checkbox value={x.id}>{x.name}</Checkbox>
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
