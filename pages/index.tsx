import { useEffect, useState } from 'react'
import { Button, Htag, P, Tag, Rating, Input, Textarea } from '../components'
import { withLayout } from '../layout/Layout'
import { GetStaticProps } from 'next'
import axios from 'axios'
import { MenuItem } from '../interfaces/menu.interface'
import ContainerLogo from './container.svg'

function Home({ menu, firstCategory }: HomeProps): JSX.Element {
  const [counter, setCounter] = useState<number>(0)
  const [rating, setRating] = useState<number>(4)

  return (
    <div className='containerLogo'>
      <ContainerLogo/>
    </div>
  )
}

export default withLayout(Home)

export const getStaticProps: GetStaticProps = async () => {
  const firstCategory = 0
  const { data: menu } = await axios.post<MenuItem>(
    process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
    {
      firstCategory,
    }
  )
  return {
    props: {
      menu,
      firstCategory,
    },
  }
}

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[]
  firstCategory: number
}
