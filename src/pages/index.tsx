import { Center } from '@chakra-ui/react'
import { NextPageContext } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import Auth from '../components/Auth/Auth'
// import { CoffeeProps } from '../components/ListOfCoffee/ListOfCoffee'
import { Coffee } from '@prisma/client'
import Main from '../components/Main/Main'
import { prisma } from '../lib/prismadb'

interface HomePorps {
	coffee: Coffee[]
}

const Home = ({coffee}: HomePorps) => {
	const { data: session } = useSession()
	return (
		<div>
			<Head>
				<title>Update Coffee Price</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Center height="100%">
				{session ? (
					session.user.admin === true ? (
						<Center width="100%">
							<Main coffee={coffee} />
						</Center>
					) : (
						'You Accsess Denied'
					)
				) : (
					<Auth session={session} />
				)}
			</Center>
		</div>
	)
}

export async function getServerSideProps(context: NextPageContext) {
	const session = await getSession(context)
	const coffee = await prisma.coffee.findMany({
		select: {
			id: true,
			img: true,
			name: true,
			price: true,
			description: true,
			qid: true,
			grade: true,
			handler: true,
			height: true,
			reg: true,
			acidity: true,
			density: true
		},
	})
	return {
		props: {
			session,
			coffee,
		},
	}
}

export default Home
