import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const SecretInput = ({ setLiveSecret }) => {
    const [ secret, setSecret ] = useState(null);

    return (<>
        <InputGroup>
            <FormControl id='inputSharedSecret'
                className='bg-dark border-dark text-light'
                placeholder='Shared Secret'
                value={secret}
                onChange={({ target }) => setSecret(target.value)}
                autocomplete='off'
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
            />

            <InputGroup.Append>
                <Button variant='dark' className='mt-0 bg-dark text-light append-border-grey'>
                    Save
                </Button>
            </InputGroup.Append>
        </InputGroup>
    </>);
};

export default SecretInput;
