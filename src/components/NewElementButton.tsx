import { Link } from "react-router-dom"

interface Props {
	to: string
	state?: unknown
}

const NewElementButton: React.FC<Props> = ({ to }) => {
	return (
		<Link to={to} >
			<i className="bi bi-plus-circle-fill fs-2"></i>
		</Link>
	)
}

export default NewElementButton
