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
                  name: 'sonar-scanner',
                  type: 'hudson.plugins.sonar.SonarRunnerInstallation'
              )

              def nodeHome = tool 'NodeJS-24'

              withSonarQubeEnv('SonarQube') {
                sh """
                    ${scannerHome}/bin/sonar-scanner \
                      -Dsonar.nodejs.executable=${nodeHome}/bin/node \
                      -Dsonar.projectKey=nodejs-app \
                      -Dsonar.projectName="Node.js App" \
                      -Dsonar.sources=. \
                      -Dsonar.exclusions=node_modules/**,coverage/**,.git/**
                """
            }
        }
    }
}


        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        stage('Trivy Filesystem Scan') {
            steps {
                sh '''
                   export TMPDIR=/data/trivy-tmp

                   trivy --config "" --cache-dir /data/trivy-cache --timeout 15m fs --scanners vuln,secret --severity HIGH,CRITICAL --format table --output /Devops/nodejs-app/reports/trivy-fs-report.txt .
        '''
     }
   }
        stage('Docker Build') {
            steps {
                sh '''
                  docker build -t nodejs-devops:v1 .
                  docker images nodejs-devops:v1
        '''
    }
  }
 }
    post {
      always {
            archiveArtifacts artifacts: 'trivy-fs-report.txt',
                             allowEmptyArchive: true
      }
    }
  }
