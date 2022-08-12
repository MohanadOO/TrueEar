import { useShoppingCart } from '../context/ShoppingCartContext'
import { formatCurrency } from '../utilities/formatCurrency'
import { Link } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import ITEM from '../Graphql/CartItemQueries'

type CartItemProps = {
  id: number
  quantity: number
}

function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } =
    useShoppingCart()

  const { loading, error, data } = useQuery(ITEM, {
    variables: { id: id },
  })

  if (loading) {
    return (
      <div className='flex items-center gap-5 h-24 rounded-box'>Loading...</div>
    )
  }
  if (error) {
    return <div className='flex items-center gap-5 h-24 rounded-box'>Error</div>
  }

  const item = data.item.data

  return (
    <div id='cart-item '>
      <div className='flex flex-col md:flex-row text-center md:text-left items-center gap-2 md:gap-5 md:h-24 rounded-box'>
        <figure>
          <Link to={`store/${id}`}>
            <img
              className='h-24 w-32 object-cover rounded-lg'
              src={item.attributes.img.data.attributes.formats.thumbnail.url}
              alt={`${item.attributes.title}_avatar`}
            />
          </Link>
        </figure>
        <div className='flex-1'>
          <p className='text-sm font-bold'>
            {item.attributes.title}
            <span className='ml-2 font-bold text-primary'>x{quantity}</span>
          </p>
          <span>{formatCurrency(item.attributes.price)}</span>
          <div className='my-3 flex gap-2 items-center justify-center md:justify-start'>
            <button
              onClick={() => decreaseCartQuantity(id)}
              className='btn btn-outline btn-sm'
            >
              -
            </button>
            <button
              onClick={() => increaseCartQuantity(id)}
              className='btn btn-outline btn-sm'
            >
              +
            </button>
            <button
              onClick={() => removeFromCart(item.id)}
              className='block md:hidden btn btn-error btn-sm btn-outline'
            >
              &times;
            </button>
          </div>
        </div>
        <div className='md:ml-auto'>
          <p>{formatCurrency(item.attributes.price * quantity)}</p>
        </div>
        <button
          onClick={() => removeFromCart(item.id)}
          className='hidden md:block btn btn-error btn-sm btn-outline'
        >
          &times;
        </button>
      </div>
      <div className='divider'></div>
    </div>
  )
}

export default CartItem