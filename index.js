

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
document.addEventListener('DOMContentLoaded', initialize)

function initialize() {
    const villagersList = document.getElementById('villagersList');
    const fetchVillagers = () => {
        const villagers = [];
        for (let i=1; i <= 50; i++) {
            const url = `https://acnhapi.com/v1/villagers/${i}`
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
        // console.log(villager);
        const villagerHTMLString = villager
            .map(
                (village) => `
                <li class="villager">
                <img src="${village.image}" />
                <h3 class="name"> ${village.name}</h3>
                <p>Personality: ${village.personality}</p>
                
            </li>  
        `
            )
            .join('');
        villagersList.innerHTML = villagerHTMLString;
    };

    fetchVillagers();

    let x = document.getElementsByClassName('name'); 
    let y = document.getElementsByClassName('villager');
    function searchVillagers() {
        let input = document.getElementById('search').value
        input.toLowerCase();
        
        for (i = 1; i < x.length; i++) {  
            if (!x[i].innerHTML.toLowerCase().includes(input)) { 
                y[i].style.display="none"; 
            } 
            else { 
                y[i].style.display="list-item";                  
            } 
        } 
    } 
    let ul = document.querySelector("#villagersList")
    document.getElementById("search").addEventListener("keyup", searchVillagers);
    
    ul.addEventListener("click", (e) => {
        let event = e.target.closest("LI")
        event.style.backgroundColor = "yellow"
    })

    document.body.addEventListener("dblclick", (e) => {
        e.target.style.backgroundColor = "null"
    })
    
   

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

}