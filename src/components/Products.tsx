import { ReactNode } from 'react'
import ItemCard from './ItemCard'

import { motion } from 'framer-motion'

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
  sectionName: string
}

const productsVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
}

function Products({ children, products, sectionName }: ProductsType) {
  console.log(sectionName)
  return (
    <section aria-label={sectionName}>
      {children}
      <motion.div
        variants={productsVariant}
        initial='initial'
        whileInView='animate'
        viewport={{ once: true }}
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-10 max-w-4xl h-full'
      >
        {products.map((item: ProductType) => {
          return (
            <ItemCard key={item.id} {...{ id: item.id, ...item.attributes }} />
          )
        })}
      </motion.div>
    </section>
  )
}

export default Products
