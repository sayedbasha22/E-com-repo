import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import API_BASE_URL from "../config";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}:8083/cart`)
      .then((res) => setCartItems(res.data))
      .catch(() => alert("Cannot load cart"));
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + (item.finalPrice || item.price),
    0
  );

  const removeItem = (index) => {
    axios
      .delete(`${API_BASE_URL}:8083/cart/${index}`)
      .then(() => setCartItems(cartItems.filter((_, i) => i !== index)));
  };

  return (
    <>
      <h2>Your Cart</h2>
      <Table bordered>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>₹{item.finalPrice || item.price}</td>
              <td>
                <Button variant="danger" onClick={() => removeItem(index)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h4>Total: ₹{total}</h4>
    </>
  );
};

export default Cart;
