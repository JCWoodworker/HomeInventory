import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"

import { Request, NewLocationDto } from "../../../utils/index"
import { UserInventoryDataContext } from "../../../App.tsx"

import BackButton from "../../../components/BackButton.tsx"


const NewLocation: React.FC = () => {
	const { userInventoryData, setUserInventoryData } = useContext(
		UserInventoryDataContext
	)

	const [newLocationData, setNewLocationData] = useState<NewLocationDto>({
		name: "",
		description: "",
		type: "location",
	})
	const navigate = useNavigate()

	const handleTextInputChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setNewLocationData({
			...newLocationData,
			[event.target.name]: event.target.value,
		})
	}

	const formSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		const newLocation = await Request.post("/freeinv/locations", newLocationData, true)
		if (!newLocation) {
			console.log(`Failed to add new location`)
			return false
		}
		const newUserInventory = userInventoryData?.concat({ ...newLocation, rooms: [] })
		setUserInventoryData(newUserInventory)
		console.log(`Added new location: ${JSON.stringify(newLocation)}`)
		navigate("/my-inventory")
		return true
	}
	
	return (
		<div className="m-2 d-flex flex-column justify-content-center align-items-center">
			<h2>Add A New Location</h2>
			<form
				onSubmit={formSubmit}
				className="d-flex m-2 flex-column justify-content-center align-items-center gap-2"
			>
				<input
					type="text"
					name="name"
					onChange={handleTextInputChange}
					placeholder="Name"
				/>
				<input
					type="text"
					name="description"
					onChange={handleTextInputChange}
					placeholder="Description"
				/>
				<input type="submit" value="Submit" />
			</form>
			
		</div>
	)
}

export default NewLocation
