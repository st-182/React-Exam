import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

html,body{
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  margin: 0;
  padding: 0;
  text-align: center;
  text-transform: uppercase;
  

}


*,*::after,*::before{
  box-sizing: border-box;
  transition: 1000ms;
}





body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(255, 255, 255);
  background-color: #ff7700;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23cd3535' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23aa1515' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%23d41931' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23ac2934' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23d90d4c' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23ae133e' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23d32c72' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23ab1959' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23c4298f' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%239e0471' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%23a816a8' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%23872887' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
 
}

#root {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  min-height: calc(100vh - 35px);
  padding-bottom: 35px;
}

/*! Navigation */
header {
  border-radius: 0 0 50px 50px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  height: 30px;
}
header div {
  background: rgba(128, 128, 128, 0.8);
  min-width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}
header div img {
  width: 50%;
  height: 30px;
  object-fit: cover;
  object-position: 0% 100%;
}

nav {
  width: calc(100% - 250px);
}
ul {
  display: grid;
  grid-template-columns: auto auto auto auto;
  list-style-type: none;
  margin: 0 auto;
  padding: 0;
  overflow: hidden;
  backdrop-filter: blur(10px);
  background-color: rgba(51, 51, 51, 0.4);
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 5px 26px;
  text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
li a:hover {
  background-color: rgba(17, 17, 17, 0.8);
}
/*! Navigation Ended */

/*! Footer */
footer {
  position: absolute;
  bottom: 0;
  max-width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
  background-color: rgba(51, 51, 51, 0.4);
  width: 100%;
  padding: 5px 16px;
  border-radius: 50px 50px 0 0;
}


button, input[type=submit] {
  border-radius: 50%;
  width: 70px;
  height: 70px;
  background: transparent;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  border-color: rebeccapurple;
  margin: 0 auto;
}

button:hover, input[type=submit]:hover {
  border-radius: 50% 100px;
  width: 170px;
  font-size: 1.5rem;
}

button:active, input[type=submit]:active {
  font-size: 1.7rem;
  border: 10px solid rgba(102, 51, 153, 0.75);
  transition: 0s;
  text-shadow: 2px 2px 20px rgb(0, 0, 0);
  backdrop-filter: blur(15px);
  /* background-color: rgba(255, 255, 255, 0.2); */
}
form{
  display: grid;
  grid-template-columns: 1fr 1fr;
input:not([type="submit"]) {
          padding: 10px;
          font-size: 1rem;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 10px;
          border: 1px solid white;
          color: rgb(61, 60, 71);
        }
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
