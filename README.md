![CI](https://github.com/mchirico/ts-express/workflows/CI/badge.svg)
![Angular](https://github.com/mchirico/ts-express/workflows/Angular/badge.svg)
[![codecov](https://codecov.io/gh/mchirico/ts-express/branch/master/graph/badge.svg)](https://codecov.io/gh/mchirico/ts-express)
[![Maintainability](https://api.codeclimate.com/v1/badges/400a383ea8380adafa63/maintainability)](https://codeclimate.com/github/mchirico/ts-express/maintainability)
[![codebeat badge](https://codebeat.co/badges/0796b697-a331-4b66-b493-a455bc26114e)](https://codebeat.co/projects/github-com-mchirico-ts-express-master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/04745c578b4c423584d473ef74758ad7)](https://app.codacy.com/manual/mchirico/ts-express?utm_source=github.com&utm_medium=referral&utm_content=mchirico/ts-express&utm_campaign=Badge_Grade_Dashboard)

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

