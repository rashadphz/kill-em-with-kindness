var start = Date.now();
var WAIT_TIME = 2;

var prev_text = "";

var TOXIC_THRESHOLD = 0.75; //how toxic the message can be 

document.onkeypress = function () {
    start = Date.now();
    window.setInterval(check_timer, 1000);
};

function check_timer() {
    var delta = Date.now() - start; 
    if (delta/1000 > WAIT_TIME){ //wait three seconds before checking toxicity
        var elem = document.activeElement;
        if (elem.contentEditable && elem.textContent != prev_text){ //don't make api calls on the same message
            prev_text = elem.textContent;
            toxicityRating(prev_text);
        }
    }
}

function toxicityRating(text){
    console.log(text);
    let api_wrapper = `https://pacific-basin-18297.herokuapp.com/api/${text}/`;
    fetch (api_wrapper)
    .then(data =>{return data.json()})
    .then(res => {
        console.log(res)
        var toxic_level = res.attributes.TOXICITY;
        console.log(toxic_level);
        if (toxic_level > TOXIC_THRESHOLD){
            alert("This is too toxic");
        }
    })

};