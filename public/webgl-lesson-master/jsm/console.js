(function () {
    var oldLog = console.log; // 保存原来的 console.log 函数

    console.log = function (message) {
        const logsContainer = document.querySelector(".logs-container")
        var logEl = document.createElement('div');
        logEl.textContent = message;
        logEl.classList.add('console-log'); // 添加 class
        logsContainer.appendChild(logEl);
        oldLog.apply(console, arguments);
    };
})();