import { Link } from "react-router-dom"
import { ProductSpec } from "../pages/home/productSpecs"

interface Props {
	productSpec: ProductSpec
}
const ProductShowCard: React.FC<Props> = ({ productSpec }) => {
	let sentencePrefix
	typeof productSpec.allowedLocations === "number"
		? (sentencePrefix = "Up to")
		: (sentencePrefix = "")

	let monthlyFee
	productSpec.monthlyFees > 0
		? (monthlyFee = <li>{`$${productSpec.monthlyFees} per month`}</li>)
		: (monthlyFee = null)

	return (
		<Link
			to="/signup"
			state={productSpec.tier}
		>
			<h2>{productSpec.title}</h2>
			<ul>
				<li>
					{`${sentencePrefix} `}
					<strong>{productSpec.allowedLocations}</strong> locations
				</li>
				<li>
					{`${sentencePrefix} `}
					<strong>{productSpec.allowedRoomsPerLocation}</strong> rooms per
					location
				</li>
				<li>
					{`${sentencePrefix} `}
					<strong>{productSpec.allowedItemsPerRoom}</strong> items per room
				</li>
				{monthlyFee}
				<li>{`Must opt in to receive ${productSpec.emailFrequency} blog emails with affiliate links`}</li>
			</ul>
		</Link>
	)
}

export default ProductShowCard
