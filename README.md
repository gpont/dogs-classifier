# Test project for Dott

The test project is a dog breed classifier. You can upload a photo of a dog to
the application, the application will determine the breed of the dog (using a
pre-trained model from
https://github.com/tensorflow/tfjs-models/tree/master/mobilenet and
tensorflow.js), and also show a gallery of photos of dogs of the same breed(api
with images of dogs: https://dog.ceo/dog-api/). The gallery will be lazy-loaded
and infinitely scrollable.

## Hosting

You can see the running application on Heroku at url: TODO

## Usage

### Installation

For installation run commands:

```bash
git clone https://github.com/gpont/dogs-classifier.git
cd ./dogs-classifier
npm i
```

### Start

To start the project, simply run:

```bash
npm run start
```

### Other useful commands

Linting:

```bash
npm run lint
```

To test you application, use:

```bash
npm run test
```

## Architecture

The application is written on react with redux and uses the architectural
pattern of unidirectional data flow. The redux toolkit was also used to reduce
redux boilerplate and redux-thunks for working with side effects.

The logic of determining the breed is taken out separately in
[./src/businessLogic](./src/businessLogic). The application uses the principle
of isolated features that encapsulate the view and the dependencies of a
particular view (for example, a slice of the corresponding store or an API
interaction service). The types of the domain area are also separately placed in
the [./src/@types/domain](./src/@types/domain)

## Authors

- [@gpont](https://www.github.com/gpont)
