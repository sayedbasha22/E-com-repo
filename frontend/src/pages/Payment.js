import { useEffect, useState } from 'react';
import { Card, Button, Alert, InputGroup, FormControl } from 'react-bootstrap';

const Payment = () => {
  const [total, setTotal] = useState(0);
  const [upiLink, setUpiLink] = useState('');
  const gstRate = 0.18; // 18% GST

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((sum, item) => sum + item.finalPrice, 0);
    const totalWithGst = subtotal * (1 + gstRate);
    const amount = Math.round(totalWithGst);

    setTotal(amount);

    // Generate real UPI link
    const link = `upi://pay?pa=merchant@okaxis&pn=MyEcom&am=${amount}&cu=INR&tn=Order_${Date.now()}&mode=02`;
    setUpiLink(link);
  }, []);

  const handlePay = () => {
    if (upiLink) {
      window.location.href = upiLink; // Try to open app (works on Android)
      alert('Opening payment app... (On PC, copy link below and test on phone)');
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(upiLink);
    alert('UPI link copied! Paste in phone browser or share to test');
  };

  return (
    <div className="text-center">
      <h2>Payment Options</h2>
      <Card className="mx-auto mt-4" style={{ maxWidth: '600px' }}>
        <Card.Body>
          <Alert variant="success">
            <strong>Total Amount (incl. 18% GST): ₹{total}</strong>
          </Alert>

          <p className="mb-4">
            Click button to open app (works on Android phone)<br />
            Or copy UPI link below and test on phone
          </p>

          <Button 
            variant="primary" 
            size="lg" 
            className="mb-3 w-100" 
            onClick={handlePay}
          >
            Pay with Google Pay / PhonePe
          </Button>

          <InputGroup className="mt-4">
            <FormControl 
              value={upiLink} 
              readOnly 
              placeholder="UPI link generating..."
            />
            <Button variant="outline-secondary" onClick={copyLink}>
              Copy Link
            </Button>
          </InputGroup>

          <small className="text-muted d-block mt-3">
            Tip: Open http://172.22.157.221:3000 on your phone (same Wi-Fi) for full app experience
          </small>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Payment;
