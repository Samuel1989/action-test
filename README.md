# Pull Request Linter
A GitHub Action to check that pull request titles match a given regex string and creates either an approval or a comment requesting changes and adds/removes a label depending on whether or not it has passed or failed.

# Options
| Option        | Description           | Required  |
| ------------- |:-------------:| -----:|
| github-token | Token of the GitHub repository running the action | True |
| title-regex      | The regex used to validate the title of a pull request | True |
| title-failed-comment      | A message that describes the failure to the end user      | False |
| label-text | Label text of the label to be added or removed.     |    False |


# Usage
Create a workflow definition at .github/workflows/<workflow>.yml with the following content (substiting the options with your own values):

```
name: Pull Request Lint

on:
  pull_request:
    types: [opened, edited, reopened]

jobs:
  pr_lint_job:
    runs-on: ubuntu-latest
    name: A job to lint pull requests
    steps:
    - name: Action Step
      id: prlint
      uses: Samuel1989/pull-request-linter@master
      with:
        title-regex: '^(feature|fix)\/*(.+)$'
        title-failed-comment: 'Incorrect title format, regex for correct format is %titleRegex%.'
        label-text: "Pull request not in correct format"
        github-token: "${{ secrets.GITHUB_TOKEN }}"
```
