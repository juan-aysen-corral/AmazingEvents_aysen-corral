
fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then(response=>response.json())
.then(response=>{
    let data = response.events

    let contenedors = document.getElementById("contenedor")

    let parametro = location.search

    const objeto= new URLSearchParams(parametro)

    const idDelObejeto = objeto.get("id")

    console.log(idDelObejeto)


 let objetivo = data.find(parame =>{ 

 return   parame._id == idDelObejeto


})
 console.log(objetivo)
 const maquetado = recreasTarjeta(objetivo)
 console.log(maquetado)
 console.log(contenedors)
 enviarA(maquetado,contenedors)
 
 
 
})
.catch(error => {console.log('Error al obtener los datos de la API:', error);
})
 
 
 
 function recreasTarjeta(elemento){
    console.log(elemento)
     return `<div id="contenedor" class="container-fluid row  d-flex justify-content-center card-container  ">
         
     <div class="bg-info col-lg-8 col-sm-11 col-md-7 p-2 cards ">
         <div class="row container-fluid h-100">
             <div class="col-lg-6" style="width: 100; height:100; object-fit: fill;"> 
                 <img src="${elemento.image}" class="h-100 w-100" style="object-fit: cover;" alt="...">
             </div>
 
 
         <div class="card col-lg-6" >
             <div class="card-body">
                 <div class="card-header card-titulo" style="justify-content: center; align-items:center">
                     <h5 class="card-title ">${elemento.name} </h5>
                 </div>
                 <ul class="list-group">
                     <li class="list-group-item">
                         <p class="card-text"> date:${elemento.date} </p>
                     </li>
                     <li class="list-group-item">
                         <p class="card-text">description:${elemento.description} </p>
                     </li>
                     <li class="list-group-item">
                         <p class="card-text">category:${elemento.category} </p>
                     </li>
                     <li class="list-group-item">
                         <p class="card-text">place:${elemento.place} </p>
                     </li>
                     <li class="list-group-item">
                         <p class="card-text">capacity:${elemento.capacity} </p>
                     </li>
                     <li class="list-group-item">
                         <p class="card-text">estimate: ${elemento.estimate} </p>
                     </li>
                     <li class="list-group-item">
                         <p class="card-text">price:${elemento.price} </p>
                     </li>
                 </ul>
 
             </div>
         </div>
     </div>
 </div>
 
 
 </div>`
 }
 
  
  function enviarA(armado,cajahtml){
     cajahtml.innerHTML= armado
  }