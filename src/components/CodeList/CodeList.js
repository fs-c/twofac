import React, { useState } from 'react';

import Alert from 'react-bootstrap/Alert';
import Collapse from 'react-bootstrap/Collapse';
import ListGroup from 'react-bootstrap/ListGroup';

const ListItem = ({ alias, currentCode, oldCode, active = false, onClick = () => {} }) => {
    return (
        <ListGroup.Item className={`bg-inherit text-light list-border-transition`}
            onClick={onClick}
            style={{
                filter: `brightness(${active ? '2' : '1'})`,
            }}
        >
            <div className='text-muted'>
                {alias}
            </div>

            <div className='h5 steam-code'>
                <code>{currentCode}</code>

                <code className='steam-code text-muted float-right'>
                    {oldCode}
                </code>
            </div>
        </ListGroup.Item>
    );
};

const CodeList = ({ liveCode, remainingTime, codes, deleteSecret }) => {
    const [ activeItems, setActiveItems ] = useState({});

    const handleItemClick = ({ alias }) => {
        setActiveItems((active) => {
            return { ...active, [alias]: !active[alias] };
        });
    };

    const handleDeleteActive = () => {
        setActiveItems([]);

        Object.keys(activeItems).filter((alias) => activeItems[alias])
            .forEach((alias) => deleteSecret(alias));
    };

    return (<>
        {(liveCode) ? (
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
        ) : null}

        {(codes && codes.length) ? (
            <ListGroup variant='flush' className='mt-4 rounded border'>
                {codes.map((c) => (
                    <ListItem key={c.alias} alias={c.alias} currentCode={c.code.current}
                        oldCode={c.code.old} active={activeItems[c.alias] === true}
                        onClick={() => handleItemClick(c)}
                    />
                ))}

                <Collapse in={Object.values(activeItems).includes(true)}>
                    <div>
                        <ListGroup.Item className='bg-inherit text-light'
                            style={{
                                borderTop: '1px solid #dee2e6',
                            }}
                        >
                            <div className='float-right mb-2'>
                                {/* <Octicon icon={Flame} verticalAlign='top'
                                    ariaLabel='Delete' /> */}

                                <span className='link'
                                    onClick={() => handleDeleteActive()}
                                >
                                    Delete
                                </span>
                            </div>
                        </ListGroup.Item>
                    </div>
                </Collapse>
            </ListGroup>
        ) : null}
    </>);
};

export default CodeList;
