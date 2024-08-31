const request = require('supertest');
const app = require('./index');

describe("User API", () => {
    // register api testing

    //  try to register without without body
    it('POST /register ---> should return error message', () => {
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
      
    it('POST /register ---> should return success message and user object', () => {
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
    it('POST /login ---> should return success message and user object', () => {
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
    it('POST /login ---> should return error message', () => {
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
});