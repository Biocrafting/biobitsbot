const model = new BioBitModel();
model.addUser('ZwergB')

function websiteRefresher() {
    
    model.start();
    requestAnimationFrame(nextFrame);
    
    function nextFrame() {

        const users = model.users;
        checkInterface(users);

        refreshInterface(users);

        requestAnimationFrame(nextFrame);
    }

    //Checks if there is an interface element for everyuser in the model
    function checkInterface(users) {
        if (users.length > document.getElementsByClassName('user').length) {

            for (let i = 0; i < users.length; i++) {
                const usersNode = document.getElementById('users');
                
                if(!document.getElementById(users[i].getId())) {
                    const template = document.getElementById('template').cloneNode(true);
                    template.id = users[i].getId();
                    template.classList.add('user');
                    usersNode.appendChild(template);
                }
            }
        }
    }

    function refreshInterface(users) {
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const userNode = document.getElementById(user.getId());
            
            userNode.querySelector('.name').innerText  = user.getName();
            userNode.querySelector('.count').innerText = user.getCount().toFixed(2);
            userNode.querySelector('.gain').innerText  = user.getGain();
            
        }
    }
}

//

function addNewUser() {
    const name = document.getElementById('newUserName').value;

    let err = '';
    if (name) {
        err = model.addUser(name);
    } else {
        err = 'Username cannot be empty.'
    }

    document.getElementById('newUserErr').innerText = err;
}

// 

function saveData() {

}