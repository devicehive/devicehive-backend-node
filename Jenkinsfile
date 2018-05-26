properties([
  buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '32', daysToKeepStr: '', numToKeepStr: '100'))
])

def publishable_branches = ["development", "master"]

node('docker') {
  stage('Build and publish Docker images in CI repository') {
    checkout scm
    echo 'Building image ...'
    def DevicehiveBackendNode = docker.build('devicehiveci/devicehive-backend-node:${BRANCH_NAME}', '--pull -f Dockerfile .')

    echo 'Pushing image to CI repository ...'
    docker.withRegistry('https://registry.hub.docker.com', 'devicehiveci_dockerhub'){
      DevicehiveBackendNode.push()
    }
  }
}

if (publishable_branches.contains(env.BRANCH_NAME)) {
  node('docker') {
    stage('Publish image in main repository') {
      // Builds from 'master' branch will have 'latest' tag
      def IMAGE_TAG = (env.BRANCH_NAME == 'master') ? 'latest' : env.BRANCH_NAME

      docker.withRegistry('https://registry.hub.docker.com', 'devicehiveci_dockerhub'){
        sh """
          docker tag devicehiveci/devicehive-backend-node:${BRANCH_NAME} registry.hub.docker.com/devicehive/devicehive-backend-node:${IMAGE_TAG}
          docker push registry.hub.docker.com/devicehive/devicehive-backend-node:${IMAGE_TAG}
        """
      }
    }
  }
}
