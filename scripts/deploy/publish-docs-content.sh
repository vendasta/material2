#!/bin/bash

# Publish material2 docs assets to the material2-docs-content repo
# material.angular.io will pull from this assets repo to get the latest docs

# The script should immediately exit if any command in the script fails.
set -e

cd "$(dirname $0)/../../"

if [[ ! ${*} == *--no-build* ]]; then
  $(npm bin)/gulp material-examples:build-release:clean
  $(npm bin)/gulp docs
fi

# Path to the project directory.
projectPath="$(pwd)"

# Path to the directory that contains the generated docs output.
docsDistPath="${projectPath}/dist/docs"

# Path to the cloned docs-content repository.
docsContentPath="${projectPath}/tmp/material2-docs-content"
mkdir -p ${projectPath}/tmp

# Path to the release output of the @angular/material-examples package.
examplesPackagePath="${projectPath}/dist/releases/material-examples"

# Current version of Angular Material from the package.json file
buildVersion=$(node -pe "require('./package.json').version")

# Name of the branch that is currently being deployed.
branchName=${TRAVIS_BRANCH:-'master'}

# Additional information about the last commit for docs-content commits.
commitSha=$(git rev-parse HEAD)
commitAuthorName=$(git --no-pager show -s --format='%an' HEAD)
commitAuthorEmail=$(git --no-pager show -s --format='%ae' HEAD)
commitMessage=$(git log --oneline -n 1)
commitTag="${buildVersion}-${commitSha}"

buildVersionName="${buildVersion}-${commitSha}"
buildTagName="${branchName}-${commitSha}"
buildCommitMessage="${branchName} - ${commitMessage}"

echo "Starting deployment of the docs-content for ${buildVersionName} in ${branchName}"

# Remove the docs-content repository if the directory exists
rm -Rf ${docsContentPath}
mkdir ${docsContentPath}

# Go into the repository directory.
cd ${docsContentPath}
echo "Switched into the documentation directory."
echo "Copying all files into repository.."

# Create all folders that need to exist in the docs-content repository.
mkdir ${docsContentPath}/{overview,guides,api,examples,stackblitz,examples-package}

# Copy API and example files to the docs-content repository.
cp -R ${docsDistPath}/api/* ${docsContentPath}/api
cp -r ${docsDistPath}/examples/* ${docsContentPath}/examples
cp -r ${docsDistPath}/stackblitz/* ${docsContentPath}/stackblitz

# Copy the @angular/material-examples package to the docs-content repository.
cp -r ${examplesPackagePath}/* ${docsContentPath}/examples-package

# Copy the license file to the docs-content repository.
cp ${projectPath}/LICENSE ${docsContentPath}

# Copy all immediate children of the markdown output the guides/ directory.
for guidePath in $(find ${docsDistPath}/markdown/ -maxdepth 1 -type f); do
  cp ${guidePath} ${docsContentPath}/guides
done

# All files that aren't immediate children of the markdown output are overview documents.
for overviewPath in $(find ${docsDistPath}/markdown/ -mindepth 2 -type f); do
  cp ${overviewPath} ${docsContentPath}/overview
done

echo "Successfully copied all content into the docs-content folder."

fileName=material-docs-${commitSha}.tar.gz

cd ..
tar -zcvf ${fileName} material2-docs-content

echo "Created tar of docs: ${fileName}"
