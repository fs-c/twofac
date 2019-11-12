import styled from 'styled-components';

const Input = styled.input`
    width: auto;
    flex-grow: 1;
    padding: 0.4em 0.7em;

    min-width: 0;

    font-size: 1rem;
    line-height: 1.5;
    color: var(--foreground);
    background-color: var(--background);

    outline: none;
    border-radius: 5px;
    border: 1px solid var(--foreground);

    transition: 0.2s;

    :focus {
        border: 1px solid var(--accents-7);
    }

    ::placeholder {
        color: var(--accents-6);
    }
`;

const SplitInput = styled(Input)`
    border-radius: 5px 0 0 5px;
`;

Input.Split = SplitInput;

export default Input;
