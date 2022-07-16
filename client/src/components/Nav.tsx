import {
  AiOutlineFormatPainter,
  AiOutlineHome,
  AiOutlineInfoCircle,
  AiOutlineShopping,
} from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { formatCurrency } from '../utilities/formatCurrency'

import { useQuery } from '@apollo/client'
import ITEMS from '../Graphql/NavQueries'

import CartItem from './CartItem'
import UserAvatar from './UserAvatar'

type queryItemType = {
  id: number
  attributes: {
    price: number
  }
}

function Nav() {
  const { cartQuantity, cartItems } = useShoppingCart()
  const { loading, error, data } = useQuery(ITEMS)

  function toggleTheme() {
    if (localStorage.theme === 'night') {
      localStorage.theme = 'light'
      return (document.documentElement.dataset.theme = 'light')
    }
    localStorage.theme = 'night'
    return (document.documentElement.dataset.theme = 'night')
  }

  return (
    <header>
      <nav className=' w-full fixed top-0 bg-base-100 z-10'>
        <ul className='navbar gap-3 flex w-full items-center py-5 px-5 md:px-10 lg:px-24 xl:px-48'>
          <li className=''>
            <NavLink
              className={({ isActive }) =>
                'flex items-center gap-1 btn ' +
                (!isActive
                  ? 'btn-ghost '
                  : ' btn-primary shadow-md cursor-default')
              }
              to='/'
            >
              Home <AiOutlineHome />
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) =>
                'flex items-center gap-1 py-2 px-3 rounded-md transition-colors btn ' +
                (!isActive
                  ? 'btn-ghost '
                  : ' btn-primary shadow-md cursor-default')
              }
              to='/store'
            >
              Store <AiOutlineShopping />
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) =>
                'flex items-center gap-1 py-2 px-3 rounded-md transition-colors btn ' +
                (!isActive
                  ? 'btn-ghost '
                  : ' btn-primary shadow-md cursor-default')
              }
              to='/about'
            >
              About <AiOutlineInfoCircle />
            </NavLink>
          </li>

          <UserAvatar />

          <li className='dropdown dropdown-content dropdown-end '>
            <label tabIndex={0} className='btn btn-primary btn-ghost'>
              <div className='indicator'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
                {cartQuantity > 0 && (
                  <span className='badge badge-sm indicator-item'>
                    {cartQuantity}
                  </span>
                )}
              </div>
            </label>
            <div
              tabIndex={0}
              className={`mt-3 dropdown-content card card-compact bg-base-100 shadow  ${
                cartQuantity === 0 ? 'w-52' : 'w-[30rem]'
              }`}
            >
              <div className='card-body'>
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>Error ❌</p>
                ) : cartQuantity === 0 ? (
                  <span className='font-bold '>Cart Is Empty</span>
                ) : (
                  <>
                    <span className='font-bold text-lg'>
                      <span className='badge badge-md mr-2'>
                        {cartQuantity}
                      </span>
                      {cartQuantity > 1 ? 'Items' : 'Item'}
                    </span>
                    {cartItems.map((item) => {
                      return <CartItem key={item?.id} {...item} />
                    })}
                    <span className='text-primary text-lg font-bold'>
                      <span className='mr-2'>Total</span>
                      {formatCurrency(
                        cartItems.reduce((total, cartItem) => {
                          const item = data.items.data.find(
                            (item: queryItemType) => item.id === cartItem.id
                          )
                          return (
                            total +
                            (item?.attributes.price || 0) * cartItem.quantity
                          )
                        }, 0)
                      )}
                    </span>
                    <div className='card-actions'>
                      <button className='btn btn-primary btn-block'>
                        Buy Now
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </li>

          <li onClick={toggleTheme} className=' btn btn-secondary btn-ghost'>
            <AiOutlineFormatPainter />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Nav
