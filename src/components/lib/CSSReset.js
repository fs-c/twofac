import { createGlobalStyle } from 'styled-components';

const CSSReset = createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, "Noto Sans", sans-serif;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
    }

    h1, h2, h3, h4, h5, h6 {
        margin-top: 0;
        margin-bottom: 0.5rem;
    }

    p {
        margin-top: 0;
        margin-bottom: 1rem;
    }

    b,
    strong {
        font-weight: bolder;
    }

    small {
        font-size: 80%;
    }

    pre,
    code,
    kbd,
    samp {
        font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        font-size: 1em;
    }
`;

export default CSSReset;
