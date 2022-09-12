import { AiOutlineHome, AiOutlineMenu, AiOutlineShopping } from 'react-icons/ai'
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
      <nav
        aria-label='Main Navigation'
        className='w-full fixed top-0 left-0 bg-base-100 z-10'
      >
        <ul className='navbar flex items-center justify-between py-5 px-5 md:px-10 lg:px-24 xl:px-48 shadow-sm'>
          <li>
            <Link
              className='hidden md:flex items-center font-bold p-2 badge-lg cursor-pointer'
              to='/'
              aria-label='Home'
            >
              <svg
                className='stroke-black max-w-[140px] night:stroke-white'
                width='264'
                height='48'
                viewBox='0 0 264 48'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M16.896 43V18.04H4.272V9.592H31.248V18.04H18.624V43H16.896ZM62.9393 10.696C64.8593 11.592 66.3633 12.92 67.4513 14.68C68.5713 16.44 69.1313 18.392 69.1313 20.536C69.1313 23.032 68.3633 25.272 66.8273 27.256C65.3233 29.208 63.3873 30.504 61.0193 31.144L69.5153 43H67.4033L59.1953 31.48L57.6593 31.528H45.6113V43H43.8353V9.592H56.5553C57.9633 9.592 59.1633 9.688 60.1553 9.88C61.1793 10.04 62.1073 10.312 62.9393 10.696ZM58.1393 29.752C59.8033 29.752 61.3393 29.336 62.7473 28.504C64.1553 27.672 65.2753 26.552 66.1073 25.144C66.9393 23.736 67.3553 22.2 67.3553 20.536C67.3553 18.68 66.8593 17 65.8673 15.496C64.9073 13.992 63.5633 12.872 61.8353 12.136C60.5873 11.624 58.8273 11.368 56.5553 11.368H45.6113V29.752H58.1393ZM120.034 9.592H143.554V11.368H121.81V24.904H140.722V26.68H121.81V41.224H143.554V43H120.034V9.592ZM157.485 9.592H181.821V18.04H166.221V22.264H179.181V30.28H166.221V34.552H181.821V43H157.485V9.592ZM206.504 9.592H208.376L222.104 43H220.184L215.672 31.96H199.208L194.648 43H192.776L206.504 9.592ZM199.928 30.232H214.952L207.416 11.896L199.928 30.232ZM252.595 10.696C254.515 11.592 256.019 12.92 257.107 14.68C258.227 16.44 258.787 18.392 258.787 20.536C258.787 23.032 258.019 25.272 256.483 27.256C254.979 29.208 253.043 30.504 250.675 31.144L259.171 43H257.059L248.851 31.48L247.315 31.528H235.267V43H233.491V9.592H246.211C247.619 9.592 248.819 9.688 249.811 9.88C250.835 10.04 251.763 10.312 252.595 10.696ZM247.795 29.752C249.459 29.752 250.995 29.336 252.403 28.504C253.811 27.672 254.931 26.552 255.763 25.144C256.595 23.736 257.011 22.2 257.011 20.536C257.011 18.68 256.515 17 255.523 15.496C254.563 13.992 253.219 12.872 251.491 12.136C250.243 11.624 248.483 11.368 246.211 11.368H235.267V29.752H247.795Z'
                  fill='currentColor'
                />
                <path
                  d='M76.7857 17.3572C76.7857 15.8795 77.3727 14.4624 78.4175 13.4176C79.4624 12.3727 80.8795 11.7857 82.3571 11.7857L86.5357 11.7857C86.9051 11.7857 87.2594 11.9325 87.5206 12.1937C87.7818 12.4549 87.9286 12.8092 87.9286 13.1786L87.9286 24.3214C87.9286 24.6908 87.7818 25.0451 87.5206 25.3063C87.2594 25.5675 86.9051 25.7143 86.5357 25.7143L79.5714 25.7143L79.5714 28.5C79.5714 36.1928 85.8073 42.4286 93.5 42.4286C101.193 42.4286 107.429 36.1928 107.429 28.5L107.429 25.7143L100.464 25.7143C100.095 25.7143 99.7406 25.5675 99.4794 25.3063C99.2182 25.0451 99.0714 24.6908 99.0714 24.3214L99.0714 13.1786C99.0714 12.8092 99.2182 12.4549 99.4794 12.1937C99.7406 11.9325 100.095 11.7857 100.464 11.7857L104.643 11.7857C106.12 11.7857 107.538 12.3727 108.582 13.4176C109.627 14.4624 110.214 15.8795 110.214 17.3572L110.214 28.5C110.214 37.7305 102.73 45.2143 93.5 45.2143C84.2695 45.2143 76.7857 37.7305 76.7857 28.5L76.7857 17.3572Z'
                  fill='#66CC8A'
                />
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M93.375 14.5C93.4745 14.5 93.5698 14.5395 93.6402 14.6098C93.7105 14.6802 93.75 14.7755 93.75 14.875V23.125C93.75 23.2245 93.7105 23.3198 93.6402 23.3902C93.5698 23.4605 93.4745 23.5 93.375 23.5C93.2755 23.5 93.1802 23.4605 93.1098 23.3902C93.0395 23.3198 93 23.2245 93 23.125V14.875C93 14.7755 93.0395 14.6802 93.1098 14.6098C93.1802 14.5395 93.2755 14.5 93.375 14.5V14.5ZM91.875 16C91.9745 16 92.0698 16.0395 92.1402 16.1098C92.2105 16.1802 92.25 16.2755 92.25 16.375V21.625C92.25 21.7245 92.2105 21.8198 92.1402 21.8902C92.0698 21.9605 91.9745 22 91.875 22C91.7755 22 91.6802 21.9605 91.6098 21.8902C91.5395 21.8198 91.5 21.7245 91.5 21.625V16.375C91.5 16.2755 91.5395 16.1802 91.6098 16.1098C91.6802 16.0395 91.7755 16 91.875 16V16ZM94.875 16C94.9745 16 95.0698 16.0395 95.1402 16.1098C95.2105 16.1802 95.25 16.2755 95.25 16.375V21.625C95.25 21.7245 95.2105 21.8198 95.1402 21.8902C95.0698 21.9605 94.9745 22 94.875 22C94.7755 22 94.6802 21.9605 94.6098 21.8902C94.5395 21.8198 94.5 21.7245 94.5 21.625V16.375C94.5 16.2755 94.5395 16.1802 94.6098 16.1098C94.6802 16.0395 94.7755 16 94.875 16ZM90.375 17.125C90.4745 17.125 90.5698 17.1645 90.6402 17.2348C90.7105 17.3052 90.75 17.4005 90.75 17.5V20.5C90.75 20.5995 90.7105 20.6948 90.6402 20.7652C90.5698 20.8355 90.4745 20.875 90.375 20.875C90.2755 20.875 90.1802 20.8355 90.1098 20.7652C90.0395 20.6948 90 20.5995 90 20.5V17.5C90 17.4005 90.0395 17.3052 90.1098 17.2348C90.1802 17.1645 90.2755 17.125 90.375 17.125V17.125ZM96.375 17.125C96.4745 17.125 96.5698 17.1645 96.6402 17.2348C96.7105 17.3052 96.75 17.4005 96.75 17.5V20.5C96.75 20.5995 96.7105 20.6948 96.6402 20.7652C96.5698 20.8355 96.4745 20.875 96.375 20.875C96.2755 20.875 96.1802 20.8355 96.1098 20.7652C96.0395 20.6948 96 20.5995 96 20.5V17.5C96 17.4005 96.0395 17.3052 96.1098 17.2348C96.1802 17.1645 96.2755 17.125 96.375 17.125ZM88.875 17.875C88.9745 17.875 89.0698 17.9145 89.1402 17.9848C89.2105 18.0552 89.25 18.1505 89.25 18.25V19.75C89.25 19.8495 89.2105 19.9448 89.1402 20.0152C89.0698 20.0855 88.9745 20.125 88.875 20.125C88.7755 20.125 88.6802 20.0855 88.6098 20.0152C88.5395 19.9448 88.5 19.8495 88.5 19.75V18.25C88.5 18.1505 88.5395 18.0552 88.6098 17.9848C88.6802 17.9145 88.7755 17.875 88.875 17.875ZM97.875 17.875C97.9745 17.875 98.0698 17.9145 98.1402 17.9848C98.2105 18.0552 98.25 18.1505 98.25 18.25V19.75C98.25 19.8495 98.2105 19.9448 98.1402 20.0152C98.0698 20.0855 97.9745 20.125 97.875 20.125C97.7755 20.125 97.6802 20.0855 97.6098 20.0152C97.5395 19.9448 97.5 19.8495 97.5 19.75V18.25C97.5 18.1505 97.5395 18.0552 97.6098 17.9848C97.6802 17.9145 97.7755 17.875 97.875 17.875Z'
                  fill='#66CC8A'
                />
              </svg>
            </Link>
            <AiOutlineMenu
              aria-label='Menu'
              aria-expanded={openMenu}
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
                  aria-label='Home'
                  className='flex md:hidden font-bold p-2 items-center cursor-pointer mb-2'
                >
                  <svg
                    className='stroke-black max-w-[140px] night:stroke-white'
                    width='264'
                    height='48'
                    viewBox='0 0 264 48'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M16.896 43V18.04H4.272V9.592H31.248V18.04H18.624V43H16.896ZM62.9393 10.696C64.8593 11.592 66.3633 12.92 67.4513 14.68C68.5713 16.44 69.1313 18.392 69.1313 20.536C69.1313 23.032 68.3633 25.272 66.8273 27.256C65.3233 29.208 63.3873 30.504 61.0193 31.144L69.5153 43H67.4033L59.1953 31.48L57.6593 31.528H45.6113V43H43.8353V9.592H56.5553C57.9633 9.592 59.1633 9.688 60.1553 9.88C61.1793 10.04 62.1073 10.312 62.9393 10.696ZM58.1393 29.752C59.8033 29.752 61.3393 29.336 62.7473 28.504C64.1553 27.672 65.2753 26.552 66.1073 25.144C66.9393 23.736 67.3553 22.2 67.3553 20.536C67.3553 18.68 66.8593 17 65.8673 15.496C64.9073 13.992 63.5633 12.872 61.8353 12.136C60.5873 11.624 58.8273 11.368 56.5553 11.368H45.6113V29.752H58.1393ZM120.034 9.592H143.554V11.368H121.81V24.904H140.722V26.68H121.81V41.224H143.554V43H120.034V9.592ZM157.485 9.592H181.821V18.04H166.221V22.264H179.181V30.28H166.221V34.552H181.821V43H157.485V9.592ZM206.504 9.592H208.376L222.104 43H220.184L215.672 31.96H199.208L194.648 43H192.776L206.504 9.592ZM199.928 30.232H214.952L207.416 11.896L199.928 30.232ZM252.595 10.696C254.515 11.592 256.019 12.92 257.107 14.68C258.227 16.44 258.787 18.392 258.787 20.536C258.787 23.032 258.019 25.272 256.483 27.256C254.979 29.208 253.043 30.504 250.675 31.144L259.171 43H257.059L248.851 31.48L247.315 31.528H235.267V43H233.491V9.592H246.211C247.619 9.592 248.819 9.688 249.811 9.88C250.835 10.04 251.763 10.312 252.595 10.696ZM247.795 29.752C249.459 29.752 250.995 29.336 252.403 28.504C253.811 27.672 254.931 26.552 255.763 25.144C256.595 23.736 257.011 22.2 257.011 20.536C257.011 18.68 256.515 17 255.523 15.496C254.563 13.992 253.219 12.872 251.491 12.136C250.243 11.624 248.483 11.368 246.211 11.368H235.267V29.752H247.795Z'
                      fill='currentColor'
                    />
                    <path
                      d='M76.7857 17.3572C76.7857 15.8795 77.3727 14.4624 78.4175 13.4176C79.4624 12.3727 80.8795 11.7857 82.3571 11.7857L86.5357 11.7857C86.9051 11.7857 87.2594 11.9325 87.5206 12.1937C87.7818 12.4549 87.9286 12.8092 87.9286 13.1786L87.9286 24.3214C87.9286 24.6908 87.7818 25.0451 87.5206 25.3063C87.2594 25.5675 86.9051 25.7143 86.5357 25.7143L79.5714 25.7143L79.5714 28.5C79.5714 36.1928 85.8073 42.4286 93.5 42.4286C101.193 42.4286 107.429 36.1928 107.429 28.5L107.429 25.7143L100.464 25.7143C100.095 25.7143 99.7406 25.5675 99.4794 25.3063C99.2182 25.0451 99.0714 24.6908 99.0714 24.3214L99.0714 13.1786C99.0714 12.8092 99.2182 12.4549 99.4794 12.1937C99.7406 11.9325 100.095 11.7857 100.464 11.7857L104.643 11.7857C106.12 11.7857 107.538 12.3727 108.582 13.4176C109.627 14.4624 110.214 15.8795 110.214 17.3572L110.214 28.5C110.214 37.7305 102.73 45.2143 93.5 45.2143C84.2695 45.2143 76.7857 37.7305 76.7857 28.5L76.7857 17.3572Z'
                      fill='#66CC8A'
                    />
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M93.375 14.5C93.4745 14.5 93.5698 14.5395 93.6402 14.6098C93.7105 14.6802 93.75 14.7755 93.75 14.875V23.125C93.75 23.2245 93.7105 23.3198 93.6402 23.3902C93.5698 23.4605 93.4745 23.5 93.375 23.5C93.2755 23.5 93.1802 23.4605 93.1098 23.3902C93.0395 23.3198 93 23.2245 93 23.125V14.875C93 14.7755 93.0395 14.6802 93.1098 14.6098C93.1802 14.5395 93.2755 14.5 93.375 14.5V14.5ZM91.875 16C91.9745 16 92.0698 16.0395 92.1402 16.1098C92.2105 16.1802 92.25 16.2755 92.25 16.375V21.625C92.25 21.7245 92.2105 21.8198 92.1402 21.8902C92.0698 21.9605 91.9745 22 91.875 22C91.7755 22 91.6802 21.9605 91.6098 21.8902C91.5395 21.8198 91.5 21.7245 91.5 21.625V16.375C91.5 16.2755 91.5395 16.1802 91.6098 16.1098C91.6802 16.0395 91.7755 16 91.875 16V16ZM94.875 16C94.9745 16 95.0698 16.0395 95.1402 16.1098C95.2105 16.1802 95.25 16.2755 95.25 16.375V21.625C95.25 21.7245 95.2105 21.8198 95.1402 21.8902C95.0698 21.9605 94.9745 22 94.875 22C94.7755 22 94.6802 21.9605 94.6098 21.8902C94.5395 21.8198 94.5 21.7245 94.5 21.625V16.375C94.5 16.2755 94.5395 16.1802 94.6098 16.1098C94.6802 16.0395 94.7755 16 94.875 16ZM90.375 17.125C90.4745 17.125 90.5698 17.1645 90.6402 17.2348C90.7105 17.3052 90.75 17.4005 90.75 17.5V20.5C90.75 20.5995 90.7105 20.6948 90.6402 20.7652C90.5698 20.8355 90.4745 20.875 90.375 20.875C90.2755 20.875 90.1802 20.8355 90.1098 20.7652C90.0395 20.6948 90 20.5995 90 20.5V17.5C90 17.4005 90.0395 17.3052 90.1098 17.2348C90.1802 17.1645 90.2755 17.125 90.375 17.125V17.125ZM96.375 17.125C96.4745 17.125 96.5698 17.1645 96.6402 17.2348C96.7105 17.3052 96.75 17.4005 96.75 17.5V20.5C96.75 20.5995 96.7105 20.6948 96.6402 20.7652C96.5698 20.8355 96.4745 20.875 96.375 20.875C96.2755 20.875 96.1802 20.8355 96.1098 20.7652C96.0395 20.6948 96 20.5995 96 20.5V17.5C96 17.4005 96.0395 17.3052 96.1098 17.2348C96.1802 17.1645 96.2755 17.125 96.375 17.125ZM88.875 17.875C88.9745 17.875 89.0698 17.9145 89.1402 17.9848C89.2105 18.0552 89.25 18.1505 89.25 18.25V19.75C89.25 19.8495 89.2105 19.9448 89.1402 20.0152C89.0698 20.0855 88.9745 20.125 88.875 20.125C88.7755 20.125 88.6802 20.0855 88.6098 20.0152C88.5395 19.9448 88.5 19.8495 88.5 19.75V18.25C88.5 18.1505 88.5395 18.0552 88.6098 17.9848C88.6802 17.9145 88.7755 17.875 88.875 17.875ZM97.875 17.875C97.9745 17.875 98.0698 17.9145 98.1402 17.9848C98.2105 18.0552 98.25 18.1505 98.25 18.25V19.75C98.25 19.8495 98.2105 19.9448 98.1402 20.0152C98.0698 20.0855 97.9745 20.125 97.875 20.125C97.7755 20.125 97.6802 20.0855 97.6098 20.0152C97.5395 19.9448 97.5 19.8495 97.5 19.75V18.25C97.5 18.1505 97.5395 18.0552 97.6098 17.9848C97.6802 17.9145 97.7755 17.875 97.875 17.875Z'
                      fill='#66CC8A'
                    />
                  </svg>
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
              <button
                aria-label={`Cart ${
                  cartQuantity > 0
                    ? `${cartQuantity === 1 ? 'item' : 'items'}`
                    : 'Empty'
                }`}
                className='btn btn-primary btn-ghost'
              >
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
              </button>
              <div
                tabIndex={-1}
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
                        <p tabIndex={0} className='mr-2'>
                          Total
                          <span className='ml-1'>
                            {formatCurrency(
                              cartItems.reduce((total, cartItem) => {
                                const item = data.items.data.find(
                                  (item: queryItemType) =>
                                    item.id === cartItem.id
                                )
                                return (
                                  total +
                                  (item?.attributes.price || 0) *
                                    cartItem.quantity
                                )
                              }, 0)
                            )}
                          </span>
                        </p>
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
