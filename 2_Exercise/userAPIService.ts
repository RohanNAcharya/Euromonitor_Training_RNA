class UserApiService {
    apiUrl: string;

    constructor() {
        this.apiUrl = 'https://reqres.in/api/users?page=2';
    }

    public async fetchData<T>(): Promise<T> {
        try {
            const response = await fetch(this.apiUrl);
            if (response.ok) {
                return response.json() as Promise<T>;
            }
            else {
                throw response;
            }
        }
        catch (error) {
            throw error;
        }
    }

    public displayUsersData(userData):void{
        const userDataContainer = document.getElementById("userData")!;
    
        userDataContainer.innerHTML = "";
    
        userData.forEach(user => {
            const userCard = document.createElement("div");
            userCard.classList.add("userCard");
            userCard.innerHTML = `
            <div class="userName"><p>${user.first_name + " " + user.last_name}</p></div>
            <div class="email"><p>${user.email}</p></div>
            <div class="image"><img src="${user.avatar}" alt="${`${user.first_name} ${user.last_name}`}")"></div>
            `;
            userCard.addEventListener("click", () => { this.passDataToNextPage(user.id, user.first_name, user.last_name, user.email, user.avatar) });
    
            userDataContainer.appendChild(userCard);
        });
    
    }
    
    private passDataToNextPage(userID: number, userFirstName, userLastName, userEmail, userAvatar):void {
        window.location.href = `userDetails.html?userId=${userID}&firstName=${userFirstName}&lastName=${userLastName}&email=${userEmail}&avatar=${userAvatar}`;
    }
}

let userApi = new UserApiService();


userApi.fetchData()
    .then(result => {
        let userData = result!['data'];
        userApi.displayUsersData(userData);
    })
    .catch(error => {
        console.log(error)
    });


