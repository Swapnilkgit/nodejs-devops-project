pipeline {
    agent any

    tools {
        nodejs 'NodeJS-24'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/Swapnilkgit/nodejs-devops-project.git'
            }
        }

        stage('Check Node.js') {
            steps {
                sh 'node --version && npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Validate Application') {
            steps {
                sh 'node --check app.js'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('SonarQube Analysis') {
            steps {
              script {
                def scannerHome = tool(
                  name: 'SonarScanner',
                  type: 'hudson.plugins.sonar.SonarRunnerInstallation'
            )
            withSonarQubeEnv('SonarQube') {
               withEnv(["SONAR_TOKEN=${env.SONAR_AUTH_TOKEN}"]) {
                 sh """
                    ${scannerHome}/bin/sonar-scanner \
                     -Dsonar.projectKey=nodejs-app \
                     -Dsonar.projectName="Node.js App" \
                     -Dsonar.sources=. \
                     -Dsonar.exclusions=node_modules/**,coverage/**,.git/**
          """
    }
}
        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}
