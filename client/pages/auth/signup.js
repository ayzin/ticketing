import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email,
            password
        },
        onSuccess: () => Router.push('/')
    });
    const onSubmit = async (event) => {
        event.preventDefault();
        await doRequest();
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            <div className="form-group mt-2">
                <label>Email Address</label>
                <input className="form-control" onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="form-group mt-2">
                <label>Password</label>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" />
            </div>
            {errors}
            <button className="btn btn-primary mt-2">Sign Up</button>
        </form>
    )
}

export default SignUp;