$(document).ready(function() {
  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    //prevent the default button behaviour of refreshing the page on submit
    event.preventDefault();
    //create a userData object using the value from the email input and password input
    //both emailInput and passwordInput are jquery objects, and val() get's their value, 
    //then trim() removes any leading or trailing whitespace
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    //the email property of password property of userData are null then return at this point
    //i.e. unless the user has email and password specified don't do anything.
    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    //the below line calls the loginUser function and passes in email and password as parameters
    loginUser(userData.email, userData.password);
    //the below two lines set the emailInput and passwordInput back to blank. you wouldnt want a users passwrod to stay there
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {

    $.post("/auth/login", {
      email: email,
      password: password
    })
      //once the post request completes. if successful redirect the user to /members. otherwise console log the error text
      .then(function() {
        //the window is the browser i.e. chrome. by changing the location it loads the members web page
        window.location.replace("/interface");
        // If there's an error, log the error
      })
      .catch((err) => {
        M.toast({html: `login failed`, classes: 'red'})
      });
  }
});
