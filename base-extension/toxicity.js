//import font
var link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('type', 'text/css');
link.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Lato&display=swap');
document.head.appendChild(link);

var circle = document.createElement('div');
var cStyle = circle.style;

var colorMatch = {
    '0-10'     : '#00FF00',
    '10-20'    : '#50FF0A',
    '20-30'   : '#96FF49',
    '30-40'   : '#D3FF5E',
    '40-50'   : '#DFFFDA',
    '50-60'   : '#FFE7E7',
    '60-70'   : '#FFB6B6',
    '70-80'   : '#FF6161',
    '80-90'   : '#E72E2E',
    '90-100'   : '#BB0000',

 };

function between(x, min, max) {
  return x >= min && x <= max;
}

//gets colorMatch given toxicityElparentEleent
function setColor(toxicity){
    for (var element in colorMatch){
        first = parseInt(element.split('-')[0],10);
        second = parseInt(element.split('-')[1],10);

        if (between(toxicity, first, second)){
            cStyle.background = colorMatch[element];
        }
    }
}


cStyle.width = "40px";
cStyle.height = "40px";
cStyle.borderRadius = "45%";
cStyle.lineHeight = 0;
cStyle.position = "relative";
cStyle.float = "right";
cStyle.margin = "10px";
cStyle.fontFamily = "Lato, sans-serif"
cStyle.fontWeight = "bold";

setColor(0); //initial message not toxic

var txt = document.createElement('div');
txt.innerHTML = "0%";
txt.style.position = "absolute";
txt.style.bottom = "50%";
txt.style.width = "100%";
txt.style.textAlign = "center";

var start = Date.now();
var WAIT_TIME = 2;
var prev_text = "";
var TOXIC_THRESHOLD = 0.75; //how toxic the message can be

document.onkeypress = function () {
  start = Date.now();
  window.setInterval(check_timer, 1000);
  var elem = document.activeElement;
  var parent = elem.parentElement;

  circle.appendChild(txt);
  parent.appendChild(circle);
};

function check_timer() {
    var delta = Date.now() - start;
    var parent_temp = deepestChild();
    if (delta/1000 > WAIT_TIME){ //wait three seconds before checking toxicity
        if (parent_temp.textContent != prev_text){ //don't make api calls on the same message
            prev_text = parent_temp.textContent;
            toxicityRating(prev_text);
        }
    }
}

function toxicityRating(text){
    let api_wrapper = `https://pacific-basin-18297.herokuapp.com/api/${text}/`;
    fetch (api_wrapper)
    .then(data => {return data.json()})
    .then(res => {
        var toxic_level = res.attributes.TOXICITY;
        var asPercent = parseFloat(toxic_level * 100).toFixed(0)+"%"
        txt.innerHTML = String(asPercent);
        setColor(toxic_level * 100);

        var parent_temp = deepestChild();
        var spans = res.spans;
        var arrayLength = spans.length;
        var new_paragraph = "";
        for (var i = 0; i < arrayLength; i++) {
          var temp_string = text.substring(spans[i]["begin"], spans[i]["end"]);
          if (spans[i]["toxicity_level"] > TOXIC_THRESHOLD){
            temp_string = "<span data-text=\"true\" style=\"color:red\">" + temp_string + "</span>";
            new_paragraph = new_paragraph + (temp_string);
          }
          if (spans[i]["toxicity_level"] < TOXIC_THRESHOLD){
            temp_string = "<span data-text=\"true\" style=\"color:white\">" + (temp_string) + "</span>";
            new_paragraph = new_paragraph + (temp_string);
          }
        }
        return new_paragraph})
      .then(new_paragraph => {
        var parent_temp = deepestChild();
        parent_temp.innerHTML = new_paragraph;
      })

};

function deepestChild() {
  var parent_temp_1 = document.activeElement;
  while (parent_temp_1.firstElementChild) {
    parent_temp_1 = (parent_temp_1).firstElementChild;
  }
  return parent_temp_1;
}
