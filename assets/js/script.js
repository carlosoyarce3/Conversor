const result = document.querySelector("#resultado");


const convertir = async () =>{
    document.querySelector("#grafico").innerHTML = "";
    document.querySelector("#grafico").innerHTML = `<canvas id="myChart"></canvas>`;
    const lector = await fetch("https://mindicador.cl/api/");
    const datos = await lector.json();
    const monto = document.querySelector("#ingreso").value;
    const moneda = document.querySelector("#monedas").value;
    if(datos[moneda] != undefined){
        result.innerHTML = `<span>${new Intl.NumberFormat('en-DE').format(monto)}</span> CLP, son <span>${new Intl.NumberFormat('en-DE').format(monto / datos[moneda].valor)}</span> ${moneda.toUpperCase()}S`
        grafico(moneda);
    }else{
        result.innerHTML = "Valor ingresado no es valido"
    }
    
    

}

const grafico = async (moneda) =>{
    const ctx = document.getElementById('myChart');
    const lector = await fetch(`https://mindicador.cl/api/${moneda}`);
    const datos = await lector.json();
    let fechas = datos.serie.slice(0,10).map(item => item.fecha);
    for(i=0;i<fechas.length;i++){
        fechas[i] = new Date(fechas[i]);
        fechas[i] = fechas[i].toLocaleDateString("en-GB");
    }
    
    let valores = datos.serie.slice(0,10).map(item => item.valor);
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: fechas,
        datasets: [{
            label: 'Valor ultimos 10 dias',
          data: valores,
          borderWidth: 1
        }]
      }
    });
}