import { render, screen, fireEvent } from '@testing-library/react'; //render nos brinda que se abrerera
import '@testing-library/jest-dom'
import React from 'react';
import { MemoryRouter } from 'react-router-dom'; // Importa el Router de Memoria


import App from './App'; //esto importa la app main del componenete

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/dashboard/i); //encuentra el elemento dashboard para probar
//   expect(linkElement).toBeInTheDocument(); //asegura que exista en el DOM
// });



// // Revisar si al ingresar se le da la bienvenida al cliente 

// test('renders default welcome message when no token is present', () => {
//   render(
//     <MemoryRouter>
//       <Dashboard />
//     </MemoryRouter>
//   );
//   const welcomeMessage = screen.getByText(/Welcome back, User!/i); 
//   expect(welcomeMessage).toBeInTheDocument();
// });





// 🧹 borrar local storage token para las pruebas
afterEach(() => {
  localStorage.clear();
});

// // : HomePage como root "/"
// test('renders HomePage for route /', () => {
//   render(
    
//       <App />
   
//   );
//   expect(screen.getByText(/Welcome to the HomePage/i)).toBeInTheDocument(); 
//   //  Asegurar que el componente HomePage contenga esto
// });


// // Test: pagina Login "/login"
// test('renders Login for route /login', () => {
//   render(
   
//       <App />
  
//   );
//   expect(screen.getByText(/Login/i)).toBeInTheDocument(); 
//   //  Asegurar que el componente HomePage contenga esto en el elemento Login
// });

// Test: Dashboard cuado esta ingresado
test('renders Dashboard when logged in', () => {
  localStorage.setItem('access', 'fakeToken'); //simular login

  render(
   
      <App />
   
  );
  expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  // asegurar que Dashboard tenga esta description
});

// Test: Redireccionamiento si no esta authenticado
test('redirects to login page if not logged in and tries to access dashboard', () => {
  localStorage.removeItem('access'); //asegurar que no esta ingresado

  render(
  
      <App />
   
  );
  expect(screen.getByText(/Login/i)).toBeInTheDocument(); 
});



// // Test: AddHomeForm at "/add-home"
// test('should render AddHomeForm for route /add-home', () => {
//   render(<App />);
//   const headingElement = screen.getByText(/Add a New Home/i);
//   expect(headingElement).toBeInTheDocument();

//   console.log(screen.debug());
// });




