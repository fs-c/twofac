import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';

import CodeList from '../CodeList/CodeList';
import SecretInput from '../SecretInput/SecretInput';

import {
    useInterval, generateMobileCode, getRemainingTime, LocalSecretStore
} from '../../helpers';

const generateCodeTuple = (secret) => {
    return {
        old: generateMobileCode(secret, -30),
        current: generateMobileCode(secret),
    };
};

const populateCodeList = (list) => {
    if (!list || !list.length) {
        return;
    }

    return list.map((e) => {
        e.code = generateCodeTuple(e.secret);

        return e;
    });
};

const Home = () => {
    const [ liveCode, setLiveCode ] = useState(null);
    const [ liveSecret, setLiveSecret ] = useState(null);

    const [ codeListItems, setCodeListItems ] = useState([]);

    const [ remainingTime, setRemainingTime ] = useState(-1);

    useInterval(() => {
        // If it was reset in the last tick
        if (remainingTime === 1) {
            setLiveCode(generateCodeTuple(liveSecret));

            setCodeListItems(populateCodeList(codeListItems));
        }

        setRemainingTime(getRemainingTime());
    }, 1000);

    useEffect(() => {
        setLiveCode(generateCodeTuple(liveSecret));

        setCodeListItems(populateCodeList(LocalSecretStore.getAll()));
    }, [ liveSecret ]);

    const saveSecret = ({ alias, secret }) => {
        codeListItems.push({
            alias, secret, code: generateCodeTuple(secret),
        });

        setCodeListItems(codeListItems);

        LocalSecretStore.add(alias, secret);
    };

    return (<>
        <div className='h-100 pt-3 pt-md-5 pb-4'>
            <Container>
                <p>
                    <strong className='color-rotating'>twofac</strong>

                    <span className='text-muted float-right'>
                        <a className='text-link' href='/what?'>/what?</a> <a className='text-link' href='/contact'>/contact</a>
                    </span>
                </p>

                <p>
                    A web implementation of <a className='text-link' href='https://support.steampowered.com/kb_article.php?ref=8625-wrah-9030'>Steam flavored Two-Factor Authentication</a>.
                </p>

                <div className='mt-3'>
                    <SecretInput setLiveSecret={setLiveSecret} saveSecret={saveSecret} />
                </div>

                <div className='mt-4'>
                    <CodeList remainingTime={remainingTime} liveCode={liveCode}
                        codes={codeListItems}
                    />
                </div>
            </Container>
        </div>
    </>);
};

export default Home;
