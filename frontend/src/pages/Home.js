import { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}:8081/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Product fetch failed:", err));
  }, []);

  return (
    <>
      <h2 className="mb-4 text-center">Featured Products</h2>

      {products.length === 0 ? (
        <p className="text-center">Loading products...</p>
      ) : (
        <Row>
          {products.map((product) => (
            <Col md={4} sm={6} xs={12} key={product.id} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src="https://images.unsplash.com/photo-1592890288564-76628a30a0c9?w=500"
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.name}</Card.Title>
                  <div className="mt-auto">
                    <h5 className="text-danger mb-1">
                      ₹{product.finalPrice}
                    </h5>
                    <Link
                      to={`/product/${product.id}`}
                      className="btn btn-primary w-100 mt-2"
                    >
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
