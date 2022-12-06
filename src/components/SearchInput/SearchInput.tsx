import { Box, Input } from '@chakra-ui/react'

interface SearchInputs {
	setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchInput = ({setSearch}: SearchInputs) => {
	return (
		<Box mb={5}>
			<Input onChange={setSearch} type='text' placeholder='Search Coffee'/>
		</Box>
	)
}

export default SearchInput
