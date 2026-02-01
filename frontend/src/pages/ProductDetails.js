import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import API_BASE_URL from "../config";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}:8081/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const addToCart = () => {
    axios
      .post(`${API_BASE_URL}:8083/cart/add`, product)
      .then(() => alert("Added to cart"))
      .catch(() => alert("Failed to add to cart"));
  };

  if (!product) return <p>Loading...</p>;

  return (
    <Card className="p-4">
      <Card.Title>{product.name}</Card.Title>
      <h4>₹{product.finalPrice}</h4>
      <Button onClick={addToCart}>Add to Cart</Button>
    </Card>
  );
};

export default ProductDetails;
