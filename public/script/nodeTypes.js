let createNodeButton = document.querySelector("#create-node-button");
let nodeList = document.querySelector(".node-list");

let nodeData;

function handleLoad() {
    console.log("Loading Data");
    fetch("/nodes/list-all", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST"
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            nodeData = res;

            nodeList.innerHTML = "";

            for (let node of nodeData) {
                let nodeElement = document.createElement("li");
                nodeElement.innerText = node["name"];
                nodeList.appendChild(nodeElement);
            }
        });
}

function createNode(event) {
    event.preventDefault();


}

createNodeButton.addEventListener("onclick", (event) => createNode(event));
window.addEventListener("load", handleLoad);