import { ReactNode } from 'react'
import ItemCard from './ItemCard'

type itemAttributesType = {
  title: string
  price: number
  stars: number
  img: {
    data: {
      attributes: {
        formats: {
          medium: {
            url: string
          }
        }
      }
    }
  }
}

type ProductType = {
  map: any
  id: number
  attributes: itemAttributesType
}

type ProductsType = {
  children: ReactNode
  products: ProductType
}

function Products({ children, products }: ProductsType) {
  return (
    <>
      {children}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-10 max-w-4xl h-full'>
        {products.map((item: ProductType) => {
          return (
            <ItemCard key={item.id} {...{ id: item.id, ...item.attributes }} />
          )
        })}
      </div>
    </>
  )
}

export default Products
