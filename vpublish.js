const shell = require('shelljs');
const semverCmp = require('semver-compare');
const git = require('simple-git');

function publishToNpm() {
  shell.echo('======== Publishing material2 to npm =======')
  const localVersion = shell.exec(`cat ./package.json | grep version | awk '{gsub(/"/, "", $2); gsub(/,$/,""); print $2}'`, {
    silent: true,
  }).stdout.trim();
  const remoteVersion = shell.exec('npm view @vendasta/material2 version', {silent: true}).stdout.trim();
  const versionComparison = semverCmp(localVersion, remoteVersion);
  switch (versionComparison) {
    case 1:
      const tag = localVersion.includes('rc') ? 'next' : 'latest'
      shell.echo(`Publishing with tag: "${tag}"`);
      if (shell.exec(`npm publish ./dist/releases/material --tag ${tag} --access public`).code !== 0) {
        shell.echo('Error: publish failed');
        shell.exit(1);
      }
      break;
    case 0:
      shell.echo('Not publishing material2 to npm. Matching version ' + localVersion + ' found on npm.');
      break;
    case -1:
      shell.echo('Not publishing material2 to npm. Newer version ' + remoteVersion + ' found on npm.');
      break;
    default:
      shell.echo('Something unexpected occurred, aborting publish step.');
      shell.exit(1);
      break;
  }
  shell.echo('====== FINISHED PUBLISHING TO NPM ======');
}

git().branchLocal((_, branch) => {
  if (branch.current === 'master') {
    publishToNpm();
  } else {
    shell.echo(`Not publishing to npm, branch ${branch.current} is not master`);
  }
});
