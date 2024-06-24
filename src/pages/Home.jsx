import React, { useEffect, useState } from 'react'
import '../pages/CSS/Home.css'
import { Link } from 'react-router-dom';

const Home = () => {
  const [dogs, setDogs] = useState([]);
  function getData() {
    fetch('https://doggystickers.vercel.app/_next/data/xyaZmLIU1DsdFtyNNRye4/index.json')
      .then(res => res.json())
      .then(data => setDogs(data.pageProps.products))
  }
  useEffect(() => {
    getData()
    console.log(dogs);
  }, [])

  return (
    <div id='home'>
      <div className="container">
        <h1>Get Doggy Stickers!</h1>
        <p>Times are tough. Liven up your home with some cute Doggy Stickers. 🐶</p>


        <div id='dogCards'>

          {
            dogs.map((item) => (

              <div key={item.node.id} className='dogCard'>
                <img src={item.node.images.edges[0].node.originalSrc} alt="" />
                <div className='dogCardBody'>
                  <Link to={`/detail/${item.node.title}`} key={item.node.id} className='dogCard'>

                    <h2>{item.node.title}</h2>
                  </Link>

                  <p>{item.node.description}</p>
                  <div className='dogCardAbsolute'>
                    $
                    {item.node.variants.edges[0].node.price}
                  </div>
                </div>
              </div>
            ))
          }

        </div>
      </div>

    </div>
  )
}

export default Home