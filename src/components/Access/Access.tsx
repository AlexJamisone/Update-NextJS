import {
	Center,
	LinkBox,
	LinkOverlay,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
} from '@chakra-ui/react'

interface AccessProps {}

const Access: React.FC<AccessProps> = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<Center height="100vh">
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Accsess Denied</ModalHeader>
					<ModalBody>
						<Text>Youre havent accsess to this data, sorry 😢</Text>
					</ModalBody>
					<ModalFooter>
						<LinkBox as="a">
							<LinkOverlay href="/">
								<Center>
									<Text>Back to Authentication</Text>
								</Center>
							</LinkOverlay>
						</LinkBox>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Center>
	)
}

export default Access
