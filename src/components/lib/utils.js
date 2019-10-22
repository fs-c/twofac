import styled from 'styled-components';

export const scale = (x) => Math.pow(2, x);

export const Container = styled.div`
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
`;

export const VerticalSpacer = styled.div`
    height: ${({ height }) => `${typeof height === 'string' ? height : Math.pow(2, height) + 'px'}`};
`;
