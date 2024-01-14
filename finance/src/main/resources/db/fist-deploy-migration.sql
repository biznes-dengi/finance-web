CREATE DATABASE finance;

CREATE TABLE user_account (
    id_user_account SERIAL PRIMARY KEY,
    role VARCHAR(10) NOT NULL,
    email VARCHAR(100) NOT NULL,
    pass VARCHAR(16) NOT NULL,
    phone_number VARCHAR(16) NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP
);

CREATE TABLE finance_goal (
    id_goal SERIAL PRIMARY KEY,
    title VARCHAR(25) NOT NULL,
    state VARCHAR(15) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    description VARCHAR(100),
    target_amount NUMERIC(38,2) NOT NULL,
    deadline TIMESTAMP NOT NULL,
    risk_profile VARCHAR(15),
    created_on TIMESTAMP NOT NULL,
    last_change TIMESTAMP,
    id_user_account INT,
    FOREIGN KEY (id_user_account) REFERENCES user_account(id_user_account)
);

CREATE TABLE deposit (
    id_deposit SERIAL PRIMARY KEY,
    deposit_type VARCHAR(8) NOT NULL,
    description VARCHAR(100),
    funding_date TIMESTAMP NOT NULL,
    amount NUMERIC(38,2) NOT NULL,
    id_finance_goal INT,
    FOREIGN KEY (id_finance_goal) REFERENCES finance_goal(id_goal)
);
