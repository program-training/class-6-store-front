pipeline {
    agent any
    stages {
        stage('Checkout') {  
            steps {
                script { 
                    def pullRequestBranch = env.GITHUB_PR_SOURCE_BRANCH
                    checkout([$class: 'GitSCM', branches: [[name: "*/${pullRequestBranch}"]], userRemoteConfigs: [[url: 'https://github.com/program-training/class-6-store-front.git']]])
                }
            }
        }
        stage('clean work space'){
            steps{
                script {
                    sh 'npm cache clean --force'
                }
            }
        }  
        stage('Install Dependencies') {
            steps {
                script {
                    echo 'Installing dependencies...'
                    sh 'npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint'
                }
            }
        }
        stage('client lint') {
            steps {
                script {
                    sh 'echo "linting..."'
                    sh 'npm run lint'
                }
            }
        }
    }
    post {
        success {
            script {
                echo 'Linting passed. You may now merge.'
                setGitHubPullRequestStatus(
                    state: 'SUCCESS',
                    context: 'class6 pipelines  /  store-front',
                    message: 'lint passed',
                )
            }
        }
        failure {
            script {
                echo 'Pipeline failed. Blocking pull request merge.'
                setGitHubPullRequestStatus(
                    state: 'FAILURE',
                    context: 'class6 pipelines  /  store-front',
                    message: 'lint failed. Run npm run lint to see errors',
                )
            }
        }
    }
}
