import Products from '../components/Products'

//Use GraphQl queries
import { useQuery } from '@apollo/client'
import { ITEMS, STORE_SECTIONS } from '../Graphql/StoreQueries'

import ClipLoader from 'react-spinners/ClipLoader'

type StoreSections = {
  id: number
  attributes: {
    section_name: string
    sub_text: string
    items: {
      data: any
    }
  }
}

function Store() {
  const { loading, error, data } = useQuery(STORE_SECTIONS)
  const {
    loading: itemsLoading,
    error: itemsError,
    data: itemsData,
  } = useQuery(ITEMS)

  if (loading || itemsLoading) {
    return (
      <div className='my-32 mx-5 md:mx-10 lg:mx-32 flex flex-col items-center justify-center'>
        <ClipLoader size='75px' color='blue' />
      </div>
    )
  }
  if (error || itemsError) {
    return (
      <div className='my-32 mx-5 md:mx-10 lg:mx-32 flex flex-col items-center justify-center text-3xl text-error capitalize'>
        Error ❌
      </div>
    )
  }

  return (
    <section className='my-32 mx-5 md:mx-10 lg:mx-32 flex flex-col items-center justify-center'>
      {data.storeSections.data.map((sections: StoreSections) => {
        const { section_name, sub_text } = sections.attributes
        const sectionData = sections.attributes.items.data
        console.log(sectionData)
        return (
          <Products products={sectionData}>
            <h1 className='text-3xl mb-2 text-primary'>{section_name}</h1>
            <p>{sub_text}</p>
          </Products>
        )
      })}

      {/* All Products */}
      <Products products={itemsData.items.data}>
        <h1 className='text-3xl mb-2 font-bold text-primary'>All Products</h1>
      </Products>
    </section>
  )
}

export default Store
