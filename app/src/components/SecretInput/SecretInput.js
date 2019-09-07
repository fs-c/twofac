import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const SecretInput = ({ liveSecret, setLiveSecret }) => {
    // TODO: When added as an inline style, this doesn't make it into the HTML DOM,
    // investigate
    /* const codeStyle = codes[0] ? {
        background: `linear-gradient(90deg, black ${1 - (remainingTime / 30)}%, inherit 0%)`,
    } : {}; */

    return (<>
        <div className='mt-3'>
            <InputGroup>
                <FormControl id='inputSharedSecret'
                    className='bg-dark border-dark text-light'
                    placeholder='Shared Secret'
                    value={liveSecret}
                    onChange={({ target }) => setLiveSecret(target.value)}
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
    </>);
};

export default SecretInput;
