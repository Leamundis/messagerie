document.querySelector('.to-log').addEventListener('click', () => {
    document.querySelector('.log-form').classList.toggle('hidden');
    document.querySelector('#pills-tab').classList.toggle('hidden');
})  

// document.querySelector('.contacts').addEventListener('click', (el) => {
//     if (el.target.parentElement.parentElement.dataset.name == "girl" || el.target.parentElement.dataset.name == "girl") {
//         document.querySelector('.girl-conversation').classList.remove('hidden');
//         document.querySelector('.boy-conversation').classList.add('hidden');
//     } else if (el.target.parentElement.parentElement.dataset.name == "boy" || el.target.parentElement.dataset.name == "boy") {
//         document.querySelector('.boy-conversation').classList.remove('hidden');
//         document.querySelector('.girl-conversation').classList.add('hidden');
//     } 
// })
