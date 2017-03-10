# Github app

#### Epicodus Captio Project, March 2017.

#### By **Marta Sánchez**

[Github repository](https://github.com/mrtsanchez/githire)

## Description

This is a website where users may enter a GitHub username into a form, submit it, and see names and descriptions of that person's public repositories.

![app-screenshot](https://github.com/mrtsanchez/githire/blob/master/img/githire-screenshot.png)


## Setup/Installation Requirements

To run app locally: In terminal, navigate to your desktop and execute:
  * `$ git clone https://github.com/mrtsanchez/githire`
  * `$ npm install`
  * `$ bower install`

Create a new file and place your API Key there:

  * exports.apiKey = "YOUR-API-KEY";

**Github API limits and setup:**

This app uses the GitHub API to retrieve the data. This API allows 5,000 requests per hour with an API key, but only 60 requests per hour without one. Everyone is therefore required to use their own unique key. GitHub refers to these keys as "Personal Access Tokens".

*Creating Personal Access Tokens*

Visit the Settings area of your GitHub account, select Personal Access Tokens from the sidebar, and hit Generate New Token. GitHub will offer a list of options. Do not select any. These grant read/write permissions and access to personal data. Finally, select Generate Token.


## Known Bugs

If an API call returns an error, there's no alert message in the interface.

## Technologies Used

HTML, Javascript, CSS.


### License

Published under MIT License.

Copyright (c) 2017 **_Marta Sánchez_**
