import React from 'react';

import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';

const CodeList = ({ liveCode, remainingTime, codes }) => {
    // This could be moved to a .css file, but it's kept around in here in 
    // case the idea of communicating the remaining time through styling is 
    // ever relevant again
    const borderStyle = {
        background: 'inherit',
        borderBottom: '1.5px solid transparent',
        borderImage: `linear-gradient(90deg, black 20%, #6c757d 100%)`,
        borderImageSlice: '1',
    };

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
                    <ListGroup.Item key={c.secret} className='text-light'
                        style={borderStyle}
                    >
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
