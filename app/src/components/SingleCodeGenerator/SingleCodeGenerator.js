import React, { useState } from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import { useInterval, generateMobileCode, getRemainingTime } from '../../helpers';

const SingleCodeGenerator = () => {
    const [ code, setCode ] = useState('');
    const [ error, setError ] = useState(null);
    const [ secret, setSecret ] = useState('');
    const [ remainingTime, setRemainingTime ] = useState(0);

    const generateCode = () => {
        try {
            setCode(generateMobileCode(secret));
        } catch (err) {
            setError(err);
        }
    }

    useInterval(() => {
        const remaining = getRemainingTime();
        setRemainingTime(getRemainingTime());

        if (!secret) {
            return;
        }

        if (remaining === 30) {
            generateCode();
        }
    }, 1000);

    const handleSecretChange = ({ target }) => {
        const secret = target.value;

        setSecret(secret);

        if (secret) {
            generateCode();
        } else {
            setCode('');
        }
    };

    return (<>
        <div className='mt-3'>
            <InputGroup>
                <FormControl id='inputSharedSecret'
                    className='bg-dark border-dark text-light'
                    placeholder='Shared Secret'
                    value={secret}
                    onChange={handleSecretChange}
                />
            </InputGroup>

            <InputGroup className='mt-3'>
                <FormControl id='inputAlias'
                    className='bg-dark border-dark text-light'
                    placeholder='Alias'
                />

                <InputGroup.Append>
                    <Button variant='dark' className='mt-0 bg-dark text-light append-border-grey'>
                        Save
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        </div>

        <div className='mt-3'>
            {error && (
                <Alert variant='danger' className='bg-dark text-light border-danger'>
                    An error occured while generating your token: <strong>{error.message}</strong>
                    <hr className='m-0 mt-2' />
                    <small>
                        If you have a minute, feel free to <a href='/contact' className='text-link'>send me an error report</a>, preferably 
                        with the error logged in the console (<kbd>F12</kbd>).
                    </small>
                </Alert>
            )}

            {code && (
                <Alert variant='dark' className='bg-dark text-light border-success'>
                    Your code has been generated
                    <hr className='mt-1 mb-2' />
                    <Alert.Heading>
                        {code} <small className='text-muted'>{remainingTime}s</small>
                    </Alert.Heading>
                </Alert>
            )}
        </div>
    </>);
};

export default SingleCodeGenerator;
