import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import { useInterval, generateMobileCode, getRemainingTime } from '../../helpers';

const SingleCodeGenerator = () => {
    const [ code, setCode ] = useState('');
    const [ error, setError ] = useState(null);
    const [ secret, setSecret ] = useState('');
    const [ remainingTime, setRemainingTime ] = useState(0);

    const updateCode = async () => {
        setCode('');
        setError(null);

        try {
            setCode(await generateMobileCode(secret));
        } catch (err) {
            setCode('');
            setError(err);

            console.error(err);
        }
    };

    useInterval(async () => {
        const remaining = getRemainingTime();

        if (remaining === 30) {
            await updateCode();
        }

        setRemainingTime(getRemainingTime());
    }, 1000);

    return (<>
        <Form>
            <Form.Group>
                <Form.Control id='inputSharedSecret'
                    className='bg-dark border-dark text-light'
                    placeholder='Shared Secret'
                    value={secret}
                    onChange={(event) => setSecret(event.target.value)}
                />

                <Form.Text className='text-muted'>
                    Your Shared Secret will not be transmitted to our servers
                </Form.Text>
            </Form.Group>
            
            <Button variant='light' className='border mt-0 bg-dark text-light border-dark'
                onClick={updateCode}
            >
                Generate
            </Button>
        </Form>

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
