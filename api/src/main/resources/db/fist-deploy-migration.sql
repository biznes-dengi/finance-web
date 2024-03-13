CREATE DATABASE finance;

CREATE TYPE fin_goal_state AS ENUM ('ACTIVE', 'ACHIEVED');
CREATE TYPE currency_code AS ENUM ('EUR', 'USD', 'PLN', 'BYN', 'RUB');
CREATE TYPE app_role AS ENUM ('admin', 'user');
CREATE TYPE user_gender AS ENUM ('male', 'female');
CREATE TYPE risk_profile_type AS ENUM ('conservative', 'moderate', 'aggressive');
CREATE TYPE transaction_type AS ENUM ('FUND', 'WITHDRAW');
CREATE TYPE fin_goal_image_type AS ENUM ('JPEG', 'JPG', 'PNG');

CREATE TABLE user_account (
    id_user_account SERIAL PRIMARY KEY,
    role app_role NOT NULL,
    email VARCHAR(100) NOT NULL,
    pass VARCHAR(16) NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    gender user_gender NOT NULL,
    date_of_birth TIMESTAMP NOT NULL,
    phone_number VARCHAR(16) NOT NULL,
    created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP
);

CREATE TABLE finance_goal (
    id_goal SERIAL PRIMARY KEY,
    title VARCHAR(25) NOT NULL,
    state fin_goal_state NOT NULL,
    currency currency_code NOT NULL,
    description VARCHAR(100),
    balance NUMERIC(38,2) NOT NULL,
    target_amount NUMERIC(38,2) NOT NULL,
    deadline TIMESTAMP,
    risk_profile risk_profile_type,
    image bytea,
    type_image fin_goal_image_type,
    created_on TIMESTAMP NOT NULL,
    last_change TIMESTAMP,
    id_user_account INT NOT NULL,
    FOREIGN KEY (id_user_account) REFERENCES user_account(id_user_account),
    CHECK (last_change > created_on)
);

CREATE TABLE deposit (
    id_deposit SERIAL PRIMARY KEY,
    deposit_type transaction_type NOT NULL,
    description VARCHAR(100),
    funding_date TIMESTAMP NOT NULL,
    amount NUMERIC(38,2) NOT NULL,
    id_finance_goal INT NOT NULL,
    FOREIGN KEY (id_finance_goal) REFERENCES finance_goal(id_goal),
);