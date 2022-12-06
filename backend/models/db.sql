CREATE DATABASE restaurant_db;

CREATE TABLE foods(
id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL UNIQUE,
description VARCHAR(300) NOT NULL,
imageUrl VARCHAR(200) NOT NULL,
price REAL NOT NULL,
available BOOLEAN DEFAULT true,
category VARCHAR(50) NOT NULL
);

CREATE TABLE orders(
id SERIAL PRIMARY KEY,
details TEXT NOT NULL,
customer_name VARCHAR(150),
customer_number VARCHAR(15),
total_price REAL NOT NULL,
order_state VARCHAR(20)
);

CREATE TABLE delivery_fees(
id SERIAL PRIMARY KEY,
location VARCHAR(150),
price REAL NOT NULL
available BOOLEAN DEFAULT true,
)