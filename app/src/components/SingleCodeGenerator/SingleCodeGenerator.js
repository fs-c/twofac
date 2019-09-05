import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import { generateMobileCode } from '../../helpers';

const SingleCodeGenerator = () => {
    const [ code, setCode ] = useState('');
    const [ error, setError ] = useState(null);
    const [ secret, setSecret ] = useState('');

    const updateCode = async () => {
        setError(null);

        try {
            setCode(await generateMobileCode(secret));
        } catch (err) {
            setCode('');
            setError(err);

            console.error(err);
        }
    };

    return (<>
        <Form>
            <Form.Control className='bg-dark border-dark text-light'
                placeholder='Enter Shared Secret here'
                value={secret}
                onChange={(event) => setSecret(event.target.value)}
            />
            <Form.Text className='text-muted'>
                Your Shared Secret will not be transmitted to our servers
            </Form.Text>
        
            <Button variant='light' className='border mt-2 bg-dark text-light border-dark'
                onClick={updateCode}
            >
                Generate
            </Button>
        </Form>

        <div className='mt-3'>
            {error && (
                <Alert variant='danger' className='bg-dark text-light border-danger'>
                    An error occured while generating your token: <strong>{error.message}</strong>
                    <hr className='m-0 mt-1' />
                    <small>
                        If you have a minute, feel free to <a href='/contact' className='text-link'>send us an error report</a>, preferably 
                        with the error logged in the console (<kbd>F12</kbd>).
                    </small>
                </Alert>
            )}

            {code && (
                <Alert variant='dark' className='bg-dark text-light border-success'>
                    Your code has been generated
                    <hr className='mt-1 mb-2' />
                    <Alert.Heading>
                        {code}
                    </Alert.Heading>
                </Alert>
            )}
        </div>
    </>);
};

export default SingleCodeGenerator;
