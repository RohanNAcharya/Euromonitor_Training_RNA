interface userDataType {
    page:        number;
    per_page:    number;
    total:       number;
    total_pages: number;
    data:        Datum[];
    support:     Support;
}

interface Datum {
    id:         number;
    email:      string;
    first_name: string;
    last_name:  string;
    avatar:     string;
}

interface Support {
    url:  string;
    text: string;
}


let apiUrl = 'https://reqres.in/api/users?page=2';

let myPromise = <T>(apiLink:string): Promise<T> => {
    return new Promise(async (resolve, reject)=>{
        try{
            const response = await fetch(apiLink);
            if(response.ok){
                resolve(response.json());
            }
            else{
                reject(response);
            }
        }
        catch(error){
            reject(error);
        }
}); 
}

    

myPromise<userDataType>(apiUrl)
    .then(result  => {
        console.log(result);
        let userData = result.data;
        displayUsersData(userData);
        console.log(userData);
    })
    .catch(error => {
        console.log(error)
    });


function displayUsersData(userData:Datum[]){
    const userDataContainer = document.getElementById("userData")!;

    userDataContainer.innerHTML = "";

    userData.forEach(user => {
        const userCard = document.createElement("div");
        userCard.classList.add("userCard");
        userCard.innerHTML = `
        <div class="userName"><p>${user.first_name + " " +user.last_name}</p></div>
        <div class="email"><p>${user.email}</p></div>
        <div class="image"><img src="${user.avatar}" alt="${`${user.first_name} ${user.last_name}`}")"></div>
        `;
        userCard.addEventListener("click", () =>  {openPopup(userData, user.id)});

        userDataContainer.appendChild(userCard);
    });

}


function openPopup(userData:Datum[], userId:number){
    const user = userData.find(u => u.id == userId)!;
    const popupContent = document.getElementById("popup-image-info")!;
    const popup = document.getElementById("userPopup")!;
    const overlay = document.getElementById("overlay")!;
    popupContent.innerHTML = `        
        <div class="popup-image">
        <img src="${user.avatar}" alt="${`${user.first_name} ${user.last_name}`}">
        </div>
        <div class="popup-info">
                <div class="popup-id">
                    <p><strong>Id:</strong> ${user.id}</p>   
                </div>
                <div class="popup-first-name">
                    <p><strong>First Name:</strong> ${user.first_name}</p>
                </div>
                <div class="popup-last-name">
                        <p><strong>Last Name:</strong> ${user.last_name}</p>
                </div>
                <div class="popup-email">
                        <p><strong>Email:</strong> ${user.email}</p>
                </div>
        </div>
    `;
    popup.style.display = "flex";
    overlay.style.display = 'block';
}

function closePopup(){
    const popup = document.getElementById("userPopup")!;
    popup.style.display = 'none';
    const overlay = document.getElementById("overlay")!;
    overlay.style.display = 'none';
}