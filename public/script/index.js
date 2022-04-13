let nodeSelector = document.querySelector("#nodes-type");
let timerButton = document.querySelector("#timer-button");
let timerText = document.querySelector("#timer-text");
let nodeData;

let timerOn = false;
let startTime, endTime;
let timeCnt;
let intervalCount;

function updateTimer() {
    timeCnt++;
    let mins = Math.floor(timeCnt / 60);
    let secs = timeCnt % 60;
    mins = mins.toString().padStart(2, "0");
    secs = secs.toString().padStart(2, "0");

    timerText.innerText = mins + ":" + secs;
}

async function sendTimerData() {
    const response = await fetch("/timer/add", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nodeSelector.value,
            startTime, startTime,
            endTime: endTime
        })
    });
    console.log(response);
}

function handleTimer(event) {
    console.log("Timer Button Pressed");
    event.preventDefault();

    // Deactivate Timer
    if (timerOn) {
        timerOn = false;
        endTime = new Date();
        timerButton.innerText = "Start Timer";
        sendTimerData();
        updateNodeSelectors();
        clearInterval(intervalCount);
    }
    // Activate Timer
    else if (!timerOn) {
        timeCnt = -1;
        updateTimer();
        timerOn = true;
        startTime = new Date();
        timerButton.innerText = "Stop Timer";
        fixNodeSelector();
        intervalCount = setInterval(updateTimer, 1000);
    }
}

function fixNodeSelector() {
    let listChoice = document.createElement("option");
    listChoice.innerText = nodeSelector.value;
    listChoice.value = nodeSelector.value;
    nodeSelector.innerHTML = "";
    nodeSelector.appendChild(listChoice);
}

function updateNodeSelectors() {
    // Update HTML
    nodeSelector.innerHTML = "";

    for (let node of nodeData) {
        let listChoice = document.createElement("option");
        listChoice.innerText = node["name"];
        listChoice.value = node["name"];
        nodeSelector.appendChild(listChoice);
    }
}

async function handleLoad() {
    // Fetch Data from server
    await fetch("/nodes/list-all")
        .then(res => res.json())
        .then(res => {
            console.log(res);
            nodeData = res;
        });

    updateNodeSelectors();
}

timerButton.addEventListener("click", (e) => handleTimer(e));
window.addEventListener("load", handleLoad);