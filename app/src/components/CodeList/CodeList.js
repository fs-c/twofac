import React from 'react';

import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';

const CodeList = ({ liveCode, remainingTime, codes }) => {
    const borderStyle = {
        background: 'inherit',
        borderBottom: '1.5px solid transparent',
        borderImage: `linear-gradient(90deg, black 10%, #6c757d 80%)`,
        borderImageSlice: '1',
    };

    return (<>
        {(liveCode && liveCode.current) && (
            <Alert variant='dark' className='bg-dark text-light border-light'>
                Your code has been generated
                <hr className='mt-1 mb-2' />
                <Alert.Heading>
                    <span className='h4 mb-0 text-success code'>{liveCode.current}</span> <small className='text-muted'>{remainingTime}s</small> 
                    <span className='float-right text-muted h5 mb-0 code'>
                        {liveCode.old}
                    </span>
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

                        <div className='h5 code'>
                            {c.code.current}

                            <span className='h5 code text-muted float-right'>
                                {c.code.old}
                            </span>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        )}
    </>);
};

export default CodeList;
