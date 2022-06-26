import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { formatCurrency } from '../utilities/formatCurrency'
import { toast } from 'react-hot-toast'
import { useShoppingCart } from '../context/ShoppingCartContext'

//Using Graphql queries
import { useQuery, gql } from '@apollo/client'

type Product = {
  id: number
  name: string
  price: number
  start: number
}

//Item GraphQl query
const ITEM = gql`
  query GetItem($id: ID!) {
    item(id: $id) {
      data {
        id
        attributes {
          title
          price
          stars
          img {
            data {
              attributes {
                formats
              }
            }
          }
        }
      }
    }
  }
`

function Product() {
  const { id } = useParams()
  const { increaseCartQuantity } = useShoppingCart()

  const { loading, error, data } = useQuery(ITEM, {
    variables: { id: id },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error ❌</p>

  const item = data.item.data
  console.log(item.attributes.img.data.attributes.url)
  if (item) {
    const filledStars = Array(item.attributes.stars).fill(true)
    const emptyStars = Array(5 - item.attributes.stars).fill(true)

    return (
      <div
        id='card'
        className='card card-compact md:card-side absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-4xl'
      >
        <figure>
          <img
            className='md:h-[350px]  object-cover rounded-md'
            src={`http://localhost:1337${item.attributes.img.data.attributes.formats.large.url}`}
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
            <p className='text-accent'>
              {formatCurrency(item.attributes.price)}
            </p>
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
}

export default Product
