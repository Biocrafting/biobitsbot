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

        const runState = model.getState();

        if(runState) {
            document.getElementById('runState').classList.add('run')
        } else {
            document.getElementById('runState').classList.remove('run')
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
        err = 'Name cannot be empty!'
    }

    if (err === '') {
        document.getElementById('newUserErr').classList.add('invisible');

    } else {
        document.getElementById('newUserErr').classList.remove('invisible');
        document.getElementById('newUserErr').innerText = err;
    }
}

function deleteUser(ele) {
    const userId = ele.parentNode.id;
    model.deleteUser(userId);

    ele.parentNode.remove();
}

window.addEventListener('load', () => {
    document.getElementById('newUserName').addEventListener('keyup', (e) => {

        if (e.key === 'Enter') {
            const parent = e.target.parentNode;
            console.log(e);
            parent.querySelector('button').click();
        }
    })

    document.getElementById('saveButton').addEventListener('click', (e) => {
        const save = model.save();
        console.log(save)
        downloadFile(save, 'biobitssave.json', 'json')
    });

    document.getElementById('loadButton').addEventListener('click', (e) => {
        loadFile()
          .then((text) => {
                model.load(text);
          });
    });

    document.getElementById('runState').addEventListener('click', (e) => {
        model.toggle();
    });
});
// 

function saveData() {

}

function loadFile() {
    return new Promise((resolve, reject) => {
        let i = document.createElement('input');
        i.type = 'file';
        i.accept = 'text/json';
        i.multiple = false;
        i.addEventListener('change', () => {
            const reader = new FileReader();
            reader.addEventListener('load', (e) => { 
                resolve(e.target.result)
            });
            reader.readAsText(i.files[0]);
        })
        i.click();
    })
}


function downloadFile(text, name, type) {
    let a = document.createElement('a');
    let file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}