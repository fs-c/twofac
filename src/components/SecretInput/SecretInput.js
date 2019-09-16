import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const SecretInput = ({ setLiveSecret, saveSecret }) => {
    const [ alias, setAlias ] = useState('');
    const [ secret, setSecret ] = useState('');

    const handleSaveClick = () => {
        if (!secret.length) {
            // TODO: Communicate this somehow, maybe color the secret input border red
            return;
        }

        saveSecret({ alias, secret });
    }

    return (<>
        <InputGroup>
            <FormControl id='inputSharedSecret'
                className='bg-dark border-dark text-light'
                placeholder='Shared Secret'
                value={secret}
                onChange={({ target }) => setSecret(target.value)}
                autoComplete='off-secret-8219843724'
            />

            <InputGroup.Append>
                <Button variant='dark' className='bg-dark text-light append-border-grey'
                    onClick={() => setLiveSecret(secret)}
                >
                    Generate
                </Button>
            </InputGroup.Append>
        </InputGroup>

        <InputGroup className='mt-3'>
            <FormControl id='inputAlias'
                className='bg-dark border-dark text-light'
                placeholder='Alias'
                value={alias}
                onChange={({ target }) => setAlias(target.value)}
                autoComplete='off-alias-2399048514'
            />

            <InputGroup.Append>
                <Button variant='dark' className='mt-0 bg-dark text-light append-border-grey'
                    onClick={handleSaveClick}
                >
                    Save
                </Button>
            </InputGroup.Append>
        </InputGroup>
    </>);
};

export default SecretInput;
