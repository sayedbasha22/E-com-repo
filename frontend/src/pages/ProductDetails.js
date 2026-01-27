import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://172.22.157.221:8081/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log('Details fetch error:', err));
  }, [id]);

  if (!product) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <Row className="align-items-center">
      <Col md={6}>
        <Card.Img
          src={
            product.name === "T-Shirt"
              ? "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop"
              : product.name === "Jeans"
              ? "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=800&auto=format&fit=crop"
              : "https://images.unsplash.com/photo-1592890288564-76628a30a0c9?w=800&auto=format&fit=crop"
          }
          alt={product.name}
          className="img-fluid rounded shadow"
          style={{ height: '500px', objectFit: 'cover' }}
        />
      </Col>
      <Col md={6}>
        <h2 className="mb-3">{product.name}</h2>
        <h3 className="text-danger mb-4">
          ₹{product.finalPrice}
          <small className="text-muted ms-2 text-decoration-line-through">₹{product.price}</small>
          <span className="badge bg-success ms-2 fs-5">{product.discountPercent}% OFF</span>
        </h3>
        <p className="text-muted mb-4">Inclusive of all taxes • Free Shipping • 7 Days Return</p>

        <div className="d-grid gap-3 d-md-flex">
          <Button
            variant="warning"
            size="lg"
            className="flex-grow-1"
            onClick={() => {
              axios.post('http://172.22.157.221:8083/cart/add', product)
                .then(() => alert(`${product.name} added to cart!`))
                .catch(err => {
                  console.error('Cart add error:', err);
                  alert('Failed to add to cart - check console');
                });
            }}
          >
            Add to Cart
          </Button>
          <Button
            variant="success"
            size="lg"
            className="flex-grow-1"
            onClick={() => {
              window.location.href = '/payment';
            }}
          >
            Buy Now
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default ProductDetails;
