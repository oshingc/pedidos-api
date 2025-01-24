CREATE TABLE t_order (
    order_id integer primary key,
    order_number integer not null,
    client_id integer not null
);

CREATE TABLE t_client (
    client_id integer primary key,
    client_name varchar(40),
    client_lastname varchar(40),
    email varchar(40)
);

CREATE TABLE t_order_product (
    order_product_id integer primary key,
    order_id integer not null,
    product_id integer not null,
    quantity integer not null
);

CREATE TABLE t_product (
    product_id integer primary key,
    product_name varchar(40),
    price float,
    stock integer
);