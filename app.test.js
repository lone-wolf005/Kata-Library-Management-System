const request = require('supertest');
const app = require('./index');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDMyMWNmMGZjYTAyZmIyMjc3YWU4NyIsImlhdCI6MTcyNTEzMTA4MiwiZXhwIjoxNzI1MjE3NDgyfQ.CtbD_efsnRCmgFyc8pPa6rRkfUw0AgBd4tdn7y5GmLA"

describe("User API", () => {
    // register api testing

    //  try to register without without body
    it('POST api/v1/register ---> should return error message', () => {
        return request(app)
            .post('/api/v1/user/register')
            .expect('Content-Type', /json/)
            .expect(400)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: false,
                        error: expect.any(String)
                    })
                );
            });
    });   

    // test for register with proper input body
    // it will fail if email address is already registered
      
    it('POST api/v1/register ---> should return success message and user object', () => {
        return request(app)

            .post('/api/v1/user/register')
            .send({
                name: 'jigar',
                email: 'ab1@gmail.com',
                password: '1234'
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: true,               
                        message: expect.any(String), 
                        user: expect.objectContaining({
                            _id: expect.any(String),   
                            name: expect.any(String),
                            email: expect.any(String),
                            password: expect.any(String),
                            borrowedBooks: expect.any(Array),
                            __v: expect.any(Number)
                        })
                    })
                );
            });
    });

        // test for login api with correct credentials
    it('POST api/v1/login ---> should return success message and user object', () => {
            return request(app)
    
                .post('/api/v1/user/login')
                .send({
                    email: 'abc@gmail.com',
                    password: '1212'
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .then((response) => {
                    expect(response.body).toEqual(
                        expect.objectContaining({
                            success: true,               
                            message: expect.any(String), 
                            user: expect.objectContaining({
                                _id: expect.any(String),   
                                name: expect.any(String),
                                email: expect.any(String),
                                borrowedBooks: expect.any(Array),
                                __v: expect.any(Number)
                            })
                        })
                    );
                });
        });
        // test for login api with incorrect credentials
    it('POST api/v1/login ---> should return error message', () => {
            return request(app)
    
                .post('/api/v1/user/login')
                .send({
                    email: 'abcc@gmail.com',
                    password: '1234'
                })
                .expect('Content-Type', /json/)
                .expect(400)
                .then((response) => {
                    expect(response.body).toEqual(
                        expect.objectContaining({
                            success: false,
                            error: expect.any(String)
                        })
                    );
                });
        });

    it('POST api/v1/logout ---> should return success message', () => {
            return request(app)
    
                .delete('/api/v1/user/logout')
                .expect('Content-Type', /json/)
                .expect(200)
                .then((response) => {
                    expect(response.body).toEqual(
                        expect.objectContaining({
                            success: true,
                            message: expect.any(String)
                        })
                    );
                });
        });
});

describe("Book API", () => {

    // testcase for addBook 

    it('POST api/v1/addBook ---> should return success message and book object', () => {
        const newBook = {
            title: "Mybook3",
            author: "jigar",
            publishedYear: 2024
        };
    
        return request(app)
            .post('/api/v1/book/addBook')
            .send(newBook)
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: true,                     
                        message: expect.any(String),     
                        data: expect.objectContaining({   
                            ISBN: expect.any(Number),        
                            title: newBook.title,           
                            author: newBook.author,          
                            publishedYear: newBook.publishedYear, 
                            isAvailable: true,              
                            borrowedBy: null,              
                            _id: expect.any(String),       
                            __v: expect.any(Number)     
                        })
                    })
                );
            });
    });

    // testcase for borrowBook

    it('PUT api/v1/borrowBook ---> should return success message and book object', () => {
        return request(app)
            .put('/api/v1/book/borrowBook/66d36045cecff4ca6a1bbb2b')
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: true,                     
                        message: expect.any(String),     
                        data: expect.objectContaining({   
                            ISBN: expect.any(Number),        
                            title: newBook.title,           
                            author: newBook.author,          
                            publishedYear: newBook.publishedYear, 
                            isAvailable: true,              
                            borrowedBy: null,              
                            _id: expect.any(String),       
                            __v: expect.any(Number)     
                        })
                    })
                );
            });
    });

    // testcase for returnBook

    it('PUT api/v1/returnBook ---> should return success message and book object', () => {
        return request(app)
            .put('/api/v1/book/returnBook/66d36045cecff4ca6a1bbb2b')
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: true,                     
                        message: expect.any(String),     
                        data: expect.objectContaining({   
                            ISBN: expect.any(Number),        
                            title: newBook.title,           
                            author: newBook.author,          
                            publishedYear: newBook.publishedYear, 
                            isAvailable: true,              
                            borrowedBy: null,              
                            _id: expect.any(String),       
                            __v: expect.any(Number)     
                        })
                    })
                );
            });
    });

    // testcase for viewing all the books

    it('GET /api/v1/book/getAllBooks ---> should return success message and list of books', () => {
        return request(app)
            .get('/api/v1/book/getAllBooks')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                                    expect.objectContaining({    
                                        data:expect.arrayContaining([
                                            expect.objectContaining(
                                            {   
                                                ISBN: expect.any(Number),        
                                                title: expect.any(String),          
                                                author: expect.any(String),         
                                                publishedYear: expect.any(Number),
                                                isAvailable: true,              
                                                borrowedBy: null,              
                                                _id: expect.any(String),       
                                                __v: expect.any(Number)     
                                            })
                                            ])
                                        })
                                    );
                                });

    });


    it('GET /api/v1/book/getAllBooks ---> should return success message and list of books', () => {
        return request(app)
            .get('/api/v1/book/getAllAvailableBooks')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                                    expect.objectContaining({    
                                        data:expect.arrayContaining([
                                            expect.objectContaining(
                                            {   
                                                ISBN: expect.any(Number),        
                                                title: expect.any(String),          
                                                author: expect.any(String),         
                                                publishedYear: expect.any(Number),
                                                isAvailable: true,              
                                                borrowedBy: null,              
                                                _id: expect.any(String),       
                                                __v: expect.any(Number)     
                                            })
                                            ])
                                        })
                                    );
                                });

    });
    
});