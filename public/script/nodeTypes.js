let nodeList = document.querySelector(".node-list");
let nodeSelector = document.querySelector("#node-parent-select");

let nodeData;

async function handleLoad() {
    // Fetch Data from server
    await fetch("/nodes/list-all")
        .then(res => res.json())
        .then(res => {
            console.log(res);
            nodeData = res;
        });

    // Update HTML
    nodeList.innerHTML = "";
    nodeSelector.innerHTML = "";

    for (let node of nodeData) {
        let nodeElement = document.createElement("li");
        nodeElement.innerText = node["name"];
        nodeList.appendChild(nodeElement);

        let listChoice = document.createElement("option");
        listChoice.innerText = node["name"];
        listChoice.value = node["name"];
        nodeSelector.appendChild(listChoice);
    }
}

window.addEventListener("load", handleLoad);