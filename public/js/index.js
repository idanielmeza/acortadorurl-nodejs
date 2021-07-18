const btnAcortar = document.querySelector('#boton');
let idUrl = '';

document.addEventListener('DOMContentLoaded', async ()=>{

    btnAcortar.addEventListener('click', acortarURL)

})

const acortarURL = async()=>{

    const url = document.querySelector('#url');
    if(url.value === ''){
        alert('Debes Ingresar un URL');
        return;
    }
    
    const api = 'http://ledezmadev/api';
    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({url: url.value})
    };

    
    const divResultado = document.querySelector('#resultado');

    while(divResultado.firstChild){
        divResultado.removeChild(divResultado.firstChild);
    }

    divResultado.innerHTML = `<div class="text-center">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>`


    fetch(api,settings)
    .then(resp=> resp.json())
    .then(data => imprimirData(data))
    .catch(console.log);

    url.value = '';

}


const imprimirData = ({url,id})=>{

    idUrl = `http://ledezmadev/${id}`

    const divResultado = document.querySelector('#resultado');

    while(divResultado.firstChild){
        divResultado.removeChild(divResultado.firstChild);
    }

    divResultado.innerHTML += `
            <div class="shadow bg-white mt-6 p-6 rounded text-center container">

                <a href="${idUrl}" class="font-bold uppercase">Url corto:  <span class="font-light normal-case">${idUrl} </span></a>
                
                <p class="font-light mt-4">Url : ${url}</p>

                <input id="copiar" class='btn btn-primary mt-4' type="button" value='Copiar' onclick="copiarUrl()">

            </div>`;
}


const copiarUrl = ()=>{

    let areaTexto = document.createElement('textarea');
    areaTexto.value = idUrl;
    areaTexto.setAttribute('readonly', '');
    areaTexto.style.position = 'absolute';
    areaTexto.style.letf = '-9999px';

    document.body.appendChild(areaTexto);

    document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;

    areaTexto.select();

    document.execCommand('copy');

    document.body.removeChild(areaTexto);

}
