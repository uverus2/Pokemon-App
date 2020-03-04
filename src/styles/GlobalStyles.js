import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle `

    body::-webkit-scrollbar {
        background-color: ${({ theme }) => theme.colors.mainYellow};
      }

    body::-webkit-scrollbar-thumb{
        background-color:${({ theme }) => theme.colors.thirdNavy};
      }
`;

export default GlobalStyles;