import { TopLevelCategory } from './page.interface'

export interface PageItem {
  alias: string
  title: string
  _id: string
  category: string
}

export interface MenuItem {
  length: number
  _id: {
    secondCategory: string
  }
  isopened?: boolean
  pages: PageItem[]
}

export interface FirstLevelMenuItem {
  route: string
  name: string
  icon: JSX.Element
  id: TopLevelCategory
}
