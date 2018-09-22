# ADCON 4 - Automation Repository
Welcome to the Adcon 4 automation repo using Typescript & Protractor.

<!-- TOC -->

## REQUIREMENTS

- [Visual Studio Code] (https://code.visualstudio.com/)
- [Source Tree] (https://www.sourcetreeapp.com/)

### INSTALLATION & SET UP VSC
Dowload VSC from the website and copy the app file to the Application folder and open it.

As you can see there is a Recomendation Extension Modal so click on 'Show me the recomendation' and install all of them before start with the code.

Also if you can't see the recomendation modal please go to Extensions and write:

```bash
@recommended:workspace
```

- [Example] (https://code.visualstudio.com/images/extension-gallery_recommendations.png)

### INSTALLATION & SET UP SOURCE TREE

Dowload Source Tree and install it copy the app file inside the Application Folder. Then you need introduce your Mimecast Username and network pass.

When the setup is done the next step is dowload the repository clicking on File > New > Clone for URL > <https://gitlab.devuk.mimecast.lan:2443/coreui/adcon-automation.git> or using the SSH URL <git@gitlab.devuk.mimecast.lan:coreui/adcon-automation.git>

## ARQUITECTURE PROJECT

```bash
├── JSFiles         # contains all the javascript files generated by TS
├── node_modules    # all repository libraries
├── TResult         # contains all the test results
├── tests           # contains all the test cases & page objects
│ ├── login         # each folder contains the scenarios for the multiple test cases
│   │  ├── Login-001.ts
│   │  ├── Login-002.ts
│   │  ├── ...
│ ├── menu
| ├── swg
| ├── userAwareness
│   └── pageObjects  # contains all the Page Objects classes
│   │  ├── Login.ts
│   │  ├── Logout.ts
│   │  ├── MainMenu.ts
│   │  ├── SWG.ts
│   │  ├── UrlProtection.ts
│   │  ├── utils    # contains all the general classes
| ├── mmc-credentials   # contains all the classes with sensitive data, ask for it.
│   └── Enviroments.ts
│   ├── Password.ts
│   ├── Urls.ts
│   └── USERS.ts
├── .gitignore
├── config.ts          # Project Configuration File
├── package.json       # NPM Package File
├── package-lock.json  # Auto-generated file - ** IF YOU HAVE THIS FILE PLEASE DON'T UPLOAD IT TO THE REPOSITORY AND TELL ME [Saray Gomez] TO DISABLE THIS OPTION ** -
├── README.md
├── tsconfig.json       # TS Configuration File
└── tslint.json        # TSLint Configuration File
```

# INSTALLATION

We need install this package to work with this repository, as you can see Protractor is not installed as Global Package as soon as we will install using our Package file inside the repository.
~~~~bash
$ npm install -g webdriver-manager      # Install Webdriver Manager
$ webdriver-manager update              # Updated Webdriver Manager
$ npm install -g typescript@2.3.4       # Install Typescript
~~~~

# START THE REPOSITORY

The first step is install all the repositories to run the project, just launch this command in the terminal been inside the root folder of the project.
~~~~bash
$ npm install
~~~~

# ASK FOR THE UTILS FOLDER

We need keep the security inside our repositories so please ask for the **utils** folder sending an email to [Saray Gomez](mailto:sgomez@mimecast.com?Subject=Send%20to%20me%20the%20utils%20folder) or someone else from the QA Adcon Team.

# RUN THE TESTS

Be sure that the VPN is connected and the spec that you want to run is define inside the line 17 for config.ts , e.g, specs: ['tracking/tracking.spec.js'] (the file should be the js no the ts file);

~~~~bash
$ webdriver-manager updated
$ webdriver-manager start
$ npm run test
~~~~

> I recomend create an aliase to run Webdriver-Manager:
> alias webdriver="webdriver-manager update && webdriver-manager start"
> Also you can create multiple aliase like:
> alias myNPMGlobals="npm list -g --depth=0"
> alias adcon4="cd GitLab/adcon4-automation/"

Also inside the package.json you will find more scripts with multiple options like enviroments urls, tsc generator, etc. to run them you need to write:

~~~~bash
$ npm run [scriptID] # e.g. npm run tsc
~~~~

## RUN SUITES

We can run packs of test cases predefined inside our config.ts file. If we want to run them we need run the next command line:

~~~~bash
$ webdriver-manager updated
$ webdriver-manager start
$ npm run suites [suiteID] # e.g. npm run suites SWG
~~~~

### CURRENT SUITES LIST

| ID  | NAME           | JENKINS |
| --- | :------------: | :-----: |
| LG  | Login          | ✅       |
| UA  | User Awareness | ✅       |
| T&T | Tracking       | -       |
| SWG | Web Security   | ❌       |
| RG  | Regression     | ❌       |

### CODE REFACTOR
| NAME   | REFACTORED |
| :----: | :--------: |
| Login  | ✅          |
| Logout | ✅          |
