import { useState } from 'react'

import { Session } from 'next-auth'
import { signIn } from 'next-auth/react'
import { Button, Center, Image, Stack, Text } from '@chakra-ui/react'

interface AuthProps {
	session: Session | null
	// reloadSession: () => void
}

const Auth: React.FC<AuthProps> = ({ session }) => {
	return (
		<Center height="100vh">
			<Stack align="center">
				{session ? (
					<>
						<Text>Here is Inputs for update coffee</Text>
					</>
				) : (
					<>
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
					</>
				)}
			</Stack>
		</Center>
	)
}

export default Auth
