# Marvelpedia

Marvelpedia is an opinionated, possibly over-engineered project that demonstrates the advantages and disadvantages of an hexagonal architecture in a pseudo-real frontend application.

Link to the deployed version: [Live Environment](https://marvelpedia-app.vercel.app/)

## Running Locally

1. Clone the project.
2. Create a `.env.local` file under `./app` with the following content:
  
  ```bash
  VITE_API_KEY= "{your marvel api developer key}"
  ```
> [!IMPORTANT]  
> Your API key must be properly configured to serve requests to localhost.
  
3. In the root folder, run:
```bash
npm run install
```
4. Start the development server:
```bash
npm run dev
``` 

### Npm scripts ###

To install the dependencies

```sh
npm install
```

To run the frontend project

```sh
npm run dev
```

To lint all the code
```sh
npm run lint
```

To run the unit testing

```sh
npm run test:unit
```

To run the E2E
```sh
npm run test:e2e
```

To launch the interactive ui of playwright to manually run tests
```sh
npm run test:e2e:ui
```

## Architecture

The project follows a hexagonal architecture. This architecture offers two main advantages. First, it decouples the business logic from the visual application and the framework. Second, it creates a middleware between the backend and the frontend, making the frontend more robust when changes are made to the backend. However, hexagonal architectures can make the code more complex and may be seen as over-engineering for small applications.

There are 3 main modules, and the project itself is organized as a monorepo:
The `app` folder contains the React application. It allows us to easily create multiple apps using the business logic from our modules.
The `config` folder contains configuration files that are shared across the modules.
The `modules` folder is where the hexagonal architecture is implemented. It currently contains one module (with some shared code), but additional modules should follow the same structure.


### modules

Each module is divided in four layers, **Domain**, **Infrastructure**, **Application** and **Presentation**.

**Domain**, **Application** and **Presentation** has all the irreplaceable code in our software that we can't just swap out for another library or framework. It's also the code that's much less likely to need to change because it represents what our business does. **Infrastructure**  On the other side contains all the implementations that are eager tto change on the time, like a change on a backend endpoint.

#### Domain

In the **Domain** layer, we have all the entities, business logic, and validations.  
Currently, there is no business logic, but we can imagine a function called `canSuperHeroFly` being represented inside `superhero.ts`.

#### Infrastructure

In the **Infrastructure** layer, we can implement as many versions of the interfaces defined in the **Domain** layer as we want. Using terminology from Hexagonal Architecture, the interfaces in the **Domain** layer are called _Ports_, and the implementations in the **Infrastructure** layer are called _Adapters_.

The idea is that we should be able to switch adapters without breaking the application. The `superhero` module has two adapters: `fakeApi` and `marvelApi`.

#### Application

In the **Application** layer, we have all the use cases of Marvelpedia. Use cases represent the features of our app (e.g., `find all superheroes`).

Most use cases involve making requests to a repository. When these requests require parameters from user input, it is necessary to first execute the validation functions defined in the **Domain** layer.

#### Presentation

In the **Presentation** layer, it has been decided to use Redux. Redux is an agnostic library used to manage the state of an application. We can think of each module as a state machine; it has a defined state and a set of actions that generate a new state. The implementation typically calls one or more use cases from the **Application** layer to perform these state mutations.

## TESTING

The entire application is covered with unit tests using Vitest. From the `root` folder, you can execute all the tests in the modules with:

```sh
npm run test:unit
```

Alternatively, you can navigate to each module to run its own test script manually.

Additionally, an end-to-end (E2E) test has been implemented in the `app` module to cover the complete process of loading superheroes and filtering by name. This test is done using Playwright and can be run from either the `root` folder or the `app` folder with:

To run the E2E tests:
```sh
npm run test:e2e
```

To launch the interactive UI of Playwright for manually running tests:
```sh
npm run test:e2e:ui
```

## App

The app is a simple React application using React Router in case we want to expand it with additional pages (e.g., superhero details). It uses `react-redux` to seamlessly link the application with our presentation layer.

It has been decided to implement infinite scroll instead of a button for a better user experience (in my opinion). 
For the loading state, a skeleton card has been implemented instead of a spinner for the same reason.

The styling has been done using Tailwind CSS, taking care of creating a mobile first application.

> [!NOTE]  
> Seems that the external link button are all returning 404 error
  

## Next steps

1. Better error handling fot the backend responses
2. Implement storybook in the components folder
3. husky pre commits
4. pipelines in github