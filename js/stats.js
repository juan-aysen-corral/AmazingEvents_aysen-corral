import {mostrartarjeta,mostrarbox, filtradoPorNombre, cualca, manejarSearch,filtradop,filtradof} from "../modules/functions.js";


let segundaTabla = document.getElementById("segundaTabla");
let terceraTabla = document.getElementById("terceraTabla");

fetch("https://mindhub-xj03.onrender.com/api/amazing")

.then(response => response.json())
.then(response => {
    let datos=response.events
    let date= response.currentDate
    let eventosPasados = filtradop(datos,date)
    asistencia(eventosPasados,datos)
    let eventosf = filtradof(datos,date)
    let categoryp = Array.from(new Set(eventosPasados.map((evento) => evento.category)));
    let categoryf= Array.from(new Set(eventosf.map((evento) => evento.category)));
    const eventosPasCat = calcularEventos(eventosPasados, categoryp);
    console.log(eventosPasCat)
    const resultadoPas = resul(eventosPasCat, categoryp)
    mostrarTablaTwo(resultadoPas)
    
    const eventosFutCat = calcularEventos(eventosf, categoryf);
    const resultadoFut = resulFut(eventosFutCat, categoryf);
    mostrarTablaThree(resultadoFut);
   console.log(resultadoFut)

}).catch(error => {console.log('Error al obtener los datos de la API:', error);
})

function resulFut(eventos, cat){
    let resultado = cat.map((categoria, index)=>{
        const ingresos=calcularIngresosEstimados(eventos[index])
        const asistencias=calcularEstimativos(eventos[index])

        return {
            categoria:categoria,
            revenues: ingresos,
            asistencias: asistencias
        }
    })
    return resultado
}

function resul(eventos, cat){    
    let resultado = cat.map((categoria, index)=>{
        const ingresos=calcularIngresos(eventos[index])
        const asistencias=calcularAsistencia(eventos[index])

        return {
            categoria:categoria,
            revenues: ingresos,
            asistencias: asistencias
        }
    })
    return resultado

}
function calcularEstimativos(eventos){
    const totalAsistencia = eventos.reduce((total, evento) => {
        return total + evento.estimate;
    }, 0);

    const totalCapacidad = eventos.reduce((total, evento) => {
        return total + evento.capacity;
    }, 0);

    const porcentajeAsistencia = (totalAsistencia / totalCapacidad) * 100;

    return porcentajeAsistencia;
}

function calcularAsistencia(eventos){
    const totalAsistencia = eventos.reduce((total, evento) => {
        return total + evento.assistance;
    }, 0);

    const totalCapacidad = eventos.reduce((total, evento) => {
        return total + evento.capacity;
    }, 0);

    const porcentajeAsistencia = (totalAsistencia / totalCapacidad) * 100;

    return porcentajeAsistencia;
}

function calcularIngresos(eventos){
    return eventos.reduce((total, evento) => {
        return total + (evento.assistance * evento.price);
    }, 0);
}

function calcularIngresosEstimados(eventos){
   let algo= eventos.reduce((total, evento) => {

        return total + (evento.estimate * evento.price);
    }, 0);
return algo
}


function calcularEventos(eventos, categorias) {
    const eventosCat = categorias.map(categoria => {
        return eventos.filter(evento => evento.category === categoria);
    });
    return eventosCat;
}


function asistencia(past,data){

data.sort((a,b)=>b.capacity-a.capacity)
let capacidad=data.shift()

    let porcent=past.map(p=>{
        return{
            nombre:p.name,
            
            porcentaje:(p.assistance / p.capacity)*100
        }
    })
porcent.sort((a,b)=> b.porcentaje - a.porcentaje);


let maximo=porcent.shift()
let minimo=porcent.pop()
mostrarTablaOne(maximo,minimo,capacidad)
}


function mostrarTablaOne(mayor,menor,capacidad){
  let tabla=document.getElementById("primertabla")
  tabla.innerHTML = ` <td> ${mayor.nombre} : ${mayor.porcentaje.toFixed(2)} %</td>
  <td>${menor.nombre} : ${menor.porcentaje.toFixed(2)} %</td> 
  <td>${capacidad.name} : ${capacidad.capacity}</td>` 

}

function mostrarTablaTwo(resultadoPas){
    console.log(resultadoPas)
    for (const fila of resultadoPas) {
        segundaTabla.innerHTML = segundaTabla.innerHTML + ` <tr>
        <td>${fila.categoria}</td>
        <td>$ ${fila.revenues}</td>
        <td>${fila.asistencias.toFixed(2)}%</td>
      </tr>`
        
    }
}

function mostrarTablaThree(resultadoPas){
    console.log(resultadoPas)
    for (const fila of resultadoPas) {
        terceraTabla.innerHTML = terceraTabla.innerHTML + ` <tr>
        <td>${fila.categoria}</td>
        <td>${fila.revenues}</td>
        <td>${fila.asistencias.toFixed(2)} %</td>
      </tr>`
        
    }
}






