import Products from '../components/Products'

//Use GraphQl queries
import { useQuery, gql } from '@apollo/client'

//Items GraphQl query
const ITEMS = gql`
  query GetItems {
    items {
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

type itemType = {
  attributes: {
    price: number
    stars: number
    title: string
  }
  id: number
}

function Store() {
  const { loading, error, data } = useQuery(ITEMS)

  if (loading) {
    return (
      <div className='my-32 mx-5 md:mx-10 lg:mx-32 flex flex-col items-center justify-center'>
        Loading...
      </div>
    )
  }
  if (error) {
    return (
      <div className='my-32 mx-5 md:mx-10 lg:mx-32 flex flex-col items-center justify-center'>
        Error
      </div>
    )
  }

  const items = data.items.data

  const bestProducts = items.filter(
    (item: itemType) => item.attributes.stars >= 4
  )
  const popularProducts = items.filter(
    (item: itemType) =>
      item.attributes.stars >= 4 && item.attributes.price <= 50
  )

  const mostSelling = items.filter(
    (item: itemType) => item.attributes.price <= 50
  )

  return (
    <section className='my-32 mx-5 md:mx-10 lg:mx-32 flex flex-col items-center justify-center'>
      {/* Most Selling*/}
      <Products products={mostSelling}>
        <h1 className='text-3xl mb-2 text-primary'>Most Selling</h1>
        <p>Our Collection of the most selling products</p>
      </Products>

      {/* Best Products */}
      <Products products={bestProducts}>
        <h1 className='text-3xl mb-2 font-bold text-primary'>Best Products</h1>
        <p>Our Collection of the best products</p>
      </Products>

      {/* Popular Products */}
      <Products products={popularProducts}>
        <h1 className='text-3xl mb-2 font-bold text-primary'>
          Popular Products
        </h1>
        <p>Our Collection of the most paid products</p>
      </Products>
    </section>
  )
}

export default Store
