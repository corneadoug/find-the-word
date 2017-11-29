node {
     stage('Build') {
     	checkout scm
    	sh 'bower install'
    	sh 'npm install'
    	sh 'grunt build'
    }
}
