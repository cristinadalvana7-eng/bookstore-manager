CREATE TABLE authors (
    id INTEGER PRIMARY KEY,
    name VARCHAR(150) NOT NULL
);

CREATE TABLE books (
    id INTEGER PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    author_id INTEGER NOT NULL,
    available BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT fk_books_author
        FOREIGN KEY (author_id)
        REFERENCES authors(id)
);

CREATE TABLE clients (
    id INTEGER PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL
);

CREATE TABLE loans (
    id INTEGER PRIMARY KEY,
    book_id INTEGER NOT NULL,
    client_id INTEGER NOT NULL,
    loan_date DATE NOT NULL,
    return_date DATE,
    returned BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_loans_book
        FOREIGN KEY (book_id)
        REFERENCES books(id),
    CONSTRAINT fk_loans_client
        FOREIGN KEY (client_id)
        REFERENCES clients(id)
);