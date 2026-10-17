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

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Validate Application') {
            steps {
                sh 'node --check app.js'
                sh 'npm --version'
                 }
            }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }    
   }
}
