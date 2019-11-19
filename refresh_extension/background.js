// 声明一个定时器
var timerStone;

// 等待消息
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    if (msg.name === "start") {
        chrome.tabs.query({active: true, currentWindow: true}, function (array_tab) {
            // 1.获取当前标签页的URL，即需要插入脚本的页面
            let current_url = array_tab[0].url;

            // 2.根据用户选择的线程数来创建多个同样URL的标签页
            for (let i = 0; i < Math.abs(parseInt(msg.threads)); i++) {
                chrome.tabs.create({
                    url: current_url,
                });
            }

            // 3.查询所有URL=current_url的标签页，以对它们进行定时地批量地执行插入脚本
            chrome.tabs.query({
                url: current_url
            }, function (array_tab) {
                // 如果当前定时器为上次未停止的定时器则先清除
                if (timerStone !== undefined) {
                    clearInterval(timerStone)
                }
                // 设置定时任务：定时循环批量插入脚本
                setTimeout(function () {
                    timerStone = setInterval(function () {
                        for (let j = 0; j < array_tab.length; j++) {
                            chrome.tabs.executeScript(array_tab[j].id, {code: msg.task});
                        }
                    }, Math.abs(parseInt(msg.period_time)));
                }, Math.abs(parseInt(msg.delay_time)));
            });
        });
    } else if (msg.name === "stop") {
        clearInterval(timerStone);
    }
});

