# React SetUp Project For Server

Welcome to the **setUp-server-projects**, a solid foundation for your React projects. This template is meticulously crafted to streamline your development process by offering a comprehensive set of essential tools and libraries commonly utilized in React development.

## Project Overview

- **Name**: setUp-server-projects
- **Privacy**: Private
- **Version**: 0.0.1
- **Type**: Personal

## Features

Our React boilerplate template comes loaded with a wealth of features and dependencies:

- **PrivateRoute**
- **React Routing**:
- **ContextApi**
- **Google login and email login**

## Dependencies

- **React**: The foundational library for crafting exceptional user interfaces.
- **React Router DOM**: Empowering your React application with smooth routing capabilities.
- **Firebase**: A versatile backend service catering to authentication, storage, and seamless database integration.
- **React Toastify**: A notification and toast library to keep your users informed.
- **AOS (Animate On Scroll)**: Elevate your UI by adding stunning scroll-triggered animations.
- **LocalForage**: A versatile asynchronous storage library, perfect for offline web applications.
- **Match Sorter**: A utility for flexible list searching and sorting.
- **Sort By**: Simplifying the process of sorting lists or arrays.
- **Other**: Many More.

### Development Tools

We've got you covered with an array of development tools and libraries:

- **Vite**: A high-speed, modern build tool and development server for JavaScript applications.
- **DaisyUI**: A utility-first CSS framework that expedites custom design creation.
- - **AWESOME components** `most powerful library`: A utility-first CSS framework that expedites custom design creation.This is a list of AWESOME components. Nope, it's NOT a comprehensive list of 
                           every React component under the sun.
- **Tailwind CSS**: A utility-first CSS framework, highly customizable to suit your design needs.
- **ESLint**: Ensuring your code quality through linting and style checking.
- **PostCSS and Autoprefixer**: Aiding in CSS handling and automatic addition of vendor prefixes.
- **Babel**: JavaScript transpilation for compatibility with diverse browsers.
- **Other**: Many More.

## Scripts

We've simplified your development process with these convenient npm scripts:

- `npm run dev`: Kickstart your development journey with the Vite development server.
- `npm run build`: Prepare your project for production deployment.
- `npm run lint`: Ensure code quality with ESLint, automatically fixing linting issues.
- `npm run preview`: Get a preview of your finalized application.

## Getting Started

To embark on your project, follow these straightforward steps:

**Just Clone the Repository, install `npm i` & Start Your Project**: In your command line or terminal, navigate to your chosen project directory and clone the repository using Git:
***If You clone this file then never forget to delete `.git` folder for create & a new repository***

   ```shell
   git 
   clone https://github.com/sajjadujjamanemon09/setUp-client-projects.git

   ```

**OR Go Through Following The Installation SetUp**

1. **Install React Router Dom**: 👉️ Open up your terminal and bootstrap a new React app with Vite: We'll be using Vite for our bundler and dev server for this tutorial. You'll need Node.js installed for the `npm` command line tool.

   ```shell
   mkdir 'your project name'
   ```

   This command will automatically download and install all necessary packages and libraries file.

   - **cd your new project directory**: 

   ```shell
   npm init -y
   ```



2. **Install**: Install require  files.

   ```shell
   npm i express cors dotenv mongodb
   ```
   - **Initialized Tailwind Project** :

   ```shell
   npx tailwindcss init -p
   ```
   - **Configure your template paths**: Add the paths to all of your template files in your` tailwind.config.js` file.

   ```shell
     content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
   ```
   - **Add the Tailwind directives to your CSS**: Add the `@tailwind` directives for each of Tailwind’s layers to your `./src/index.css` file.

   ```shell
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

3. **Install daisyUI:**: 

   ```shell
   npm i -D daisyui@latest
   ```
   - **Then add daisyUI to your `tailwind.config.js` files:**
   
   ```shell
     plugins: [require("daisyui")],
   ```
   - **Then go to your `.eslintrc.js` file & add this `env: {browser: true, node: true, es6: true}` into this:**
  
   ```shell
      node: true,
   ```

4. **Setup Router**: Go to `main.jsx` remove `<App/>` & Set this process:

   - **First: Import this**
  
   ```shell
   import {RouterProvider} from "react-router-dom";
   ```

   - **Second: Add this into where remove `<App/>`**

   ```shell
   <RouterProvider router={router} />
   ```

   - **Third: Import this into `Routes.jsx`**: Create a `Routes` folder under `src` then create a file `Routes.jsx`:
  
   ```shell
   import {createBrowserRouter}
   ```

   - **Fourth: Add this into `Routes.jsx`**:
     
   ```shell
   export const router = createBrowserRouter([
      {path: "/",
      element: <div>Hello world!</div>,
      },
      ]);
   ```



### Now You Are Ready To ##GO