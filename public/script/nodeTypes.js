let nodeList = document.querySelector(".node-list");
let nodeSelector = document.querySelector("#node-parent-select");

let nodeData;

// Update List Recursively
function generateElement(index) {
    let data = nodeData[index];
    let listElement = document.createElement("li");
    listElement.innerText = data.name;
    if (data.children.length > 0)
    {
        let newList = document.createElement("ul");
        for (let i = 0; i < data.children.length; i++)
        {
            let indexOfChild = nodeData.findIndex(x => x._id === data.children[i])
            newList.appendChild(generateElement(indexOfChild))
        }
        listElement.appendChild(newList);
    }
    return listElement;
}

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

    let rootIndex = nodeData.findIndex(x => x.name === 'Root');
    nodeList.innerHTML = "";
    nodeList.appendChild(generateElement(rootIndex));
}

window.addEventListener("load", handleLoad);