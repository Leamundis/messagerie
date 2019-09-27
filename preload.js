const mongo = require('mongodb').MongoClient, 
url = 'mongodb://localhost:27017/chat',
ObjectId = require('mongodb').ObjectId;





const run = () => {
    if (localStorage.getItem("myName")) {
        document.querySelector('.log-form').classList.add('hidden');
        document.querySelector('#pills-tab').classList.remove('hidden');
        document.querySelector('.to-log').classList.add('hidden');
        document.querySelector('.is-log').classList.remove('hidden');
        mongo.connect(url, {useNewUrlParser: true}, (err, client) => {
            if(err) {
                console.log(err);
                return
            }
            //console.log('connected');
            const db = client.db('chat');
            db.collection("users").find({ 
                name: 
                    { $not: { $eq: localStorage.getItem("myName") } } 
                }).toArray(function(err, contacts) {
                if (err) throw err;
                //console.log(contacts)
                loadContacts(contacts);
            });
        })
    }

    document.querySelector('.to-log').addEventListener('click', () => {
        document.querySelector('.log-form').classList.toggle('hidden');
        document.querySelector('#pills-tab').classList.toggle('hidden');
    })  
    
    
    document.querySelector('.cam-off').addEventListener('click', () => {
        document.querySelector('.cam-off').classList.add('hidden');
        document.querySelector('.cam-on').classList.remove('hidden');
        document.querySelector('.take-pic').classList.remove('hidden');
        Webcam.attach('#my_camera');
    })  
    
    document.querySelector('.cam-on').addEventListener('click', () => {
        Webcam.reset();
        document.querySelector('.cam-off').classList.remove('hidden');
        document.querySelector('.cam-on').classList.add('hidden');
        document.querySelector('.take-pic').classList.add('hidden');
    }) 
    
    document.querySelector('.take-pic').addEventListener('click', (e) => {
        e.preventDefault();
        Webcam.snap( function(data_uri) {
            document.getElementById('my_result').innerHTML = '<img src="'+data_uri+'"/>';


            let discussion = `<img src="${data_uri}" alt="">`;
            let chatId = document.querySelector('#send').dataset.id;
            mongo.connect(url, {useNewUrlParser: true}, (err, client) => {
                if(err) {
                    console.log(err);
                    return
                }
                const db = client.db('chat');
                db.collection('conversations').insertOne({ 
                    users : [
                        new ObjectId(chatId),
                        new ObjectId(localStorage.getItem("id"))
                    ],
                    user : {
                        name : localStorage.getItem("myName"),
                        avatar : localStorage.getItem("avatar"),
                        _id : new ObjectId(localStorage.getItem("id"))
                    },
                    message : discussion,
                    dateTime : new Date()
                })        
                .then(
                    mongo.connect(url, {useNewUrlParser: true}, (err, client) => {
                        if(err) {
                            console.log(err);
                            return
                        }
                        const db = client.db('chat');
                        db.collection('users').findOne({
                            _id: new ObjectId(chatId)
                        }, (err, resp) => {
                            loadConversation(resp);
                        })
                    })
                );
            })
        });
    })




    document.querySelector('.is-log').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.clear();
        document.querySelector('.log-form').classList.remove('hidden');
        document.querySelector('#pills-tab').classList.add('hidden');
        document.querySelector('.to-log').classList.remove('hidden');
        document.querySelector('.is-log').classList.add('hidden');
    })


    document.querySelector('#send').addEventListener('click', (e) => {
        e.preventDefault();
        let discussion = document.querySelector('#what-to-say').value;
        let chatId = document.querySelector('#send').dataset.id;
        mongo.connect(url, {useNewUrlParser: true}, (err, client) => {
            if(err) {
                console.log(err);
                return
            }
            const db = client.db('chat');
            db.collection('conversations').insertOne({ 
                users : [
                    new ObjectId(chatId),
                    new ObjectId(localStorage.getItem("id"))
                ],
                user : {
                    name : localStorage.getItem("myName"),
                    avatar : localStorage.getItem("avatar"),
                    _id : new ObjectId(localStorage.getItem("id"))
                },
                message : document.querySelector('#what-to-say').value,
                dateTime : new Date()
            })        
            .then(
                mongo.connect(url, {useNewUrlParser: true}, (err, client) => {
                    if(err) {
                        console.log(err);
                        return
                    }
                    const db = client.db('chat');
                    db.collection('users').findOne({
                        _id: new ObjectId(chatId)
                    }, (err, resp) => {
                        loadConversation(resp);
                    })
                })
            );
        })
    })

    document.querySelector('#register').addEventListener('click', (e) => {
        e.preventDefault();
        let name = document.querySelector('#register-name').value;
        let password = document.querySelector('#register-name').value;        
    })

    document.querySelector('#login').addEventListener('click', (e) => {
        e.preventDefault();
        let myName = document.querySelector('#login-name').value;
        let myPassword = document.querySelector('#login-name').value;
        mongo.connect(url, {useNewUrlParser: true}, (err, client) => {
            if(err) {
                console.log(err);
                return
            }
            //console.log('connected');
            const db = client.db('chat');
            db.collection('users').findOne({
                name: myName
            }, (err, resp) => {
                if(err) throw err;
                if(resp && resp._id) {
                    localStorage.setItem("myName", myName);
                    localStorage.setItem("id", resp._id);
                    localStorage.setItem("avatar", resp.avatar);
                    document.querySelector('.log-form').classList.toggle('hidden');
                    document.querySelector('#pills-tab').classList.toggle('hidden');
                    document.querySelector('.to-log').classList.add('hidden');
                    document.querySelector('.is-log').classList.remove('hidden');

                    mongo.connect(url, {useNewUrlParser: true}, (err, client) => {
                        if(err) {
                            console.log(err);
                            return
                        }
                        //console.log('connected');
                        const db = client.db('chat');
                        db.collection("users").find({ 
                            name: 
                                { $not: { $eq: localStorage.getItem("myName") } } 
                            }).toArray(function(err, contacts) {
                            if (err) throw err;
                            console.log(contacts)
                            loadContacts(contacts);
                        });
                    })
                } else {
                    console.log("NOK");
                }
            })
        })
    })
}


