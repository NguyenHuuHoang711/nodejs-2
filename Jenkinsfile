pipeline {
    agent any

    environment {
        IMAGE_NAME = 'nodejs-frontend'
        CONTAINER_NAME = 'nodejs-frontend'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                }
            }
        }

        stage('Build React') {
            steps {
                dir('frontend') {
                    bat 'npm run build'
                }
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t %IMAGE_NAME% ./frontend'
            }
        }

        stage('Docker Run') {
            steps {
                bat '''
                    docker rm -f %CONTAINER_NAME% 2>nul || exit 0
                    docker run -d -p 8081:80 --name %CONTAINER_NAME% %IMAGE_NAME%
                '''
            }
        }
    }

    post {
        success {
            echo 'CI/CD Frontend SUCCESS!'
        }

        failure {
            echo 'CI/CD Frontend FAILED!'
        }
    }
}