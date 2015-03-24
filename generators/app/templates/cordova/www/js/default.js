//// Copyright (c) Microsoft Corporation. All rights reserved

(function () {
    WinJS.UI.processAll().then(function () {
        // Your app code here...
        var div = document.createElement("div");
        div.textContent = "hi";
        document.body.appendChild(div);
    });
})();