# BioSentiers Frontend

This repository contains the Angular 2 frontend application for the BioSentiers project.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Requirements](#requirements)
- [Development](#development)
- [Tasks](#tasks)
- [Code Scaffolding](#code-scaffolding)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->



## Requirements

* Node.js 6.x
* [BioSentiers Backend][biosentiers-backend] running on port 3000 (by default)

Additional development requirements:

* [Angular CLI][angular-cli] (install with `npm install -g angular-cli`)



## Development

* Clone and move into this repository:

        git clone https://github.com/MediaComem/biosentiers-frontend.git
        cd biosentiers-frontend

* Install dependencies:

        npm install

* Run it:

        npm start

* Read the [contribution guidelines](CONTRIBUTING.md).



## Tasks

Command          | Purpose
`npm start`      | Run the Angular application in development mode (with live reload).
`npm run build`  | Build the Angular application for production (concatenate, minify and version assets). The build artifacts will be stored in the `dist` directory.
`npm run doctoc` | Regenerate the table of contents of the project's Markdown files.
`npm run lint`   | Check the code for readability, maintainability, and functionality errors.
`npm test`       | Run unit tests in development mode (with live reload).
`npm run test`   | Run unit tests once.
`npm run e2e`    | Run end-to-end tests once.
`npm run ci`     | Run all tests once.



## Code Scaffolding

Run `ng generate component component-name` to generate a new component.
You can also use `ng generate directive/pipe/service/class/module`.

Check out [Angular CLI's documentation][angular-cli-gen] for more information.



[angular-cli]: https://github.com/angular/angular-cli
[angular-cli-gen]: https://github.com/angular/angular-cli#generating-components-directives-pipes-and-services
[biosentiers-backend]: https://github.com/MediaComem/biosentiers-backend
