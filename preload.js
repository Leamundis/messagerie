var mongo = require('mongodb');

const run = () => {
    let contacts = [
        {
            id: 1,
            name: "Jon",
            avatar: "https://gravatar.com/avatar/1577b0ddfa90dfb7b612b5e8bb7fc622?s=400&d=robohash&r=x"
        },
        {
            id: 2,
            name: "Pierre",
            avatar: "https://gravatar.com/avatar/0d57488fa495da3eacf5600435b21c5f?s=400&d=robohash&r=x"
        },
        {
            id: 3,
            name: "Rien",
            avatar: "https://gravatar.com/avatar/d3ff29b722d32a08c424fac87e71aeac?s=400&d=robohash&r=x"
        },
        {
            id: 4,
            name: "Eillistrae",
            avatar: "https://gravatar.com/avatar/682299093508b11741932f47c31d2456?s=400&d=robohash&r=x"
        },
        {
            id: 5,
            name: "Tempus",
            avatar: "https://gravatar.com/avatar/7248822680b7e939d1a862730a98287c?s=400&d=robohash&r=x"
        }
    ];
    loadContacts(contacts);
}


let loadContacts = contacts => {
    contacts.forEach(c => {
        let contact = document.createElement('li');
        contact.setAttribute("role", "tablist");
        contact.setAttribute("class", "nav-pills");
        contact.onclick = () => {
            loadConversation(c);
        }
        contact.innerHTML = `<figure class="flex nav-link" aria-selected="false" data-toggle="pill"><img src="${c.avatar}" class="listing-img"/><figcaption>${c.name}</figcaption></figure>`;
        document.getElementById('contacts').appendChild(contact);
    });
}

let loadConversation = (user) => {
    let conversations = {
        1 : [
            {
                user: {
                    name: 'me',
                    avatar: 'https://gravatar.com/avatar/fbbde2a428d73dccc5890bc0b4624270?s=400&d=robohash&r=x'
                },
                message: "Bien le bonjour!"
            },
            {
                user: user,
                message: "Mauvais le bonjour!"
            },
            {
                user: {
                    name: 'me',
                    avatar: 'https://gravatar.com/avatar/fbbde2a428d73dccc5890bc0b4624270?s=400&d=robohash&r=x'
                },
                message: "Tiens! T'ai de mauvaise humeur toi?"
            },
            {
                user: user,
                message: "Ouai, NodeJS toute la semaine!"
            },
        ],
        2 : [
            {
                user: {
                    name: 'me',
                    avatar: 'https://gravatar.com/avatar/fbbde2a428d73dccc5890bc0b4624270?s=400&d=robohash&r=x'
                },
                message: "Yo"
            },
            {
                user: user,
                message: "Plait!"
            }
        ],
        3 : [
            {
                user: {
                    name: 'me',
                    avatar: 'https://gravatar.com/avatar/fbbde2a428d73dccc5890bc0b4624270?s=400&d=robohash&r=x'
                },
                message: "Salut"
            },
            {
                user: user,
                message: "Salut, toi!"
            },
            {
                user: {
                    name: 'me',
                    avatar: 'https://gravatar.com/avatar/fbbde2a428d73dccc5890bc0b4624270?s=400&d=robohash&r=x'
                },
                message: "Comment ça farte?"
            },
            {
                user: user,
                message: "Ca farte des skis!"
            },
        ],
        4 : [
            {
                user: {
                    name: 'me',
                    avatar: 'https://gravatar.com/avatar/fbbde2a428d73dccc5890bc0b4624270?s=400&d=robohash&r=x'
                },
                message: "Salut Eili, comment va?"
            },
            {
                user: user,
                message: "Salut! Bien bien!"
            },
            {
                user: {
                    name: 'me',
                    avatar: 'https://gravatar.com/avatar/fbbde2a428d73dccc5890bc0b4624270?s=400&d=robohash&r=x'
                },
                message: "Toujours cette phobie des araignées?"
            },
            {
                user: user,
                message: "Non, ça va, on bosse dessus avec Dritzz..."
            },
        ],
        5 : [
            {
                user: {
                    name: 'me',
                    avatar: 'https://gravatar.com/avatar/fbbde2a428d73dccc5890bc0b4624270?s=400&d=robohash&r=x'
                },
                message: "Salut!"
            },
            {
                user: user,
                message: "Salut!"
            },
            {
                user: {
                    name: 'me',
                    avatar: 'https://gravatar.com/avatar/fbbde2a428d73dccc5890bc0b4624270?s=400&d=robohash&r=x'
                },
                message: "Quelque chose à dire, pour la postérité?"
            },
            {
                user: user,
                message: "Prout!"
            },
        ]
    }
    let messages = conversations[user.id]
    document.getElementById("conversation").innerHTML = "";
    messages.forEach(d => {
        let conversation = document.createElement('li');
        conversation.innerHTML = `<div class="partial partial-image"><img src="${d.user.avatar}" class="avatar" alt=""></div><div class="partial"><p>${d.message}</p></div><div class="partial"></div>`;
        document.getElementById('conversation').appendChild(conversation);
    })
    document.getElementById("contact-name").innerHTML = user.name;
    document.getElementById("contact-img").src = user.avatar;
    document.getElementById("contact-social").innerHTML = `<img src="./public/img/24px.svg" alt=""><img src="./public/img/baseline_phone_black_18dp.png" alt="">`;
    
}

window.addEventListener('DOMContentLoaded', run)