import React from 'react';

import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';

const CodeList = ({ liveCode, remainingTime, codes }) => {
    return (<>
        {(liveCode && liveCode.current) && (
            <Alert variant='dark' className='bg-dark text-light border-light'>
                Your code has been generated
                <hr className='mt-1 mb-2' />
                <Alert.Heading>
                    <code className='h4 mb-0 text-success steam-code'>
                        {liveCode.current}
                    </code>{' '}
                    <small className='text-muted'>{remainingTime}s</small> 

                    <code className='float-right text-muted h5 mb-0 steam-code'>
                        {liveCode.old}
                    </code>
                </Alert.Heading>
            </Alert>
        )}

        {(codes && codes.length) && (
            <ListGroup variant='flush' className='mt-4 rounded border'>
                {codes.map((c) => (
                    <ListGroup.Item key={c.secret} className='text-light bg-inherit list-border-transition'>
                        <span className='text-muted'>{c.alias}</span><br/>

                        <div className='h5 steam-code'>
                            <code>{c.code.current}</code>

                            <code className='steam-code text-muted float-right'>
                                {c.code.old}
                            </code>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        )}
    </>);
};

export default CodeList;
