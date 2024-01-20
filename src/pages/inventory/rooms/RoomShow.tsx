import { UserLocationData } from "../types"
import { Link, useLocation, useParams } from "react-router-dom"

import NewElementButton from "../../../components/NewElementButton"
import NotFound from "../../not-found/NotFound"
import BackButton from "../../../components/BackButton"
import { ListGroup } from "react-bootstrap"

interface Props {
	userInventoryData: UserLocationData[] | undefined
}

const RoomShow: React.FC<Props> = ({ userInventoryData }) => {
	const { id } = useParams()
	const { state } = useLocation()

	const currentRoom = userInventoryData?.find(
		(location) => location.id === Number(state)
	)?.rooms?.find((room) => room.id === Number(id))

	const itemsList = currentRoom?.items

	if (!currentRoom) {
		return <NotFound />
	}

	return (
		<div className="m-2 d-flex flex-column justify-content-center align-items-center">
			<h1>{currentRoom?.name}</h1>
			<NewElementButton to="/my-inventory/items/new" />
			<ListGroup className="m-2">
				{itemsList?.map((item) => (
					<div key={item.id}>
						<Link
							to={`/my-inventory/items/${item.id}`}
							state={{ locationId: state, roomId: id, itemId: item.id }}
						>
							<ListGroup.Item key={item.id} className="m-1">{item.name}</ListGroup.Item>
						</Link>
					</div>
				))}
			</ListGroup>
			<BackButton />
		</div>
	)
}

export default RoomShow