let loadContacts = contacts => {
    //console.log(contacts)
    document.getElementById('contacts').innerHTML = '';
    contacts.forEach(c => {
        let contact = document.createElement('li');
        contact.setAttribute("role", "tablist");
        contact.setAttribute("class", "nav-pills");
        contact.onclick = () => {
            loadConversation(c);
        }
        contact.innerHTML = `<figure id="${c._id}" class="flex nav-link" aria-selected="false" data-toggle="pill"><img src="${c.avatar}" class="listing-img"/><figcaption>${c.name}</figcaption></figure>`;
        document.getElementById('contacts').appendChild(contact);
        
    });
}

let loadConversation = (user) => {
    // let conversations
    //console.log(user)
    document.getElementById('send').dataset.id = user._id;
    document.getElementById("contact-name").innerHTML = user.name;
    document.getElementById("contact-img").src = user.avatar;
    document.getElementById("contact-social").innerHTML = `<img src="./public/img/24px.svg" alt=""><img src="./public/img/baseline_phone_black_18dp.png" alt="">`;
    
    
    mongo.connect(url, {useNewUrlParser: true}, (err, client) => {
        if(err) {
            console.log(err);
            return
        }
        var conversationIds = [
            user._id,
            new ObjectId(localStorage.getItem("id"))
        ];
        //console.log(conversationIds)
        //console.log('connected');
        const db = client.db('chat');
        db.collection('conversations').find({
            users : {
                $all : conversationIds,
                $size : conversationIds.length
            }
        }).sort({dateTime: -1})
            .limit(20)
            .toArray( (err, messages) => {
                gogo(messages)
            })
        })


    // })
    

}

let gogo = messages => {
    //console.log(messages)
    document.getElementById("conversation").innerHTML = "";
    messages.forEach(d => {
        let conversation = document.createElement('li');
        if (d.user.name == localStorage.getItem("myName")) {
            conversation.classList.add('me')
            conversation.innerHTML = `<div class="partial partial-image"><img src="${d.user.avatar}" class="avatar" alt=""></div><div class="partial"><p class="my-bubble">${d.message}</p></div><div class="partial"></div>`;
        } else {
            conversation.innerHTML = `<div class="partial partial-image"><img src="${d.user.avatar}" class="avatar" alt=""></div><div class="partial"><p>${d.message}</p></div><div class="partial"></div>`;
        }
        document.getElementById('conversation').appendChild(conversation);
    })
}


window.addEventListener('DOMContentLoaded', run)