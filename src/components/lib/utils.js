import styled from 'styled-components';

export const scale = (x) => x * 4;

export const Flex = styled.div`
    width: 100%;
    display: flex;
    flex-direction: ${({ direction }) => direction || 'column'};
`;

export const Container = styled(Flex)`
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
`;

export const VerticalSpacer = styled.div`
    height: ${({ height }) => `${typeof height === 'string' ? height : Math.pow(2, height) + 'px'}`};
`;

export const Label = styled.small`
    font-size: 80%;
    padding: 0.3em 0;
    color: var(--accents-6);

    display: inline-block;
`;

export const RunningText = styled.p`
    color: var(--accents-7);
`;

export const CenteredText = styled.p`
    text-align: center;
`;

export const Error = styled.div`
    padding: 0.5em 0.8em 0.5em 0.8em;
    border-radius: 5px;
    color: var(--accents-7);
    border: 1px solid var(--error);

    & span {
        color: var(--accents-6);
    }
`;

export const Card = styled.div`
    padding: 1em;
    border-radius: 5px;
    color: var(--accents-6);
    border: 1px solid var(--accents-6);
`;
