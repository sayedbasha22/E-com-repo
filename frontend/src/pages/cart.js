import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios.get('http://172.22.157.221:8083/cart')
      .then(res => {
        setCartItems(res.data);
      })
      .catch(err => {
        console.error('Cart fetch error:', err);
        alert('Cannot load cart - check if Cart-service is running on 8083');
      });
  }, []);

  const total = cartItems.reduce((sum, item) => sum + (item.finalPrice || item.price), 0);

  const removeItem = (index) => {
    axios.delete(`http://172.22.157.221:8083/cart/${index}`)
      .then(() => {
        const newCart = cartItems.filter((_, i) => i !== index);
        setCartItems(newCart);
      })
      .catch(err => {
        console.error('Cart remove error:', err);
        alert('Failed to remove item');
      });
  };

  return (
    <>
      <h2 className="mb-4">Your Cart ({cartItems.length} items)</h2>

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty. Add some products!</p>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>₹{item.finalPrice || item.price}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => removeItem(index)}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4>Total: ₹{total}</h4>
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => window.location.href = '/payment'}
            >
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
