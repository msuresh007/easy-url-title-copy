chrome.action.onClicked.addListener((tab) => {
    console.log("Action button clicked");
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            console.log("copyToClipboard function called");
            let url = window.location.href;
            let title = document.title;
            console.log("url: " + url);
            console.log("title: " + title);
            let strToCopy = title + " - " + url;

            // Create a temporary textarea element
            let textArea = document.createElement("textarea");
            textArea.value = strToCopy;
            document.body.appendChild(textArea);
            textArea.select();

            try {
                document.execCommand("copy");
                console.log("Copied successfully: ", strToCopy);
            } catch (err) {
                console.error("Copy failed: ", err);
            }

            document.body.removeChild(textArea);
        }
    }, (results) => {
        if (chrome.runtime.lastError) {
            console.error("Script execution failed: ", chrome.runtime.lastError);
        } else {
            console.log("Script executed successfully", results);
        }
    });
});
