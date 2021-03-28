let popup = document.getElementById("popup");

popup.onclick = function (element) {
    chrome.tabs.query(
        { currentWindow: true },
        function (tabArray) {
            for (let i = 0; i < tabArray.length; i++) {
                chrome.scripting.executeScript({
                    target: {
                        tabId: tabArray[i].id,
                        allFrames: true,
                    },
                    files: ["toxicity.js"],
                });
            }
        }
    );
};
