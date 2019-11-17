 
 


export function getQuestions(lang, numberOfQuestions) {
    return fetch(`http://127.0.0.1:5000/selectQuestions/${lang}/${numberOfQuestions}`, {
      
    }).then(response => response.json())
  }

export function getLanguages(){
    return fetch(`http://127.0.0.1:5000/getLanguages`, {
      
    }).then(response => response.json())
  }
   
   export function creatUser(user, password) {
    var userEncoded = encodeURIComponent(user);
    var paswEncoded = encodeURIComponent(password);
    return fetch(
      `http://127.0.0.1:5000/signup/${userEncoded}/${paswEncoded}`
    ).then(response => response.json());
  }

  export function checkUser(user, password) {
    var userEncoded = encodeURIComponent(user);
    var paswEncoded = encodeURIComponent(password);
    return fetch(
      `http://127.0.0.1:5000/login/${userEncoded}/${paswEncoded}`
    ).then(response => response.json());
  }

  export function getStatistics(user) {
    var userEncoded = encodeURIComponent(user);

    return fetch(`http://127.0.0.1:5000/stat/${userEncoded}`).then(response =>
      response.json()
    );
  }

  export function addQuiz(user, quiz) {  
    var userEncoded = encodeURIComponent(user);
    fetch(`http://127.0.0.1:5000/stat/${userEncoded}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:   JSON.stringify( quiz)
    });
  }



