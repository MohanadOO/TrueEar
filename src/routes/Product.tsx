import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { formatCurrency } from '../utilities/formatCurrency'
import { toast } from 'react-hot-toast'
import { useShoppingCart } from '../context/ShoppingCartContext'
import ClipLoader from 'react-spinners/ClipLoader'

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
  if (error)
    return (
      <div className='my-32 mx-5 md:mx-10 lg:mx-32 flex flex-col items-center justify-center'>
        <p className='text-3xl text-error capitalize'>Error ❌</p>
      </div>
    )

  const item = data.item.data

  const filledStars = Array(item.attributes.stars).fill(true)
  const emptyStars = Array(5 - item.attributes.stars).fill(true)

  return (
    <div
      id='card'
      className='card card-compact md:card-side absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-4xl'
    >
      <figure>
        <img
          className='aspect-[16/9] w-full object-cover rounded-md'
          src={item.attributes.img.data.attributes.formats.large.url}
          alt={`${item.attributes.title}_img`}
        />
      </figure>
      <div className='card-body justify-center'>
        <div>
          <h2
            className='card-title w-full truncate'
            title={item.attributes.title}
          >
            {item.attributes.title}
          </h2>
          <p className='text-accent'>{formatCurrency(item.attributes.price)}</p>
        </div>
        <div className='flex mt-3'>
          {filledStars.map((length, index) => {
            return <AiFillStar key={index} className='w-5 h-5 text-warning' />
          })}
          {emptyStars.map((length, index) => (
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
    </div>
  )
}

export default Product
