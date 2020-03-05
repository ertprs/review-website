#!/bin/bash
echo "Environment: $BITBUCKET_DEPLOYMENT_ENVIRONMENT"
echo "commit: $BITBUCKET_COMMIT" 
#check if empty
host=${DEPLOY_HOST:?}
token=${DEPLOY_TOKEN:?}
jobId=${DEPLOY_JOB_ID:?}
extra_vars="{build_version: $BITBUCKET_COMMIT, $DEPLOY_VARS}"

export TOWER_HOST=$host
export TOWER_TOKEN=$token

echo "Run Job: $jobId"

RESULT=$(awx workflow_job_templates launch "${jobId}" --monitor -f human --filter status --extra_vars "$extra_vars" | tee /dev/stderr | tail -1)

if [ $RESULT = 'successful' ]; then 
    exit 0
else
    exit 1
fi