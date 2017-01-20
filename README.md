# Scriba

> A mobile app that allows users to post and view messages on location.

![Map view](/screenshots/map.PNG)
![Nearby posts](/screenshots/nearby.PNG)
![A post](/screenshots/post.PNG)

## Table of Contents

1. [Team](#team)
2. [Usage](#usage)
3. [Requirements](#qequirements)
4. [Installing dependencies](#installing-dependencies)
5. [Run the application](#run-the-application)
6. [Troubleshooting](#troubleshooting)
7. [Resources](#resources)

## Team

  - __Product Owner__: Dan Burke
  - __Scrum Master__: Dennis Nguyen
  - __Engineers__: Stephen Om, Cai Lu

## Usage
The client-side of the Scriba mobile app. The server can be found at: https://github.com/Wizards2016/ScribaServer.

## Requirements

- npm
- React 15.4.1
- React Native 0.39.2
- Xcode

## Installing dependencies
After cloning this repository, in the root directory:
```sh
$ brew install node
$ brew install watchman
$ npm install -g react-native-cli
$ sudo gem install cocoapods
```
Make sure you have Xcode downloaded before the next steps.

## Run the application

Start the server for this application (link to repo can be found above).

In the root directory:
```sh
$ npm install
$ react-native link
$ react-native run-ios
```

## Troubleshooting
- When running `react-native link`, the path to the root directory cannot contain folder names with spaces

## Resources

- [React Native: Getting Started](https://facebook.github.io/react-native/docs/getting-started.html)
- [Auth0: React Native iOS](https://auth0.com/docs/quickstart/native/react-native-ios)
