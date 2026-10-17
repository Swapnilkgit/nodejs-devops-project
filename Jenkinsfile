
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
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sshagent(credentials: ['jenkins-build-key']) {
                    sh '''
                        mkdir -p "$WORKSPACE/.ssh"
                        chmod 700 "$WORKSPACE/.ssh"

                        printf '%s\\n' \
                          '192.168.1.10 ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIL8xaVScrKmtk/1kGy/DDwMVHdXZ9VFL6y6ubpP0IEZd' \
                          > "$WORKSPACE/.ssh/known_hosts"

                        chmod 600 "$WORKSPACE/.ssh/known_hosts"

                        ssh -o StrictHostKeyChecking=yes \
                            -o UserKnownHostsFile="$WORKSPACE/.ssh/known_hosts" \
                            jenkins-build@192.168.1.10
                    '''
                }
            }
        }
    }
}

