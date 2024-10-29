import {RouterPath} from '@router/RouterPath'
import {Link} from 'react-router-dom'

function SuggestionAI() {
	return (
		<div>
			<section className="container mx-auto py-16">
				<h2 className="mb-8 text-2xl font-extrabold">Bạn có còn quan tâm đến những chỗ nghỉ này?</h2>
				<div className="grid grid-cols-3 gap-8">
					<CardDestination
						name="Da Nang Resort"
						rate={8}
						src={
							'https://cf.bstatic.com/xdata/images/hotel/square600/410511403.webp?k=f6c3c7c8dd3fea47504616cc969176c3789d474371287ac11ad0f4b04bbab016&o='
						}
						province={'Đà Nẵng'}
						comments={29}
					/>
					<CardDestination
						name="Temple Da Nang Resort"
						rate={8.8}
						src={
							'https://cf.bstatic.com/xdata/images/hotel/square600/590363117.webp?k=413b0573b92283ebbe9cd94f33c5c42d8706093c990d31f3242e70c4b4a37089&o='
						}
						province={'Đà Lạt'}
						comments={130}
					/>

					<CardDestination
						name="Temple Da Nang Resort"
						rate={8.8}
						src={
							'https://cf.bstatic.com/xdata/images/hotel/square600/410511403.webp?k=f6c3c7c8dd3fea47504616cc969176c3789d474371287ac11ad0f4b04bbab016&o='
						}
						province={'Đà Lạt'}
						comments={130}
					/>
					<CardDestination
						name="Temple Da Nang Resort"
						rate={8.8}
						src={
							'https://cf.bstatic.com/xdata/images/hotel/square600/410511403.webp?k=f6c3c7c8dd3fea47504616cc969176c3789d474371287ac11ad0f4b04bbab016&o='
						}
						province={'Đà Lạt'}
						comments={130}
					/>
					<CardDestination
						name="Temple Da Nang Resort"
						rate={8.8}
						province={'Đà Lạt'}
						src={
							'https://cf.bstatic.com/xdata/images/hotel/square600/557216248.webp?k=d2182538b0f14e85db9b90b1027442f3e5db5a9a2e95f71ddd580bf1f6af6a2b&o='
						}
						comments={130}
					/>
				</div>
			</section>
		</div>
	)
}

export default SuggestionAI

function CardDestination({name, src, rate = 8.9, province, comments = 0}) {
	return (
		<Link
			to={`${RouterPath.DETAIL}`}
			className="overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-100 ease-in-out hover:scale-105 hover:shadow-2xl"
		>
			<img
				alt={`r_${name}`}
				className="h-48 w-full object-cover"
				src={src ? src : 'https://placehold.co/400x300'}
			/>
			<div className="p-4">
				<h3 className="text-lg font-bold">{name}</h3>
				<p className="text-gray-600">{province}</p>
				<div className="mt-2 flex items-center">
					<span className="rounded-md bg-blue-600 px-2 py-1 text-sm text-white">{rate}</span>
					<span className="ml-2 text-gray-600">{comments} đánh giá</span>
				</div>
			</div>
		</Link>
	)
}
