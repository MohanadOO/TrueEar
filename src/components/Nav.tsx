import {
  AiOutlineHome,
  AiOutlineInfoCircle,
  AiOutlineMenu,
  AiOutlineShopping,
} from 'react-icons/ai'
import { MdOutlineHeadphonesBattery } from 'react-icons/md'
import ClipLoader from 'react-spinners/ClipLoader'
import { Link, NavLink } from 'react-router-dom'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { formatCurrency } from '../utilities/formatCurrency'

import { useQuery } from '@apollo/client'
import ITEMS from '../Graphql/NavQueries'

import CartItem from './CartItem'
import UserAvatar from './UserAvatar'
import { useState } from 'react'

type queryItemType = {
  id: number
  attributes: {
    price: number
  }
}

function Nav() {
  const [openMenu, setOpenMenu] = useState(false)

  const { cartQuantity, cartItems } = useShoppingCart()
  const { loading, error, data } = useQuery(ITEMS)

  return (
    <header>
      <nav className='w-full fixed top-0 left-0 bg-base-100 z-10'>
        <ul className='navbar flex items-center justify-between py-5 px-5 md:px-10 lg:px-24 xl:px-48 shadow-sm'>
          <li>
            <Link
              className='hidden md:flex items-center font-bold p-2 badge badge-primary badge-lg cursor-pointer'
              to='/'
            >
              <span>TrueEar</span>
              <MdOutlineHeadphonesBattery className='w-5 h-5 ml-1' />
            </Link>
            <AiOutlineMenu
              tabIndex={0}
              className='w-10 h-10 active:bg-base-200 active:outline-primary focus:outline-primary rounded-full p-2 cursor-pointer block md:hidden '
              onClick={() => setOpenMenu((prevState) => !prevState)}
            />
          </li>
          {openMenu && (
            <ul className='menu shadow rounded-box absolute top-16 left-5 p-2 bg-base-100 -z-40 w-40 md:hidden'>
              <li>
                <Link
                  to='/'
                  className='flex md:hidden font-bold p-2 badge items-center badge-primary badge-lg cursor-pointer mb-2'
                >
                  <span>TrueEar</span>
                  <MdOutlineHeadphonesBattery className='w-5 h-5 ml-1' />
                </Link>
              </li>
              <li>
                <NavLink
                  onClick={() => setOpenMenu(false)}
                  className={({ isActive }) =>
                    'flex items-center gap-1 btn mt-2 md:hidden w-32 text-xs ' +
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
                  onClick={() => setOpenMenu(false)}
                  className={({ isActive }) =>
                    'flex items-center gap-1 py-2 px-3 rounded-md transition-colors btn mt-2  md:hidden w-32 text-xs ' +
                    (!isActive
                      ? 'btn-ghost '
                      : ' btn-primary shadow-md cursor-default')
                  }
                  to='/store'
                >
                  Store <AiOutlineShopping />
                </NavLink>
              </li>
            </ul>
          )}

          <ul className='hidden md:flex gap-5'>
            <li>
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
          </ul>

          <ul>
            <UserAvatar />
            <li className='dropdown dropdown-end'>
              <label tabIndex={0} className='btn btn-primary btn-ghost'>
                <div className='indicator'>
                  <svg
                    onClick={() => setOpenMenu(false)}
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
                className={`mt-3 dropdown-content card card-compact bg-base-100 shadow overflow-y-auto md:h-auto  ${
                  cartQuantity === 0
                    ? 'w-52'
                    : 'w-[15rem] h-[65vh] md:w-[30rem]'
                }`}
              >
                <div className='card-body'>
                  {loading ? (
                    <ClipLoader size='75px' color='blue' />
                  ) : error ? (
                    <p>Error ❌</p>
                  ) : cartQuantity === 0 ? (
                    <span className='font-bold '>Cart Is Empty</span>
                  ) : (
                    <>
                      <span className='font-bold text-xs md:text-lg'>
                        <span className='badge badge-md mr-2'>
                          {cartQuantity}
                        </span>
                        {cartQuantity > 1 ? 'Items' : 'Item'}
                      </span>
                      {cartItems.map((item) => {
                        return <CartItem key={item?.id} {...item} />
                      })}
                      <span className='text-primary md:text-lg font-bold text-sm '>
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
                        <button className='btn btn-primary btn-block btn-sm text-xs md:text-base md:btn-md'>
                          Buy Now
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </li>
          </ul>
        </ul>
      </nav>
    </header>
  )
}

export default Nav
