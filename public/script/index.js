let nodeSelector = document.querySelector("#nodes-type");
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
    nodeSelector.innerHTML = "";

    for (let node of nodeData) {
        let listChoice = document.createElement("option");
        listChoice.innerText = node["name"];
        listChoice.value = node["name"];
        nodeSelector.appendChild(listChoice);
    }
}

window.addEventListener("load", handleLoad);