import {GitHub} from '@actions/github/lib/github';
const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  //const nameToGreet = core.getInput('who-to-greet');
  //console.log(`Hello ${nameToGreet}!`);
  // Get the JSON webhook payload for the event that triggered the workflow
  const token = core.getInput('repo-token');
  const client: GitHub = new GitHub(token);
  const payload = github.context.payload;
  const pullRequest = github.context.issue;
  const title = payload.title;
  const body = payload.body;

  console.log("title", title);
  console.log("body", body);
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  let comment;
  if (!new Regex(titleRegex).test(title)) {
    comment = 'Incorrect title format, correct format is "{hr|engage|recruit|core|pay|work|perform|learn|analytics}/{feature|fix}/{description}".'
  }

  if (comment) {
    client.pulls.createReview({
      owner: pullRequest.owner,
      repo: pullRequest.repo,
      pull_number: pullRequest.number,
      body: comment,
      event: 'COMMENT'
    });
    core.setFailed('Pull Request lint failed.');
  }


} catch (error) {
  core.setFailed(error.message);
}
