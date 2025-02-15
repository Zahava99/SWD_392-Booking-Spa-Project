// import React, { useState } from 'react';
// import { Button, Card } from 'react-bootstrap';

// export default function TEST() {
//   const [showContent, setShowContent] = useState(false);

//   const handleClick = () => {
//     setShowContent(!showContent);
//     window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
//   };

//   return (
//     <div>
//       <Card style={{ width: showContent ? '100%' : '18rem', transition: 'width 0.5s ease-in-out' }}>
//         <Card.Body>
//           <Card.Text>
//             This is a sample card with some quick example text to build on the card title and make up the bulk of the card's content.
//           </Card.Text>
//           <Button variant="primary" onClick={handleClick}>
//             Xem nhanh
//           </Button>
//           <div className={`content ${showContent ? 'show' : ''}`}>
//             <p>Additional content goes here...</p>
//             <p>Additional content goes here...Additional content goes here...Additional content goes here...</p>
//             <p>Additional content goes here...Additional content goes here...Additional content goes here...Additional content goes here...</p>
//             <p>Additional content goes here...Additional content goes here...Additional content goes here...Additional content goes here...Additional content goes here...</p>
//             <img src="https://via.placeholder.com/150" alt="additional content" />
//           </div>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }
// import React, { useState } from 'react';

// export default function TEST() {
//   const [showContent, setShowContent] = useState(false);

//   const handleClick = () => {
//     setShowContent(!showContent);
//     window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
//   };
//   // style={{ width: showContent ? '100%' : '18rem', transition: 'width 0.5s ease-in-out' }}
//   // style={{width: '18rem' }}
//   // onclick="document.querySelector('.card').classList.toggle('card-width-expanded')"
//   return (
//     <div class="card card-width TEST">
//   <div class="card-body">
//     <p class="card-text">
//       This is a sample card with some quick example text to build on the card title and make up the bulk of the card's content.
//     </p>
//     <button class="btn btn-primary" onClick={handleClick} type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
//       Xem nhanh
//     </button>
//     <div class="collapse" id="collapseExample">
//       <div class="card card-body">
//         <p>Additional content goes here...</p>
//         <p>Additional content goes here...Additional content goes here...Additional content goes here...</p>
//         <p>Additional content goes here...Additional content goes here...Additional content goes here...Additional content goes here...</p>
//         <p>Additional content goes here...Additional content goes here...Additional content goes here...Additional content goes here...Additional content goes here...</p>
//         <img src="https://via.placeholder.com/150" alt="additional content" />
//       </div>
//     </div>
//   </div>
// </div>

//   );
// }
// import React, { useState } from 'react';
// import { Button, Card } from 'react-bootstrap';

// export default function TEST() {
//   const [showContent, setShowContent] = useState(false);

//   const handleClick = () => {
//     setShowContent(!showContent);
//     window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
//   };
//   // style={{ width: showContent ? '100%' : '18rem', transition: 'width 0.5s ease-in-out' }}
//   // style={{width: '18rem' }}
//   return (
// <div class="card card-width">
//   <div class="card-body">
//     <p class="card-text">
//       This is a sample card with some quick example text to build on the card title and make up the bulk of the card's content.
//     </p>
//     <button class="btn btn-primary" type="button" onclick="document.querySelector('.card').classList.toggle('card-width-expanded')">
//       Xem nhanh
//     </button>
//     <div class="collapse">
//       <div class="card card-body">
//         <p>Additional content goes here...</p>
//         <p>Additional content goes here...Additional content goes here...Additional content goes here...</p>
//         <p>Additional content goes here...Additional content goes here...Additional content goes here...Additional content goes here...</p>
//         <p>Additional content goes here...Additional content goes here...Additional content goes here...Additional content goes here...Additional content goes here...</p>
//         <img src="https://via.placeholder.com/150" alt="additional content" />
//       </div>
//     </div>
//   </div>
// </div>

//   );
// }
import React, { useState, useEffect } from 'react'

function Header () {
  return (
    <header>
      <h1>Interior Design Quotation</h1>
    </header>
  )
}

