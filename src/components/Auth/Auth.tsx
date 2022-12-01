import { Button, Center, Image, Stack, Text } from '@chakra-ui/react'
import { Session } from 'next-auth'
import { signIn } from 'next-auth/react'

interface AuthProps {
	session: Session | null
}

const Auth: React.FC<AuthProps> = ({ session }) => {
	return (
		<Center height="100vh">
			<Stack align="center">
				<Text fontSize="3xl">Update Coffee</Text>
				<Button
					onClick={() => signIn('google')}
					leftIcon={
						<Image
							height="20px"
							src="/images/googlelogo.png"
							alt="google logo"
						/>
					}
				>
					Continium with Google
				</Button>
			</Stack>
		</Center>
	)
}

export default Auth
