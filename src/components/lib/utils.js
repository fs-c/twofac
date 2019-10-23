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
