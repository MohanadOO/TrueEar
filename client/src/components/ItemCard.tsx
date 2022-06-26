import { formatCurrency } from '../utilities/formatCurrency'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useShoppingCart } from '../context/ShoppingCartContext'

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

function ItemCard({ id, title, price, stars, img }: ItemCardProps) {
  const filledStars = Array(stars).fill(true)
  const emptyStars = Array(5 - stars).fill(true)

  const { increaseCartQuantity } = useShoppingCart()

  return (
    <div id='card' className='card card-bordered bg-primary/5 shadow-xl'>
      <figure>
        <Link
          className='h-[220px] w-full object-cover rounded-sm'
          to={`/store/${id}`}
        >
          <img
            className='h-[220px] w-full object-cover rounded-sm'
            src={`http://localhost:1337${img.data.attributes.formats.medium.url}`}
            alt={`${title}_img`}
          />
        </Link>
      </figure>
      <div className='card-body'>
        <h2 className='card-title  w-full truncate' title={title}>
          {title}
        </h2>
        <p className='text-accent'>{formatCurrency(price)}</p>
        <div className='flex mt-3'>
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
    </div>
  )
}

export default ItemCard
