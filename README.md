# Lullaby - A Tinnitus Treatment

![Lullaby](https://uselullaby.com/static/social/home-en.png)

Lullaby is a tinnitus treatment that implements Tinnitus Retraining Therapy (TRT, a form of cognitive behavioral therapy), one of the most successful ways to deal with chronic Tinnitus, as well as Notched White Noise, a very promising way to try and reduce the volume of Tinnitus and change its characteristics to make it easier to handle.

The way it works is by generating white noise with a very specific notch centered around the user's Tinnitus frequency in order to implement Notched White Noise.

## The Code

The product is coded in React with the [Next.JS](https://nextjs.org/) framework. The codebase is pretty straightforward and you can find most modules in the `pages` directory:

- pages/index.js > The Home Page
- pages/diagnostic.js > A Walkthrough to help users find their Tinnitus frequency.
- pages/treatment/index.js > The treatment, it's basically a play button and a timer.
- pages/instructions.js > Some basic instructions for user's reference.
- components/\* > The components of the app, split into site and app.
- libs/\* > Audio and user libraries.

The project is available in English and Spanish with react-i18n, which doesn't let the site be compiled statically (or at least not without some serious refactoring).

## Setting up the environment

This should be pretty strightforward:

- `npm ci` to install the dependencies
- `npm run dev` to start development mode with live reload
- `npm run build` to build the product for prodouction
- `npm run start` to run the production code.

The project can run both in a Dockerfile as well serverless in [Vercel](https://vercel.com).

## Disclaimer

This project should be considered an experiment, and even though it implements some very well known techniques, _you should always check with a doctor before trying it out_.

## License

GPL 3, as all things should be.
