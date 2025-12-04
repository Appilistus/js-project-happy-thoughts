// styled.d.ts
import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            primary: string;
            secondary: string;
            formBackground: string,
            likeBtnBackground: string,
            cardBackground: string;
            text: string;
            textSecondary: string;
            border: string;
        };
        breakpoints: {
            mobile: string;
            tablet: string;
            desktop: string;
        };
    }
}
