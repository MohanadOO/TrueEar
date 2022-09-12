import { formatCurrency } from '../utilities/formatCurrency'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useShoppingCart } from '../context/ShoppingCartContext'

import { motion } from 'framer-motion'

type ItemCardProps = {
  id: number
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

const itemCardVariant = {
  initial: { scale: '0', opacity: 0, x: '-20' },
  animate: { scale: '1', opacity: 1, x: '0' },
}

function ItemCard({ id, title, price, stars, img }: ItemCardProps) {
  const filledStars = Array(stars).fill(true)
  const emptyStars = Array(5 - stars).fill(true)

  const { increaseCartQuantity } = useShoppingCart()

  return (
    <motion.div
      variants={itemCardVariant}
      id='card'
      className='card card-bordered bg-primary/5 shadow-xl'
    >
      <figure>
        <Link className='w-full rounded-sm' to={`/store/${id}`}>
          <div className='scale-110 hover:scale-100 transition-transform duration-200 bg-white'>
            <img
              className='h-[230px] aspect-video object-contain object-center rounded-md'
              src={img.data?.attributes.formats.medium.url}
              alt={`${title}`}
            />
          </div>
        </Link>
      </figure>
      <div className='card-body'>
        <h2 tabIndex={0} className='card-title  w-full truncate' title={title}>
          {title}
        </h2>
        <p tabIndex={0} className='text-accent'>
          {formatCurrency(price)}
        </p>

        <div
          tabIndex={0}
          aria-label={`${filledStars.length} Stars`}
          className='flex mt-3'
        >
          {filledStars.map((length, index) => {
            return <AiFillStar key={index} className='w-5 h-5 text-warning' />
          })}
          {emptyStars.map((length, index) => (
            <AiOutlineStar key={index} className='w-5 h-5 text-warning' />
          ))}
        </div>

        <button
          onClick={() => {
            increaseCartQuantity(id)
            toast.success(
              <b>
                You added <span className='text-primary'>{title}</span> to the
                cart
              </b>
            )
          }}
          className='my-3 btn btn-primary btn-outline'
        >
          + Add To Cart
        </button>
      </div>
    </motion.div>
  )
}

export default ItemCard
