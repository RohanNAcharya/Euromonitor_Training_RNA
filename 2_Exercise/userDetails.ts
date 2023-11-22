class userPageDetails{

    userId:string|number|null;
    firstName:string|null;
    lastName:string|null;
    email:string|null;
    avatar:string|null;
    
    constructor(){
        const urlParams = new URLSearchParams(window.location.search);
        this.userId = urlParams.get('userId');
        this.firstName = urlParams.get('firstName');
        this.lastName = urlParams.get('lastName');
        this.email = urlParams.get('email');
        this.avatar = urlParams.get('avatar');
    }

    openNewPage(){
        const newPageContent = document.getElementById("userDetailContainer")!;
        newPageContent.innerHTML = `        
            <div class="newPage-image">
            <img src="${this.avatar}" alt="${`${this.firstName} ${this.lastName}`}">
            </div>
            <div class="newPage-info">
                    <div class="newPage-id">
                        <p><strong>Id:</strong> ${this.userId}</p>   
                    </div>
                    <div class="newPage-first-name">
                        <p><strong>First Name:</strong> ${this.firstName}</p>
                    </div>
                    <div class="newPage-last-name">
                            <p><strong>Last Name:</strong> ${this.lastName}</p>
                    </div>
                    <div class="newPage-email">
                            <p><strong>Email:</strong> ${this.email}</p>
                    </div>
            </div>
        `;
    }
}


let userPage = new userPageDetails();
userPage.openNewPage();

