var timer = 0;
var WAIT_TIME = 3;

var prev_text = "";

var TOXIC_THRESHOLD = 0.8; //how toxic the message can be 

document.onkeypress = function () {
    timer = 0;
    window.setInterval(check_timer, 3000);
};

function check_timer() {
    timer++;
    if (timer > WAIT_TIME){ //wait three seconds before checking toxicity
        var elem = document.activeElement;
        if (elem.contentEditable && elem.textContent != prev_text){ //don't make api calls on the same message
            prev_text = elem.textContent;
            toxicityRating(prev_text);
        }
    }
}

function toxicityRating(text){
    console.log(text);
    // let api_wrapper = "https://pacific-basin-18297.herokuapp.com/api/group/";
    // fetch (api_wrapper)
    // .then(data =>{return data.json()})
    // .then(res=> {console.log(res)})
    let api_wrapper = "https://pacific-basin-18297.herokuapp.com/api/group/";
    fetch (api_wrapper)
    .then(data =>{return data.json().attributes})
    .then(res => {
        var toxic_score = res.TOXICITY;
        if (toxic_score > TOXIC_THRESHOLD){
            alert("MESSAGE IS TOXIC");
        }

    })

};