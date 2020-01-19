const core = require('@actions/core');
const github = require('@actions/github');

try {
  const token = core.getInput('github-token');
  const client = new github.GitHub(token);
  const payload = github.context.payload;
  const pullRequest = github.context.issue;
  const title = payload.pull_request.title;

  console.log('payload', payload);
  console.log('pullRequest', pullRequest);
} catch (error) {
  console.error(error.message);
}
