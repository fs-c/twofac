import React, { useState } from 'react';

import Input from './lib/Input';
import Button from './lib/Button';
import { Flex, Label, Error, VerticalSpacer } from './lib/utils';

import { API } from '../helpers';
import styled from 'styled-components';

const LoginContainer = styled(Flex).attrs({ direction: 'column' })`
    padding: 1em;
    border-radius: 5px;
    color: var(--accents-6);
    border: 1px solid var(--accents-6);
`;

const Login = ({ onLogin }) => {
    const [ error, setError ] = useState(null);
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleLogin = async () => {
        try {
            const token = await API.login(username, password);

            setError(null);
            onLogin(token, password);
        } catch (err) {
            setError(err);
        }
    };

    return (
        <LoginContainer>
            {error && (
                <>
                    <Error>
                        <b>{error.message}</b>
                        {error.details && <span><br />{error.details}</span>}
                    </Error>

                    <VerticalSpacer height={3} />
                </>
            )}

            <Input onChange={({ target }) => setUsername(target.value)}
                value={username} placeholder='Username' />

            <VerticalSpacer height={3} />

            <Flex direction='row'>
                <Input.Split onChange={({ target }) => setPassword(target.value)}
                    value={password} placeholder='Password' type='password' />

                <Button.Split onClick={() => handleLogin()}>
                    Sign in
                </Button.Split>
            </Flex>

            <Label>
                If the username doesn't exist, an account will be created
            </Label>
        </LoginContainer>
    );
};

export default Login;