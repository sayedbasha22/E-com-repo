import { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://172.22.157.221:8081/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log('Home fetch error:', err));
  }, []);

  return (
    <>
      <h2 className="mb-4 text-center">Featured Products</h2>
      {products.length === 0 ? (
        <p className="text-center">Loading products...</p>
      ) : (
        <Row>
          {products.map(product => (
            <Col md={4} sm={6} xs={12} key={product.id} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={
                    product.name === "T-Shirt"
                      ? "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop"
                      : product.name === "Jeans"
                      ? "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=500&auto=format&fit=crop"
                      : "https://images.unsplash.com/photo-1592890288564-76628a30a0c9?w=500&auto=format&fit=crop"
                  }
                  alt={product.name}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.name}</Card.Title>
                  <div className="mt-auto">
                    <h5 className="text-danger mb-1">
                      ₹{product.finalPrice}
                      <small className="text-muted ms-2 text-decoration-line-through">
                        ₹{product.price}
                      </small>
                      <span className="badge bg-success ms-2">
                        {product.discountPercent}% OFF
                      </span>
                    </h5>
                    <Link to={`/product/${product.id}`} className="btn btn-primary w-100 mt-2">
                      View Details
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Home;
