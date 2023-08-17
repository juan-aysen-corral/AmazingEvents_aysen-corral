
import {mostrartarjeta,mostrarbox, filtradoPorNombre, cualca, manejarSearch,separarCategorias,filtradof} from "../modules/functions.js";

let arrayDeCajitas = document.getElementById("cajitas")
const search = document.getElementById("search")

fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then(response=> response.json())
.then(response=>{
    
    let data=response.events
    let date=response.currentDate
    let eventoFuturo = filtradof(data,date)
    
    mostrartarjeta(eventoFuturo)
    separarCategorias(eventoFuturo)
    arrayDeCajitas.addEventListener("change", ()=>manejarSearch(eventoFuturo))
    search.addEventListener("input",()=>manejarSearch(eventoFuturo))

}).catch(error => {console.log('Error al obtener los datos de la API:', error);
})

/*
function filtradof(filtro,data){
    const futuros=[]
    const date= filtro.currentDate
    for (const fecha  of filtro) {
        
       
        if(fecha.date > data){
            futuros.push(fecha)
        }
        
    }
    
 return futuros
}




function creartarjetas(tarjet){
    let body = document.getElementById("body")
    body.style.backgroundColor = "white";
    return `<div class="card-container col-lg-3 col-sm-12 col-md-6 c">
    <div class="cards" style="width: 100; height: 100;">
     <img class="fotos" src=${tarjet.image} alt="...">
   <div class="card-body">
     <h5 class="card-title">${tarjet.name} </h5>
     <p class="card-text">${tarjet.description}</p>
     <div class="ff ">
      <p>Price =$ ${tarjet.price}</p>
     <a href="detail.html?id=${tarjet._id} " class="btn btn-primary">Details</a>
    </div>
    </div>
 </div>`
}

function tarjetError() {
    let home= document.getElementById(`muchas`)
   let body = document.getElementById("body")
    body.style.backgroundColor = "black";
    let objeto= ` <div class="card-container col-lg-3 col-sm-12 col-md-6 c">
    <div class="cards" style="width: 100; height: 100;">
     <img class="fotos" src="https://i.redd.it/0zos7jy4uwsy.jpg" alt="...">
     <audio src="../imagenes/evilmorty.mp3" autoplay></audio>
   <div class="card-body error" >
     <h5 class="card-title">ERROR</h5>
     <p class="card-text"> Tarjeta no encontrada </p>
     <div class="ff ">
    
    </div>
    </div>
 </div>`
 home.innerHTML =home.innerHTML+ objeto;
}
function mostrartarjeta (vision  ){
    let home= document.getElementById(`muchas`)
    
    for (let visible of vision) {
        const ver = creartarjetas(visible)
        home.innerHTML = home.innerHTML + ver;
        
    }
}




function crearbox ( box){
    
    return  ` <div class="form-check form-check-inline">
     <input class="form-check-input" type="checkbox" id="${box._id}" value="${box.category}">
     <label class="form-check-label" for="${box._id}" > ${box.category} </label>
   </div>`
    
 
 }
 
 function mostrarbox( ok ){
     let cajas = document.getElementById("cajitas")
     for( let vista of ok){
         
         
             const inyergar= crearbox(vista)
             cajas.innerHTML= cajas.innerHTML + inyergar;
             
         
     }
 }
 


 function separarCategorias () {
let categoriasObjeto=[];
let categorias =[];
let objeto ={};
for(let categoria of eventoFuturo){
    if(!categorias.includes(categoria.category)){
        categorias.push(categoria.category);
        objeto = {
            "category": categoria.category ,
            "id": categoria._id,
        }
        categoriasObjeto.push(objeto);
    }
}mostrarbox(categoriasObjeto)
}

separarCategorias()


function cualca (filtradoPorChecks, igualados, search){
    console.log (search)
    let home= document.getElementById(`muchas`);
    home.innerHTML = ""
    let conectados = filtradoPorChecks.filter(el => {
            return igualados.includes(el)
        } )
    if (conectados.length > 0){
        mostrartarjeta(conectados);
        console.log ("entra en conectados")
    } else{
        if(filtradoPorChecks.length === 0 && igualados.length == 0 && search == ""){
            mostrartarjeta(eventoFuturo)
            console.log (filtradoPorChecks.length)
        } else if(filtradoPorChecks.length > 0 && igualados.length == 0) {
            mostrartarjeta(filtradoPorChecks)
            console.log ("entra en no conectados filtrado > 0")
        } else if ( igualados.length > 0 && (filtradoPorChecks.length == 0 && search == ""  ) ){
            mostrartarjeta(igualados)
            console.log ("entra en no conectados igualados > 0 ")
        } else {
            tarjetError()
        }
    }

}


let arrayDeCajitas = document.getElementById("cajitas")
const search = document.getElementById("search")
arrayDeCajitas.addEventListener("change", manejarSearch)
search.addEventListener("input",manejarSearch)

function manejarSearch(){
    /*filtrado de search 
    let filtradoNombreEvento = filtradoPorNombre(eventoFuturo,search.value)
   
    let filtradoPorChecks=  filtradoNombreEvento
    
    /*filtrado de check 
    let checkbox = document.querySelectorAll("input[type='checkbox']")
    let arrayChecked= Array.from(checkbox).filter(checkbox=> checkbox.checked)
    let arrayValoresCheck = arrayChecked.map(elemento => elemento.value)
    let igualados = eventoFuturo.filter(elemen => arrayValoresCheck.includes(elemen.category))

    
    cualca(filtradoPorChecks, igualados, search.value)

}


 function filtradoPorNombre (arrayevento,nombreeventos){
    
    const filtrado = arrayevento.filter(eventm => {
        if(nombreeventos !== ""){
            return eventm.name.toLowerCase().includes(nombreeventos.toLowerCase())
        } else{
            return null }
            } 
        )
    
        return filtrado
   

 } */
