const xhr = new XMLHttpRequest();

// usually responose is sending on internet so it takes time to travel through internet and receives the response so after the response is loaded we printing the response
xhr.addEventListener('load', () => {
    console.log(xhr.response);
})

xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();