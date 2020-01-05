import {GitHub} from '@actions/github/lib/github';
const core = require('@actions/core');
const github = require('@actions/github');

var createReview = function(client, pullRequest, comment) {
  client.pulls.createReview({
    owner: pullRequest.owner,
    repo: pullRequest.repo,
    pull_number: pullRequest.number,
    body: comment,
    event: 'COMMENT'
  });
}

try {
  let comment;
  if (!new RegExp(titleRegex).test(title)) {
    createReview(client, pullRequest, `Incorrect title format, regex for correct format is "${titleRegex}".`);
  }

} catch (error) {
  console.error(error.message);
}
