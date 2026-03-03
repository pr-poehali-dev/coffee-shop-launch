CREATE TABLE t_p83199393_coffee_shop_launch.orders (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(200) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  customer_email VARCHAR(200),
  customer_address TEXT,
  items JSONB NOT NULL,
  total_price INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);