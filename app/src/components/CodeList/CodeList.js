import React from 'react';

import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';

const ListItem = ({ alias, currentCode, oldCode }) => {
    /* const [ isActive, setIsActive ] = useState(false); */

    return (
        <ListGroup.Item className='text-light bg-inherit list-border-transition'
            /* onMouseEnter={() => setIsActive(true)} onMouseLeave={() => setIsActive(false)} */
        >
            {/* <span className={`text-muted ${isActive ? ' in' : ''}visible`}>{alias}</span>
            <span className={`color-rotating-inline ${isActive ? 'float-left ' : ' in'}visible`}>{alias}</span><br/> */}

            <span className='text-muted'>{alias}</span>

            <div className='h5 steam-code'>
                <code>{currentCode}</code>

                <code className='steam-code text-muted float-right'>
                    {oldCode}
                </code>
            </div>
        </ListGroup.Item>
    );
}

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
                    <ListItem key={c.alias} alias={c.alias} currentCode={c.code.current}
                        oldCode={c.code.old} />
                ))}
            </ListGroup>
        )}
    </>);
};

export default CodeList;
