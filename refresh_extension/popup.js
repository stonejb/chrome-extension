// 点击开始按钮
document.getElementById("btn_start").onclick = function () {
    // 获取输入的延时时间
    let delay_time = document.getElementById("delay_time").value;
    delay_time = parseInt(delay_time, 0);
    // 获取输入的循环间隔时间
    let period_time = document.getElementById("period_time").value;
    period_time = parseInt(period_time,0);
    // 获取输入的线程数
    let threads = document.getElementById("threads").value;
    // 获取输入的任务
    let task = document.getElementById("task").value;

    // 将获取的用户输入数据传给background.js
    chrome.runtime.sendMessage({
        name:"start",
        delay_time:delay_time,
        period_time:period_time,
        threads:threads,
        task:task
    });
};

// 点击暂停按钮
document.getElementById("btn_stop").onclick = function(){
    // 发送暂停信号
    chrome.runtime.sendMessage({
        name:"stop",
    });

};

