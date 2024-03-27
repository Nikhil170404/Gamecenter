// Function to sign up a user
function signUp() {
    var email = document.getElementById('suEmail').value;
    var password = document.getElementById('suPassword').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log('User signed up:', user);
            // Optionally, redirect the user to a different page after sign-up
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error('Sign-up error:', errorMessage);
            alert(errorMessage);
        });
}

// Function to sign in a user
function signIn() {
    var email = document.getElementById('siEmail').value;
    var password = document.getElementById('siPassword').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log('User signed in:', user);
            // Optionally, redirect the user to a different page after sign-in
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error('Sign-in error:', errorMessage);
            alert(errorMessage);
        });
}

// Function to sign in with Google
function signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            var credential = result.credential;
            var token = credential.accessToken;
            var user = result.user;
            console.log('User signed in with Google:', user);
            // Optionally, redirect the user to a different page after sign-in
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error('Google sign-in error:', errorMessage);
            alert(errorMessage);
        });
}
// Function to sign in a user
function signIn() {
    var email = document.getElementById('siEmail').value;
    var password = document.getElementById('siPassword').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log('User signed in:', user);
            // Redirect user to Home.html after successful sign-in
            window.location.href = 'public/Home.html';
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error('Sign-in error:', errorMessage);
            alert(errorMessage);
        });
}
// JavaScript for Sign In with Google
function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            // Redirect to Home.html after successful sign-in
            window.location.href = "public/Home.html";
        })
        .catch((error) => {
            // Handle sign-in errors
            console.error(error);
        });
}
// Get a reference to the user profile section

