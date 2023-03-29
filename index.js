document.addEventListener('DOMContentLoaded', initialize)

function initialize() {
    function populateVillagers(villagers) {
        const villagersList = document.getElementById('villagersList');
        villagersList.innerHTML = Object.keys(villagers)
            .map((villager) => {
                return (`
                <li class="villager">
                    <img src="${villagers[villager]["icon_uri"]}" />
                    <h3 class="name"> ${villagers[villager].name["name-USen"]}</h3>
                    <p>Personality: ${villagers[villager].personality}</p>
                </li>  
        `)
            })
            .join('');
    }

    fetch('https://acnhapi.com/v1/villagers/')
        .then(res => res.json())
        .then(data => populateVillagers(data))
        .catch(err => console.log(err))

    let x = document.getElementsByClassName('name');
    let y = document.getElementsByClassName('villager');
    function searchVillagers() {
        let input = document.getElementById('search').value.toLowerCase();

        for (i = 0; i < x.length; i++) {
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

    ul.addEventListener("dblclick", (e) => {
        let event = e.target.closest("LI")
        event.style.backgroundColor = "pink"
    })

    
    let dark = document.querySelector('#dark');
    dark.addEventListener('change', ()=> {
        document.body.classList.toggle('dark');
    });


}



