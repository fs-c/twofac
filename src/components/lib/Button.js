import styled from 'styled-components';

const Button = styled.button`
    font-size: 1rem;
    line-height: 1.5;
    text-align: center;
    display: inline-block;
    padding: 0.4em 0.7em;
    background-color: var(--background);
    color: var(--foreground);
    border: 1px solid var(--accents-6);
    border-radius: 5px;
    outline: none;

    transition: 0.2s;

    :focus {
        border: 1px solid var(--accents-8);
    }

    :hover {
        cursor: pointer;
        border: 1px solid var(--accents-8);
    }
`;

const SplitButton = styled(Button)`
    border-radius: 0 5px 5px 0;
`;

Button.Split = SplitButton;

export default Button;
