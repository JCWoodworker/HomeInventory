import { useEffect, useState, createContext } from "react"
import { Routes, Route } from "react-router-dom"
import "./app.scss"

import TopNavLinks from "./navigation/TopNavLinks"
import Home from "./pages/home/Home"
import SignIn from "./pages/auth/SignIn"
import SignUp from "./pages/auth/SignUp"
import SignOut from "./pages/auth/SignOut"
import NotFoundPage from "./pages/not-found/NotFound"
import Layout from "./pages/Layout.tsx"
import PersistLogin from "./components/PersistLogin.tsx"
// import ManualRefreshToken from "./components/ManualRefreshToken"

import LocationIndex from "./pages/inventory/locations/LocationIndex"
import LocationShow from "./pages/inventory/locations/LocationShow"
import NewLocation from "./pages/inventory/locations/NewLocation"
import RoomShow from "./pages/inventory/rooms/RoomShow"
import NewRoom from "./pages/inventory/rooms/NewRoom"
import ItemShow from "./pages/inventory/items/ItemShow"
import NewItem from "./pages/inventory/items/NewItem"

import { UserLocationData } from "./pages/inventory/inventoryTypes.ts"
import { Request } from "./utils/index.ts"

import useAuth from "./hooks/useAuth"


interface UserInventoryDataContextInterface {
	userInventoryData: UserLocationData[] | undefined
	setUserInventoryData: (value: UserLocationData[] | undefined) => void
}

export const UserInventoryDataContext =
	createContext<UserInventoryDataContextInterface>({
		userInventoryData: [
			{
				id: 0,
				name: "Test Location",
				description: "Test location",
				type: "location",
				rooms: [],
			},
		],
		setUserInventoryData: () => {},
	})

function App() {
	const { auth, persist } = useAuth()
	const [userInventoryData, setUserInventoryData] = useState<
		UserLocationData[] | undefined
	>(undefined)

	const hydrateUserData = async () => {
		try {
			const accessToken = auth?.accessToken
			if (!accessToken) {
				return console.log(
					"No access token in auth context.  Cannot hydrate user data"
				)
			}
			const userData = await Request.get(
				"/freeinv/complete-location",
				true,
				accessToken
			)
			setUserInventoryData(userData)
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	}

	useEffect(() => {
		if (persist) {
			hydrateUserData()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [persist])

	return (
		<UserInventoryDataContext.Provider
			value={{ userInventoryData, setUserInventoryData }}
		>
			<TopNavLinks />
			<Routes>
				<Route path="/" element={<Layout />}>
					{/* Public routes */}
					<Route index element={<Home />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/signup" element={<SignUp />} />

					{/* Protected routes */}
					<Route element={<PersistLogin />}>
						<Route path="/" element={<Home />} />
						<Route path="/signout" element={<SignOut />} />
						<Route path="/my-inventory">
							<Route
								index
								element={
									<LocationIndex userInventoryData={userInventoryData} />
								}
							/>
							<Route path="locations/:id" element={<LocationShow />} />
							<Route path="locations/new" element={<NewLocation />} />
							<Route path="rooms">
								<Route path=":id" element={<RoomShow />} />
								<Route path="new" element={<NewRoom />} />
							</Route>
							<Route path="items">
								<Route path=":id" element={<ItemShow />} />
								<Route path="new" element={<NewItem />} />
							</Route>
						</Route>
					</Route>
					{/* catch all */}
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
		</UserInventoryDataContext.Provider>
	)
}

export default App
