var start = Date.now();
var WAIT_TIME = 2;
var prev_text = "";
var TOXIC_THRESHOLD = 0.75; //how toxic the message can be

var textArea = document.getElementsByTagName('textarea')[0];
var pn = textArea.parentNode;
const percent_div = document.createElement('div');
percent_div.style = "float: right;";
percent_div.innerText = '15';
pn.appendChild(percent_div);

document.onkeypress = function () {
    start = Date.now();
    window.setInterval(check_timer, 1000);
};

function check_timer() {
    var delta = Date.now() - start;
    if (delta/1000 > WAIT_TIME){ //wait three seconds before checking toxicity
        if (textArea.value != prev_text){ //don't make api calls on the same message
            prev_text = textArea.value;
            var toxic_level = toxicityRating(prev_text);
        }
    }
}

function toxicityRating(text){
    console.log(text);
    let api_wrapper = `https://pacific-basin-18297.herokuapp.com/api/${text}/`;
    fetch (api_wrapper)
    .then(data => {return data.json()})
    .then(res => {
        var toxic_level = res.attributes.INSU;

        var spans = res.attributes.
        if (toxic_level > TOXIC_THRESHOLD){

        }
        return toxic_level;
    })
    .then(toxic_level => {
      toxic_level = String(toxic_level);
      percent_div.innerText = toxic_level;
    })

};
