![CI](https://github.com/mchirico/ts-express/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/mchirico/ts-express/branch/master/graph/badge.svg)](https://codecov.io/gh/mchirico/ts-express)


# ts-express

Typescript project:

- Node backend
- Angular front-end 
- Firebase 

Live demo [tsexpress.cwxstat.io](https://tsexpress.cwxstat.io/) Make sure
you install all missing packages.

StackBlitz [ts-express](https://stackblitz.com/github/mchirico/ts-express/tree/master/angular)


This is meant to be a very simple starter project, for quickly
testing Typescript code. It does contain angular 10

## Running Tests

Run the Firebase emulator when testing.

```
firebase emulators:start
```


For live pull of pubSub messages reference: 
<a href='https://github.com/mchirico/go-pubsub'>https://github.com/mchirico/go-pubsub</a>


# upgrade

```
# install npm-check-updates
ncu -u
npm install
```

## Starting

Also see the Makefile

```
git clone https://github.com/mchirico/ts.git
git co express
npm install
npm test

```

