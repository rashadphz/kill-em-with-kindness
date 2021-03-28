document.onkeypress = function () {
    var pn = document.activeElement.parentNode;
    const percent_div = document.createElement('div');
    percent_div.innerText = "15"
    pn.appendChild(percent_div);
};
