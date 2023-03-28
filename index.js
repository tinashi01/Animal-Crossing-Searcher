

// fetch('http://acnhapi.com/v1/villagers/')
//     .then(res => res.json())
//     .then(data => populateVillagers(data))
//     .catch(err => console.log(err))

// function populateVillagers(villagers) {
//     Object.keys(villagers).forEach((key) => {      
//         const node = document.createElement("p");
//         const textnode = document.createTextNode(villagers[key].name["name-USen"]);
//         node.appendChild(textnode);
//         document.getElementById("villagersList").appendChild(node);    
//     })
// }
const villagersList = document.getElementById('villagersList');
const fetchVillagers = () => {
    const villagers = [];
    for (let i=1; i < 50; i++) {
        const url = `http://acnhapi.com/v1/villagers/${i}`
        villagers.push(fetch(url).then((res) => res.json()))
    }
    Promise.all(villagers).then((results) => {
        const villager = results.map((result) => ({
            name: result.name["name-USen"],
            image: result["icon_uri"],
            personality: result.personality
        }));
        displayVillagers(villager);
    })
}

const displayVillagers = (villager) => {
    console.log(villager);
    const villagerHTMLString = villager
        .map(
            (village) => `
            <li class="villager">
            <img src="${village.image}" />
            <h3 class="villagerClass"> ${village.name}</h3>
            <p>Personality: ${village.personality}</p>
        </li>  
    `
        )
        .join('');
    villagersList.innerHTML = villagerHTMLString;
};

fetchVillagers();

function searchVillagers() {
    let input = document.getElementById('search').value
    input.toLowerCase();
    let x = document.getElementsByClassName('villagerClass'); 
    let y = document.getElementsByClassName('villager');
    console.log(x[1])
    for (i = 0; i < x.length; i++) {  
        if (!x[i].innerHTML.toLowerCase().includes(input)) { 
            y[i].style.display="none"; 

        } 
        else { 
            y[i].style.display="list-item";                  
        } 
    } 
} 

document.getElementById("search").addEventListener("keyup", searchVillagers);




// let input = document.getElementById("search").value;

// input.addEventListener("keyup", searchVillager);    
    

// for (i=1; i < 50; i++) {
//     const img = document.createElement("img")
//     img.setAttribute("src", `https://acnhapi.com/v1/icons/villagers/${i}`)
//     document.getElementById("villagersList").appendChild(img)
// }

// const searchInput = document.getElementById('search')
// const villagersFromDOM = document.getElementsByTagName('p')
// console.log(villagersFromDOM)
// searchInput.addEventListener("input", (e) => {
//     let value = e.target.value
//     if (value && value.trim().length > 0) {
//         value = value.trim().toLowerCase()
//     }
// })

