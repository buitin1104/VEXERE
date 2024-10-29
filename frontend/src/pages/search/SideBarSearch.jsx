import MapView from '@components/map/MapView'
import {Checkbox, Slider} from '@nextui-org/react'
import React from 'react'

export default function SideBarSearch() {
	return (
		<div className="px-2">
			<MapView
				isMine
				zoomIn={10}
				height="140px"
				width="100%"
			/>
			<div className="w-64 rounded-lg border p-4">
				<div className="mb-4">
					<h2 className="mb-2 font-bold">Chọn lọc theo:</h2>
					<div className="mb-4">
						<h3 className="mb-2 font-semibold">Dùng các bộ lọc cũ</h3>
						<div className="mb-2 flex items-center">
							<Checkbox
								type="checkbox"
								className="mr-2"
							/>
							<label>Cho phép mang theo vật nuôi 165</label>
						</div>
						<div className="mb-2 flex items-center">
							<Checkbox
								type="checkbox"
								className="mr-2"
							/>
							<label>Resort 43</label>
						</div>
						<div className="mb-2 flex items-center">
							<Checkbox
								type="checkbox"
								className="mr-2"
							/>
							<label>Nhà hàng 380</label>
						</div>
						<div className="mb-2 flex items-center">
							<Checkbox
								type="checkbox"
								className="mr-2"
							/>
							<label>Chỗ đỗ xe 791</label>
						</div>
						<div className="mb-2 flex items-center">
							<Checkbox
								type="checkbox"
								className="mr-2"
							/>
							<label>Bãi biển Mỹ Khê 379</label>
						</div>
						<div className="mb-2 flex items-center">
							<Checkbox
								type="checkbox"
								className="mr-2"
							/>
							<label>Nhìn ra biển 314</label>
						</div>
						<div className="mb-2 flex items-center">
							<Checkbox
								type="checkbox"
								className="mr-2"
							/>
							<label>Biệt thự 80</label>
						</div>
					</div>
					<div className="mb-4">
						<h3 className="mb-2 font-semibold">Ngân sách của bạn (mỗi đêm)</h3>
						<Slider
							label="Giá:"
							step={50}
							minValue={100000}
							maxValue={30000000}
							defaultValue={[100000, 500000]}
							formatOptions={{style: 'currency', currency: 'VND'}}
							className="max-w-md"
						/>
					</div>
					<div className="mb-4">
						<h3 className="mb-2 font-semibold">Các bộ lọc phổ biến</h3>
						<div className="mb-2 flex items-center">
							<Checkbox
								type="checkbox"
								className="mr-2"
							/>
							<label>Đặt phòng không cần thẻ tín dụng 469</label>
						</div>
						<div className="mb-2 flex items-center">
							<Checkbox
								type="checkbox"
								className="mr-2"
							/>
							<label>Căn hộ 239</label>
						</div>
						<div className="mb-2 flex items-center">
							<Checkbox
								type="checkbox"
								className="mr-2"
							/>
							<label>Không cần thanh toán trước 613</label>
						</div>
						<div className="mb-2 flex items-center">
							<Checkbox
								type="checkbox"
								className="mr-2"
							/>
							<label>Biệt thự 80</label>
						</div>
						<div className="mb-2 flex items-center">
							<Checkbox
								type="checkbox"
								className="mr-2"
							/>
							<label>Khách sạn 511</label>
						</div>
						<div className="mb-2 flex items-center">
							<Checkbox
								type="checkbox"
								className="mr-2"
							/>
							<label>Bãi biển 529</label>
						</div>
						<div className="mb-2 flex items-center">
							<Checkbox
								type="checkbox"
								className="mr-2"
							/>
							<label>Tuyệt hảo: 9 điểm trở lên 223</label>
						</div>
						<div className="mb-2 flex items-center">
							<Checkbox
								type="checkbox"
								className="mr-2"
							/>
							<label>Miễn phí hủy 212</label>
						</div>
					</div>
					<div className="mb-4">
						<h3 className="mb-2 font-semibold">Tiện nghi</h3>
						<div className="mb-2 flex items-center">
							<Checkbox
								type="checkbox"
								className="mr-2"
							/>
							<label>Chỗ đỗ xe 791</label>
						</div>
						<div className="mb-2 flex items-center">
							<Checkbox
								type="checkbox"
								className="mr-2"
							/>
							<label>Nhà hàng 380</label>
						</div>
						<div className="mb-2 flex items-center">
							<Checkbox
								type="checkbox"
								className="mr-2"
							/>
							<label>Cho phép mang theo vật nuôi 165</label>
						</div>
						<div className="mb-2 flex items-center">
							<Checkbox
								type="checkbox"
								className="mr-2"
							/>
							<label>Dịch vụ phòng 626</label>
						</div>
						<div className="mb-2 flex items-center">
							<Checkbox
								type="checkbox"
								className="mr-2"
							/>
							<label>Lễ tân 24 giờ 676</label>
						</div>
						<div className="mb-2 flex items-center">
							<Checkbox
								type="checkbox"
								className="mr-2"
							/>
							<label>Khách sạn 511</label>
						</div>
					</div>
					<div className="cursor-pointer text-blue-500">Hiển thị tất cả 15 loại</div>
				</div>
			</div>
		</div>
	)
}
