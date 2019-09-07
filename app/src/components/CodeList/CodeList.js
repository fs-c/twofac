import React from 'react';

import Alert from 'react-bootstrap/Alert';

const CodeList = ({ liveCode, remainingTime }) => {
    return (<>
        {(liveCode && liveCode.current) && (
            <Alert variant='dark' className='bg-dark text-light border-success'>
                Your code has been generated
                <hr className='mt-1 mb-2' />
                <Alert.Heading>
                    {liveCode.current} <small className='text-muted'>{remainingTime}s</small> 
                    <span className='float-right text-muted'>
                        {liveCode.old}
                    </span>
                </Alert.Heading>
            </Alert>
        )}
    </>);
};

export default CodeList;
