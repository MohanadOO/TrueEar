import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { formatCurrency } from '../utilities/formatCurrency'
import { toast } from 'react-hot-toast'
import { useShoppingCart } from '../context/ShoppingCartContext'
import ClipLoader from 'react-spinners/ClipLoader'

import { motion } from 'framer-motion'

//Using Graphql queries
import { useQuery } from '@apollo/client'
import ITEM from '../Graphql/ProductQueries'

type Product = {
  id: number
  name: string
  price: number
  start: number
}

function Product() {
  const { id } = useParams()
  const { increaseCartQuantity } = useShoppingCart()

  const { loading, error, data } = useQuery(ITEM, {
    variables: { id: id },
  })

  if (loading)
    return (
      <div className='my-32 mx-5 md:mx-10 lg:mx-32 flex flex-col items-center justify-center'>
        <ClipLoader size='75px' color='blue' />
      </div>
    )
  if (error || !data.item.data?.attributes)
    return (
      <div className='my-32 mx-5 md:mx-10 lg:mx-32 flex flex-col items-center justify-center'>
        <p className='text-3xl text-error capitalize'>Can't Find Item ❌</p>
      </div>
    )

  const item = data.item.data
  const imgAttributes = item.attributes.img.data.attributes
  const filledStars = Array(item.attributes.stars).fill(true)
  const emptyStars = Array(5 - item.attributes.stars).fill(true)

  return (
    <motion.section
      aria-labelledby='item-name'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      id='card'
      className='card card-compact lg:card-side lg:gap-10 self-center max-w-lg mx-5 lg:max-w-3xl overflow-hidden ring-2 ring-primary p-5 lg:p-10'
    >
      <figure>
        <img
          className='aspect-[16/9] w-full object-contain'
          src={imgAttributes.formats.large?.url || imgAttributes.url}
          alt={`${item.attributes.title}`}
        />
      </figure>
      <div className='card-body justify-center max-w-lg w-full'>
        <header>
          <h1
            id='item-name'
            className='card-title w-full truncate'
            title={item.attributes.title}
          >
            {item.attributes.title}
          </h1>
          <p tabIndex={0} className='text-accent'>
            {formatCurrency(item.attributes.price)}
          </p>
        </header>
        <div
          tabIndex={0}
          aria-label={`${filledStars.length} Stars`}
          className='flex mt-3'
        >
          {filledStars.map((_, index) => {
            return <AiFillStar key={index} className='w-5 h-5 text-warning' />
          })}
          {emptyStars.map((_, index) => (
            <AiOutlineStar key={index} className='w-5 h-5 text-warning' />
          ))}
        </div>
        <div className='card-action'>
          <button
            onClick={() => {
              increaseCartQuantity(item.id)
              toast.success(
                <b>
                  You added
                  <span className='mx-1 text-primary'>
                    {item.attributes.title}
                  </span>
                  to the cart
                </b>
              )
            }}
            className='my-3 btn btn-primary btn-outline'
          >
            + Add To Cart
          </button>
        </div>
      </div>
    </motion.section>
  )
}

export default Product
