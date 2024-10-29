import {Button, DateRangePicker} from '@nextui-org/react'
import {cn} from '@utils/Utils'
import {useRef, useState} from 'react'
import {parseZonedDateTime} from '@internationalized/date'
import {
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
} from '@chakra-ui/react'
import 'leaflet/dist/leaflet.css'
import MapView from '@components/map/MapView'
import GoogleMapLink from '@components/map/GoogleMapLink'
import {roomList} from './mock'
import {amenitiesConst} from '@utils/constData'

const reviews = [
	{
		id: 1,
		name: 'My',
		country: 'Việt Nam',
		avatar: 'https://placehold.co/50x50',
		stayDetails: 'Căn Hộ 1 Phòng Ngủ Có Ban Công',
		stayDuration: '4 đêm · tháng 8/2024',
		stayType: 'Cặp đôi',
		reviewDate: 'Ngày đánh giá: ngày 27 tháng 8 năm 2024',
		title: 'Rẻ bất ngờ',
		rating: 9.0,
		pros: 'Giá rẻ bất ngờ nên mình phải hỏi đi hỏi lại, tiện ích đầy đủ nhưng hơi ngại vì mình phải đổi căn giữa chừng 1 tẹo. Đặt studio 1 phòng ngủ mà bên home toàn đưa căn 2 phòng ngủ nên bị dư ko làm gì luôn. Có karaoke miễn phí và bơi thoải mái, giải trí nữa nên cũng thích, gần trung tâm',
		cons: 'Dụng cụ bếp mình thấy còn hơi chưa sạch sẽ và đầy đủ tiện nghi lắm thôi, còn lại quá okeee',
		response: 'cảm ơn quý khách rất nhiều.hẹn gặp lại quý khách lần sau ạk',
		helpfulCount: 1,
	},
	{
		id: 2,
		name: 'Ngọc',
		country: 'Việt Nam',
		avatar: 'https://placehold.co/50x50',
		stayDetails: 'Căn Hộ 3 Phòng Ngủ Nhìn Ra Biển',
		stayDuration: '1 đêm · tháng 10/2024',
		reviewDate: 'Ngày đánh giá: ngày 9 tháng 10 năm 2024',
		title: 'ok',
		rating: 10,
		pros: 'ok',
		helpfulCount: 0,
	},
]
const latitude = 16.071229 // Vĩ độ mới
const longitude = 108.229786

const htmlContent = `<h1>Chào mừng đến với trang web của tôi!</h1>
                       <p>Đây là một đoạn văn bản được render từ HTML.</p>`

const amenitiesData = ['1', '1.1', '1.2', '1.4', '2', '3', '4', '2.2', '3.1', '3.4']

