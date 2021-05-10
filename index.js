let chatBox;
let dialog = [];
let alreadyClicked = false;
let messageCounter = 0;
var token = secrets.API_KEY || config.API_KEY;
let answer =
  "COVID-19 is caused by SARS-CoV2, a new strain of coronavirus that has not previously been identified in humans. It was first identified in Wuhan, Hubei Province, China, where it caused a large and ongoing outbreak. It has been declared a global pandemic. The COVID-19 virus is closely related to a bat coronavirus.";
//////////////////////////////////////////////
function iconClick() {
  if (!alreadyClicked) {
    chatBox = document.createElement("DIV");
    document.body.appendChild(chatBox);
    chatBox.className = "chatBox";
    chatBox.innerHTML +=
      '<a href="" disabled="disabled"><div id="closeTag">X</div></a> <div id="inputBox"> <textarea type="text" rows="5" id="inputText" placeholder="Comment text." spellcheck=true></textarea><button id="sendButton" onclick="sendMessage()">Send</button> </div>';
  }
  alreadyClicked = true;
  // if (alreadyClicked) {
  //   chatBox.style.visibility = "hidden";
  // }
}
///////////////////////////////////////////////

///////////////////////////////////////////////
function sendMessage() {
  let question = document.getElementById("inputText").value;
  let messageNode = document.createElement("DIV");
  messageNode.className = "message";
  let messageTextNode = document.createTextNode(question);
  messageNode.appendChild(messageTextNode);
  chatBox.appendChild(messageNode);
  // renderAnswer(answer);

  fetch(
    "https://chatbot4health.azurewebsites.net/qnamaker/knowledgebases/af146b94-bda6-4f89-ad00-ccc342cc6d8f/generateAnswer",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "EndpointKey " + token,
      },
      body: JSON.stringify({ question: question }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data, data.answers[0].answer);
      renderAnswer(data.answers[0].answer);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  document.getElementById("inputText").value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}
////////////////////////////////////////////
function renderAnswer(answer) {
  let answerNode = document.createElement("DIV");
  answerNode.className = "answer";
  let answerTextNode = document.createTextNode(answer);
  answerNode.appendChild(answerTextNode);
  chatBox.appendChild(answerNode);
}
////////////////////////////////////
