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
  grid-template-columns: repeat(1fr);
  grid-template: 'topnav' 'header' 'content' 'signup' 'feature1' 'feature2' 'feature3';


  .topnav {
     grid-area: topnav;
  }

  .header {
    grid-area: header;
  }

  .content {
    grid-area: content;
  }

  .signup {
    grid-area: signup;
  }

  .feature1 {
    grid-area: feature1;
  }

  .feature2 {
    grid-area: feature2;
  }

  .feature3 {
    grid-area: feature3;
  }


  @media (min-width:786px){
    grid-template-columns: repeat(2, 1fr); 
  
    grid-template: 'topnav topnav' 'header header' 'content content' 'signup feature1' 'feature2 feature3';
  
    
  }

  @media (min-width: 1024px){
    grid-template-columns: repeat(3,1fr);

    grid-template: 'topnav topnav topnav'
    'header header header'
    'feature1 feature2 feature3'
    'signup signup signup'
    'content content content'
    ;
  }
}


`;