export default function DetailPage() {
	const overviewRef = useRef()
	const infoRef = useRef()
	const commentsRef = useRef()
	const amenityRef = useRef()
	const noteRef = useRef()
	const policyRef = useRef()

	const [activeSection, setActiveSection] = useState()

	function handlePressScroll(ref) {
		setActiveSection(ref)
		scrollToSection(ref)
	}
	function scrollToSection(ref) {
		if (ref.current) {
			ref.current.scrollIntoView({behavior: 'smooth'})
		}
	}

	return (
		<div className="mx-auto max-w-full px-5 pb-24 pt-10 lg:max-w-[80%] lg:px-0">
			<SectionNavigator />
			<Overview />
			<InfoPrice />
			<PolicyRender />
			<Amenity selectedIds={amenitiesData} />
			<NoteRender note={htmlContent} />
			<CommentList />
		</div>
	)

	// function component UI
	// section
	function SectionNavigator() {
		return (
			<div className="flex w-full flex-grow flex-row overflow-x-auto border-b-1 border-grey-200">
				<Button
					variant="ghost"
					className={cn('h-20 min-w-32 flex-grow rounded-none border-0 border-b-3 border-b-cyan-dark', '')}
					onClick={() => handlePressScroll(overviewRef)}
				>
					Tổng quan
				</Button>
				<Button
					variant="ghost"
					className={cn('h-20 min-w-32 flex-grow rounded-none border-none', activeSection === infoRef)}
					onClick={() => handlePressScroll(infoRef)}
				>
					Phòng và giá vé
				</Button>
				<Button
					variant="ghost"
					className={cn('h-20 flex-grow rounded-none border-none', activeSection === amenityRef)}
					onClick={() => handlePressScroll(amenityRef)}
				>
					Tiện nghi
				</Button>
				<Button
					variant="ghost"
					className={cn('h-20 min-w-32 flex-grow rounded-none border-none', activeSection === policyRef)}
					onClick={() => handlePressScroll(policyRef)}
				>
					Chính sách
				</Button>
				<Button
					variant="ghost"
					className={cn('h-20 min-w-32 flex-grow rounded-none border-none', activeSection === noteRef)}
					onClick={() => handlePressScroll(noteRef)}
				>
					Ghi chú
				</Button>
				<Button
					variant="ghost"
					className={cn('h-20 min-w-32 flex-grow rounded-none border-none', activeSection === commentsRef)}
					onClick={() => handlePressScroll(commentsRef)}
				>
					Bình luận
				</Button>
			</div>
		)
	}
	// overview
	function Overview() {
		return (
			<div
				ref={overviewRef}
				className="my-5"
			>
				<div className="flex items-start justify-between overflow-scroll">
					<div className="w-3/4 min-w-[300px]">
						<h1 className="mb-2 text-3xl font-bold">Temple Da Nang Resort</h1>
						<div className="mb-4 grid grid-cols-3 gap-2">
							<img
								src="https://placehold.co/200x150"
								alt="Resort view 1"
								className="h-auto w-full"
							/>
							<img
								src="https://placehold.co/200x150"
								alt="Resort view 2"
								className="h-auto w-full"
							/>
							<img
								src="https://placehold.co/200x150"
								alt="Resort view 3"
								className="h-auto w-full"
							/>
							<img
								src="https://placehold.co/200x150"
								alt="Resort view 4"
								className="h-auto w-full"
							/>
							<img
								src="https://placehold.co/200x150"
								alt="Resort view 5"
								className="h-auto w-full"
							/>
							<div className="relative">
								<img
									src="https://placehold.co/200x150"
									alt="Resort view 6"
									className="h-auto w-full"
								/>
								<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-lg font-bold text-white">
									+36 ảnh
								</div>
							</div>
						</div>
						<p className="mb-4">
							Bạn có thể đủ điều kiện hưởng giảm giá Genius tại Temple Da Nang Resort. Để biết giảm giá Genius có áp
							dụng cho ngày bạn chọn hay không, hãy <span className="text-blue-600 underline">đăng nhập</span>.
						</p>
						<p className="mb-4">
							Giảm giá Genius tại chỗ nghỉ này chỉ thuộc vào ngày đặt phòng, ngày lưu trú và các ưu đãi có sẵn khác.
						</p>
						<p className="mb-4">
							Nằm trên Bãi biển Mỹ Khê, Temple Da Nang Resort cung cấp chỗ nghỉ với Wi-Fi miễn phí và tầm nhìn ra biển.
							Tại đây cũng có hồ bơi ngoài trời và nhà hàng.
						</p>
						<p className="mb-4">
							Temple Da Nang Resort cách trung tâm thành phố Đà Nẵng 2 km, sân bay quốc tế Đà Nẵng 10 phút lái xe và Núi
							Ngũ Hành Sơn 8 km.
						</p>
						<p className="mb-4">
							Các phòng nghỉ tại đây đều được hoàn thiện với đồ kết an toàn trong phòng, truyền hình cáp màn hình phẳng,
							tủ lạnh mini và máy điều hòa nhiệt độ. Một số phòng nghỉ có bồn tắm và vòi sen hoặc phòng tắm riêng biệt.
							Tất cả các phòng đều có dép, máy sấy tóc và đồ vệ sinh cá nhân miễn phí. Các phòng nghỉ tại đây đều có ban
							công riêng.
						</p>
						<p className="mb-4">
							Tại Temple Da Nang Resort, du khách có thể thư giãn tại khu vực bãi biển riêng, phòng tắm nắng hoặc vườn.
							Các hoạt động như lặn biển, lướt ván buồm, chèo thuyền kayak và lặn với ống thở cũng có thể được sắp xếp
							tại đây. Du khách có thể tham gia các hoạt động như múa bụng, múa lửa và nhạc sống. Tại đây cũng có dịch
							vụ đưa đón có tính phí và dịch vụ giữ hành lý.
						</p>
						<p className="mb-4">Các cặp đôi đặc biệt thích địa điểm này — họ cho điểm 8,8 khi đi du lịch hai người.</p>
					</div>
					<div className="w-1/4 min-w-[200px] rounded-lg bg-gray-100 p-4 shadow-lg">
						<div className="mb-4 flex justify-between">
							<span className="text-lg font-bold">Đánh giá</span>
							<div className="mb-2 flex items-center">
								<i className="fas fa-star text-yellow-500"></i>
								<i className="fas fa-star text-yellow-500"></i>
								<i className="fas fa-star text-yellow-500"></i>
							</div>
						</div>
						<img
							src="https://placehold.co/200x150"
							alt="Map"
							className="mb-4 h-auto w-full"
						/>
						<h2 className="mb-2 text-lg font-bold">Điểm nổi bật của chỗ nghỉ</h2>
						<ul className="mb-4 list-inside list-disc">
							<li>Hoàn hảo cho kỳ nghỉ 1 đêm!</li>
							<li>Địa điểm hàng đầu: Được khách gần đây đánh giá cao (8,8 điểm)</li>
							<li>Thông tin về bữa sáng: Tự chọn</li>
						</ul>
						<h2 className="mb-2 text-lg font-bold">Các lựa chọn của bạn</h2>
						<ul className="mb-4 list-inside list-disc">
							<li>Nhìn ra vườn</li>
							<li>Nhìn ra biển</li>
							<li>Phòng tắm riêng</li>
							<li>Khu vực tiếp khách riêng biệt trong khuôn viên</li>
						</ul>
						<h2 className="mb-2 text-lg font-bold">Hoạt động</h2>
						<ul className="mb-4 list-inside list-disc">
							<li>Lướt ván buồm</li>
							<li>Khu vực bãi tắm riêng</li>
							<li>Khu vực dành cho thả dù dưới nước (trong khuôn viên)</li>
						</ul>
						<button className="w-full rounded-lg bg-blue-600 py-2 text-white">Đặt ngay</button>
					</div>
				</div>
				<div className="flex w-full flex-row justify-between">
					<div className="flex-grow">
						<h2 className="mb-2 text-xl font-bold">Các tiện nghi được ưa chuộng nhất</h2>
						<div className="grid grid-cols-2 gap-2">
							<div className="flex items-center">
								<i className="fas fa-swimming-pool text-green-600"></i>
								<span className="ml-2">Hồ bơi ngoài trời</span>
							</div>
							<div className="flex items-center">
								<i className="fas fa-smoking-ban text-green-600"></i>
								<span className="ml-2">Phòng không hút thuốc</span>
							</div>
							<div className="flex items-center">
								<i className="fas fa-concierge-bell text-green-600"></i>
								<span className="ml-2">Dịch vụ phòng</span>
							</div>
							<div className="flex items-center">
								<i className="fas fa-parking text-green-600"></i>
								<span className="ml-2">Chỗ đỗ xe miễn phí</span>
							</div>
							<div className="flex items-center">
								<i className="fas fa-wifi text-green-600"></i>
								<span className="ml-2">WiFi miễn phí</span>
							</div>
							<div className="flex items-center">
								<i className="fas fa-wheelchair text-green-600"></i>
								<span className="ml-2">Tiện nghi cho khách khuyết tật</span>
							</div>
							<div className="flex items-center">
								<i className="fas fa-utensils text-green-600"></i>
								<span className="ml-2">Nhà hàng</span>
							</div>
							<div className="flex items-center">
								<i className="fas fa-cocktail text-green-600"></i>
								<span className="ml-2">Quầy bar</span>
							</div>
							<div className="flex items-center">
								<i className="fas fa-spa text-green-600"></i>
								<span className="ml-2">Khu vực bãi tắm riêng</span>
							</div>
							<div className="flex items-center">
								<i className="fas fa-sun text-green-600"></i>
								<span className="ml-2">Bữa sáng</span>
							</div>
						</div>
					</div>

					<div className="min-w-[400px]">
						<h2 className="mb-2 w-full text-xl font-bold">Hiển thị trên bản đồ</h2>
						<div className="flex w-full justify-end">
							<GoogleMapLink
								lat={16.071298486798522}
								lng={108.23018477435673}
							/>
						</div>
						<MapView
							zoom={20}
							height={'400px'}
							width={'100%'}
							lat={latitude}
							lng={longitude}
						/>
					</div>
				</div>
			</div>
		)
	}

	function InfoPrice() {
		return (
			<div
				ref={infoRef}
				className="my-10"
			>
				<header className="mb-4 flex items-center justify-between">
					<h1 className="text-3xl font-bold">Phòng trống</h1>
					<div className="flex items-center space-x-2">
						<DateRangePicker
							radius="sm"
							hideTimeZone
							variant="flat"
							visibleMonths={2}
							className="flex-5 border-none"
							defaultValue={{
								start: parseZonedDateTime('2024-04-01T00:45[America/Los_Angeles]'),
								end: parseZonedDateTime('2024-04-08T11:15[America/Los_Angeles]'),
							}}
						/>
						<Button
							onClick={() => {}}
							variant="solid"
							radius="sm"
							className="w-full min-w-[200px] bg-blue-600 px-4 py-2 text-white xl:w-fit"
						>
							Thay đổi tìm kiếm
						</Button>
					</div>
				</header>
				<div className="my-10 flex flex-row">
					<table className="w-full min-w-[900px] border-collapse overflow-scroll">
						<thead>
							<tr className="max-h-12 border-l bg-blue-100">
								<th className="border p-2">Loại chỗ nghỉ</th>
								<th className="border p-2">Số lượng khách</th>
								<th className="border p-2">Giá hôm nay</th>
								<th className="border p-2">Các lựa chọn</th>
								<th className="border p-2">Chọn số lượng</th>
							</tr>
						</thead>
						<tbody>
							{roomList.map((room, index) => (
								<tr
									key={index}
									className=""
								>
									<td className="border p-2">
										<div className="font-bold">{room.type}</div>
										<div className="text-sm">
											<ul>
												<li>1 giường đôi cực lớn</li>
												<li>28 m² Ban công</li>
												<li>Nhìn ra vườn</li>
												<li>Nhìn ra địa danh nổi tiếng</li>
												<li>Phòng tắm riêng</li>
												<li>TV màn hình phẳng</li>
												<li>Điều hòa không khí</li>
												<li>WiFi miễn phí</li>
											</ul>
										</div>
									</td>
									<td className="border p-2 text-center">
										<div className="flex items-center justify-center space-x-1">
											<i className="fas fa-user"></i>
											<i className="fas fa-user"></i>
										</div>
									</td>
									<td className="border p-2 text-center">
										<div className="text-red-600 line-through">{room.originalPrice}</div>
										<div className="font-bold">{room.price}</div>
										<div className="text-green-600">{room.discount}</div>
									</td>
									<td className="border p-2">
										<ul className="text-sm">
											{room.options.map((option, i) => (
												<li
													key={i}
													className={option.includes('Chỉ còn') ? 'text-red-600' : ''}
												>
													{option}
												</li>
											))}
										</ul>
									</td>
									<td className="border p-2 text-center">
										{room.select && (
											<div className="flex items-center justify-center gap-5">
												<NumberInput
													className="max-w-[80px]"
													defaultValue={15}
													min={0}
													max={100}
													clampValueOnBlur={false}
												>
													<NumberInputField />
													<NumberInputStepper>
														<NumberIncrementStepper />
														<NumberDecrementStepper />
													</NumberInputStepper>
												</NumberInput>
											</div>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="flex flex-col border-b border-r">
						<div className="flex h-[66px] min-w-64 items-center justify-center border border-r bg-blue-100 text-center font-bold 2xl:h-[42px]">
							Thanh toán
						</div>
						<div className="sticky right-0 top-0 p-2">
							<div className="mx-auto max-w-xs rounded-lg bg-blue-50 p-4 shadow-md">
								<div className="mb-2 text-sm text-gray-700">2 phòng tổng giá</div>
								<div className="text-2xl font-bold text-gray-900">VND 25.200.000</div>
								<div className="my-2 flex justify-end">
									<Button
										color="primary"
										variant="shadow"
										className="rounded-md"
									>
										Đặt phòng
									</Button>
								</div>
								<div className="mt-4 text-sm text-gray-700">Bạn sẽ được chuyển sang bước kế tiếp</div>
								<ul className="list-inside list-disc text-sm text-gray-700">
									<li>Xác nhận tức thời</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	function Review({review}) {
		return (
			<div className="mb-4 flex w-full flex-row rounded-lg bg-white p-4 shadow">
				<div className="flex w-1/4 items-start">
					<img
						src={review.avatar}
						alt="User avatar"
						className="mr-4 h-12 w-12 rounded-full"
					/>
					<div>
						<div className="mb-1 flex items-center">
							<h3 className="mr-2 font-bold">{review.name}</h3>
							<span className="text-sm text-gray-500">{review.country}</span>
						</div>
						<div className="mb-1 text-sm text-gray-500">{review.stayDetails}</div>
						<div className="mb-1 text-sm text-gray-500">{review.stayDuration}</div>
						<div className="text-sm text-gray-500">{review.stayType}</div>
					</div>
				</div>
				<div className="mt- flex-1">
					<div className="flex items-center justify-between">
						<div className="text-sm text-gray-500">{review.reviewDate}</div>
						<div className="rounded bg-blue-600 px-2 py-1 text-sm font-bold text-white">{review.rating}</div>
					</div>
					<h4 className="mt-2 font-bold">{review.title}</h4>
					<div className="mt-2 flex flex-col">
						<p className="flex items-center text-green-600">
							<i className="fas fa-smile mr-2"></i>
							{review.pros}
						</p>
						{review.cons && (
							<p className="text-red-600 mt-2 flex items-center">
								<i className="fas fa-frown mr-2"></i>
								{review.cons}
							</p>
						)}
					</div>
					{/* {review.response && (
            <div className="bg-gray-100 p-2 rounded mt-4">
              <p className="flex items-center text-gray-700"><i className="fas fa-comment-dots mr-2"></i>Phản hồi của chỗ nghỉ:</p>
              <p className="text-gray-700 mt-1">{review.response}</p>
            </div>
          )} */}
					{/* <div className="flex items-center mt-4 text-sm text-gray-500">
            <span>{review.helpfulCount} người thấy đánh giá này có ích.</span>
            <button className="ml-4 text-blue-600 flex items-center"><i className="fas fa-thumbs-up mr-1"></i>Hữu ích</button>
            <button className="ml-4 text-blue-600 flex items-center"><i className="fas fa-thumbs-down mr-1"></i>Không hữu ích</button>
          </div> */}
				</div>
			</div>
		)
	}

	function CommentList() {
		return (
			<div
				ref={commentsRef}
				className="mx-auto mt-20 w-full"
			>
				<h1 className="mb-4 text-3xl font-bold">Đánh giá của khách</h1>
				<div className="mb-4 flex w-full justify-end">
					<select className="rounded border border-gray-300 p-2">
						<option>Phù hợp nhất</option>
					</select>
				</div>
				{reviews.map(review => (
					<Review
						key={review.id}
						review={review}
					/>
				))}
			</div>
		)
	}

	function Amenity({selectedIds}) {
		return (
			<div
				ref={amenityRef}
				className="my-10 flex flex-col"
			>
				<h1 className="mb-4 text-3xl font-bold">Dịch vụ đi kèm</h1>
				<div className="flex flex-row flex-wrap gap-[30px]">
					{amenitiesConst.map(amenity => {
						if (selectedIds.includes(amenity.id)) {
							return (
								<div
									key={amenity.id}
									className="w-[320px]"
								>
									<div className="flex items-center gap-2">
										{amenity.icon()}
										<p className={cn('text-lg', selectedIds.includes(amenity.id) && 'font-bold')}>{amenity.title}</p>
									</div>
									<ul>
										{amenity.items.map(item => {
											if (selectedIds.includes(item.id)) {
												return (
													<li
														key={item.id}
														className="flex flex-row items-center gap-2"
													>
														<i className="fas fa-check text-xs text-gray-400"></i>
														<p className="text-xs text-gray-600">{item.title}</p>
													</li>
												)
											}
										})}
									</ul>
								</div>
							)
						}
					})}
				</div>
			</div>
		)
	}

	function PolicyRender() {
		return (
			<div
				ref={policyRef}
				className="mx-auto my-20 w-full rounded-lg bg-white"
			>
				<h1 className="mb-4 text-3xl font-bold">Chính sách</h1>
				<div className="mb-4 rounded-lg border p-4 shadow-md">
					<div className="mb-4 flex">
						<div className="flex w-72">
							<i className="fas fa-sign-in-alt mr-2 text-xl"></i>
							<h2 className="font-bold">Nhận phòng</h2>
						</div>
						<div>
							<p>Từ 14:00</p>
							<p>Khách được yêu cầu xuất trình giấy tờ tùy thân có ảnh và thẻ tín dụng lúc nhận phòng</p>
							<p>Trước đó bạn sẽ cần cho chỗ nghỉ biết giờ bạn sẽ đến nơi.</p>
						</div>
					</div>
					<div className="mb-4 flex flex-row">
						<div className="flex w-72">
							<i className="fas fa-sign-out-alt mr-2 text-xl"></i>
							<h2 className="font-bold">Trả phòng</h2>
						</div>
						<div>
							<p>Đến 12:00</p>
						</div>
					</div>

					<div className="mb-4 flex">
						<div className="flex w-72">
							<i className="fas fa-ban mr-2 text-xl"></i>
							<h2 className="font-bold">Hủy đặt phòng/ Trả trước</h2>
						</div>
						<div>
							<p>
								Các chính sách hủy và thanh toán trước sẽ khác nhau tùy vào loại chỗ nghỉ. Vui lòng kiểm tra{' '}
								<a
									href="#"
									className="text-blue-500"
								>
									các điều kiện
								</a>{' '}
								có thể được áp dụng cho mỗi lựa chọn của bạn.
							</p>
						</div>
					</div>
					<div className="mb-4 flex">
						<div className="flex w-72">
							<i className="fas fa-child mr-2 text-xl"></i>
							<h2 className="font-bold">Trẻ em và giường</h2>
						</div>
						<div>
							<p>Chính sách trẻ em</p>
							<p>Phù hợp cho tất cả trẻ em.</p>
							<p>Trẻ em từ 6 tuổi trở lên sẽ được tính giá như người lớn tại chỗ nghỉ này.</p>
							<p>
								Để xem thông tin giá và tình trạng phòng trống chính xác, vui lòng thêm số lượng và độ tuổi của trẻ em
								trong nhóm của bạn khi tìm kiếm.
							</p>
						</div>
					</div>
					<div className="mb-4 flex">
						<div className="flex w-72">
							<i className="fas fa-ban mr-2 text-xl"></i>
							<h2 className="font-bold">Không giới hạn độ tuổi</h2>
						</div>
						<div>
							<p>Không có yêu cầu về độ tuổi khi nhận phòng</p>
						</div>
					</div>
					<div className="mb-4 flex">
						<div className="flex w-72">
							<i className="fas fa-paw mr-2 text-xl"></i>
							<h2 className="font-bold">Vật nuôi</h2>
						</div>
						<div>
							<p>Vật nuôi không được phép.</p>
						</div>
					</div>
					<div className="flex">
						<div className="flex w-72">
							<i className="fas fa-credit-card mr-2 text-xl"></i>
							<h2 className="font-bold">Các phương thức thanh toán được chấp nhận</h2>
						</div>
						<div>
							<div className="mt-2 flex space-x-2">
								<img
									src="https://placehold.co/40x25"
									alt="Visa logo"
									className="h-6"
								/>
								<img
									src="https://placehold.co/40x25"
									alt="MasterCard logo"
									className="h-6"
								/>
								<img
									src="https://placehold.co/40x25"
									alt="American Express logo"
									className="h-6"
								/>
								<img
									src="https://placehold.co/40x25"
									alt="JCB logo"
									className="h-6"
								/>
								<img
									src="https://placehold.co/40x25"
									alt="Cash logo"
									className="h-6"
								/>
								<div className="rounded-md bg-green-600 px-2 py-1 text-white">
									<span className="text-sm">Tiền mặt</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	function NoteRender({note}) {
		if (note)
			return (
				<div
					ref={noteRef}
					className="my-10 flex flex-col"
				>
					<h1 className="mb-4 text-3xl font-bold">Ghi chú</h1>
					<div
						className="rounded-lg border p-4 shadow-md"
						dangerouslySetInnerHTML={{__html: note}}
					></div>
				</div>
			)
	}
}
