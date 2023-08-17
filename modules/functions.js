

export function creartarjetas(tarjet){
    let home= document.getElementById(`muchas`)
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
     <a href="./paginas/detail.html?id=${tarjet._id} " class="btn btn-primary">Details</a>
    </div>
    </div>
 </div>`
}

export function tarjetError() {
    let home= document.getElementById(`muchas`)
   let body = document.getElementById("body")
    body.style.backgroundColor = "black";
    let objeto= ` <div class="card-container col-lg-3 col-sm-12 col-md-6 c">
    <div class="cards" style="width: 100; height: 100;">
     <img class="fotos" src="https://i.redd.it/0zos7jy4uwsy.jpg" alt="...">
     <audio src="./imagenes/evilmorty.mp3" autoplay></audio>
   <div class="card-body error" >
     <h5 class="card-title">ERROR</h5>
     <p class="card-text"> Tarjeta no encontrada </p>
     <div class="ff ">
    
    </div>
    </div>
 </div>`
 home.innerHTML =home.innerHTML+ objeto;
}


export function crearbox ( box){
    
    return  ` <div class="form-check form-check-inline">
     <input class="form-check-input" type="checkbox" id="${box._id}" value="${box.category}">
     <label class="form-check-label" for="${box._id}" > ${box.category} </label>
   </div>`
    
 
 }
export function mostrartarjeta (vision  ){
    let home= document.getElementById(`muchas`)
    for (let visible of vision) {
        const ver = creartarjetas(visible)
        home.innerHTML = home.innerHTML + ver;
        
    }
}
export function mostrarbox( ok ){
    
    let cajas = document.getElementById("cajitas")
    for( let vista of ok){
        
        
            const inyergar= crearbox(vista)
            cajas.innerHTML= cajas.innerHTML + inyergar;
            
        
    }
}

export function manejarSearch(datos){
    /*filtrado de search */
    let filtradoNombreEvento = filtradoPorNombre(datos,search.value)
   
     
    
    /*filtrado de check */
    let arrayValoresCheck = Array.from(document.querySelectorAll("input[type='checkbox']:checked")).map(elemento => elemento.value);
   /* let arrayChecked= Array.from(checkbox).filter(checkbox=> checkbox.checked)
    let arrayValoresCheck = arrayChecked.map(elemento => elemento.value)*/
    let igualados = datos.filter(elemen => arrayValoresCheck.includes(elemen.category))

    
    cualca(filtradoNombreEvento, igualados, search.value,datos)

}



export function filtradoPorNombre (arrayevento,nombreeventos){
    
    const filtrado = arrayevento.filter(eventm => {
        if(nombreeventos !== ""){
            return eventm.name.toLowerCase().includes(nombreeventos.toLowerCase())
        } else{
            return null }
            } 
        )
    
        return filtrado
   

 } 
 export function cualca (filtradoPorChecks, igualados, search,datos){
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
            mostrartarjeta(datos)
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
export function filtradop(filtro,data){
    let pasado=[]
    for (const fecha  of filtro) {
        
        
        if(fecha.date < data){
            pasado.push(fecha)
        }
        
    }
    
 return pasado
}
export function filtradof(filtro,data){
    const futuros=[]
    const date= filtro.currentDate
    for (const fecha  of filtro) {
        
       
        if(fecha.date > data){
            futuros.push(fecha)
        }
        
    }
    
 return futuros
}

 export function separarCategorias(datos){
    
    let categoriasObjeto=[];
    let categorias = [];
    let objeto = {};
     for(let categoria of datos){
        if (!categorias.includes(categoria.category)){
            categorias.push(categoria.category);
            objeto = {
                "category": categoria.category,
                "id": categoria._id
            }
            categoriasObjeto.push(objeto);
            
        }
       
     } console.log(categoriasObjeto)
     
     mostrarbox(categoriasObjeto)
}