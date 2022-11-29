import { Box, Button, Center, FormLabel, Input } from '@chakra-ui/react'

interface FormInputProps {}

const FormInput = () => {
	return (
		<Box mb={5}>
			<form
				onSubmit={(e: React.SyntheticEvent) => {
					e.preventDefault()
					console.log('submit form')
				}}
			>
				<Center flexDirection="column" gap={1} mb={5}>
					<FormLabel>Coffee Name</FormLabel>
					<Input placeholder="Put coffee Here" type="text" />
					<FormLabel>Description</FormLabel>
					<Input placeholder="Put coffee Here" type="text" />
					<FormLabel>Quickresto id</FormLabel>
					<Input placeholder="Put coffee Here" type="text" />
				</Center>
				<Button type="submit">Add</Button>
			</form>
		</Box>
	)
}

export default FormInput