function ProductRow ({
  product,
  describe,
  size,
  unit,
  mass,
  unitPrice,
  quantity,
  onQuantityChange,
  onDelete
}) {
  return (
    <tr className='product-row' data-product={product}>
      <td>{product}</td>
      <td>{describe}</td>
      <td>
        Long: {size.long}, Wide: {size.wide}, Height: {size.height}
      </td>
      <td>{unit}</td>
      <td>{mass}</td>
      <td>${unitPrice.toFixed(2)}</td>
      <td>
        <input
          type='number'
          className='quantity'
          value={quantity}
          min='1'
          onChange={onQuantityChange}
        />
      </td>
      <td>
        <button onClick={onDelete}>Delete</button>
      </td>
    </tr>
  )
}

export default function TEST () {
  const [productList, setProductList] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState('A') // Default to "A" initially

  useEffect(() => {
    updateTotalPrice()
  }, [productList, selectedProduct]) // Update total price when productList or selectedProduct changes

  function updateTotalPrice () {
    let total = 0
    productList.forEach(({ product, quantity }) => {
      const unitPrice = productData[product].unit_price
      total += quantity * unitPrice
    })
    setTotalPrice(total)
  }

  function handleProductChange (event) {
    setSelectedProduct(event.target.value)
  }

  function addProductRow () {
    const quantity = parseInt(document.getElementById('quantity').value) || 0

    const existingIndex = productList.findIndex(
      item => item.product === selectedProduct
    )
    if (existingIndex !== -1) {
      const updatedList = [...productList]
      updatedList[existingIndex].quantity += quantity
      setProductList(updatedList)
    } else {
      const newRow = {
        product: selectedProduct,
        quantity: quantity
      }
      setProductList([...productList, newRow])
    }
  }

  function removeProductRow (product) {
    const updatedList = productList.filter(item => item.product !== product)
    setProductList(updatedList)
  }

  return (
    <div>
      <Header />
      <section id='quotation'>
        <h2>Product Quotation</h2>
        <p>
          Select products from the dropdown and enter quantity for each to see
          the total price:
        </p>

        <form>
          <label htmlFor='selectProduct'>Select product:</label>
          <select
            id='selectProduct'
            value={selectedProduct}
            onChange={handleProductChange}
          >
            <option value='A'>A</option>
            <option value='B'>B</option>
            <option value='C'>C</option>
          </select>

          <label htmlFor='quantity'>Enter quantity:</label>
          <input type='number' id='quantity' min='1' defaultValue='1' />

          <button type='button' onClick={addProductRow}>
            Add Product
          </button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Describe</th>
              <th>Size</th>
              <th>Unit</th>
              <th>Mass</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody id='product-table-body'>
            {productList.map((item, index) => (
              <ProductRow
                key={index}
                product={item.product}
                describe={productData[item.product].describe}
                size={productData[item.product].size}
                unit={productData[item.product].unit}
                mass={productData[item.product].mass}
                unitPrice={productData[item.product].unit_price}
                quantity={item.quantity}
                onQuantityChange={e => {
                  const updatedList = [...productList]
                  updatedList[index].quantity = parseInt(e.target.value)
                  setProductList(updatedList)
                }}
                onDelete={() => removeProductRow(item.product)}
              />
            ))}
          </tbody>
        </table>

        <p>Total Price: ${totalPrice.toFixed(2)}</p>
      </section>
    </div>
  )
}

const productData = {
  A: {
    describe: 'Product A Description',
    size: { long: 1, wide: 2, height: 3 },
    unit: 'Unit A',
    mass: 'Mass A',
    unit_price: 1
  },
  B: {
    describe: 'Product B Description',
    size: { long: 1, wide: 2, height: 3 },
    unit: 'Unit B',
    mass: 'Mass B',
    unit_price: 2
  },
  C: {
    describe: 'Product C Description',
    size: { long: 1, wide: 2, height: 3 },
    unit: 'Unit C',
    mass: 'Mass C',
    unit_price: 3
  }
}
