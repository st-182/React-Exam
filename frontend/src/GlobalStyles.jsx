import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
html,body{
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 1.3rem;
  text-transform: uppercase;
}
*,*::after,*::before{
  box-sizing: border-box
}

.container {
  display: grid;

  

  @media (min-width:786px){
    grid-template-columns: repeat(2, 1fr); 
  
  }

  @media (min-width: 1024px){
    grid-template-columns: repeat(3,1fr);

    
  }
}


`;
