import { Button, Center } from '@chakra-ui/react'
import axios from 'axios'

interface UpdateProps {}



const Update: React.FC<UpdateProps> = () => {
	const updateSubmit = () => {
		axios.get('http://localhost:3000/api/update/coffee')
	}
	return (
		<Center>
			<Button onClick={updateSubmit}>Update</Button>
		</Center>
	)
}

export default Update
