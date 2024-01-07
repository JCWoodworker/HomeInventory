import { useParams } from "react-router-dom"
import { UserLocationData } from "../types"

interface Props {
	userInventoryData: UserLocationData[] | undefined
}

const LocationShow: React.FC<Props> = ({ userInventoryData }) => {
	const { id } = useParams()
	const currentLocation = userInventoryData?.find((location) => location.id === Number(id))

	return (
		<>
			<h2>Location Show</h2>
			<p>{currentLocation?.name}</p>
			<p>{currentLocation?.description}</p>
		</>
	)
}

export default LocationShow
