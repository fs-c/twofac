import styled from 'styled-components';

const Button = styled.button`
    display: inline-block;
    padding: 0.4em 0.7em;

    white-space: nowrap;

    font-size: 1rem;
    line-height: 1.5;
    text-align: center;
    color: var(--accents-6);
    background-color: var(--background);

    outline: none;
    border-radius: 5px;
    border: 1px solid var(--accents-6);

    transition: 0.2s;

    :focus {
        background-color: var(--accents-1);
    }

    :hover {
        cursor: pointer;
        color: var(--accents-7);
        background-color: var(--accents-1);
    }
`;

const SplitButton = styled(Button)`
    border-left: 0px solid transparent;
    border-radius: 0 5px 5px 0;
`;

Button.Split = SplitButton;

export default Button;
