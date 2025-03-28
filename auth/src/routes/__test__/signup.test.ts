import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successfull signup',async () => {
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com', 
        password: '123456'
    })
    .expect(201);
})

it('returns a 400 with an invalid email',async () => {
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@.com', 
        password: '123456'
    })
    .expect(400);
})

it('returns a 400 with an invalid password',async () => {
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com', 
        password: 'jfi'
    })
    .expect(400);
})

it('returns a 400 with missing email and password',async () => {
    await request(app)
    .post('/api/users/signup')
    .send({email: 'test@test.com'})
    .expect(400);

    await request(app)
    .post('/api/users/signup')
    .send({password: '123456'})
    .expect(400);
})

it('disallows duplicate emails',async () => {
    await request(app).
    post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: '123445'
    }).expect(201);

    await request(app).
    post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: '123445'
    }).expect(400);
})

it('sets a cookie after successful signup',async () => {
    const response = await request(app).
    post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: '123445'
    }).expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();

})
