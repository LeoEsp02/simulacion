var datosGenerados = [];

function generarNumeros() {
    var semilla = parseInt(document.getElementById('semilla').value);
    var a = parseInt(document.getElementById('a').value);
    var m = parseInt(document.getElementById('m').value);
    var iteraciones = 500;

    datosGenerados = [];
    var xn = semilla;

    for (var i = 0; i < iteraciones; i++) {
        var operacion = `x${i + 1}=(${a}*${xn}) mod ${m}`;
        xn = (a * xn) % m;
        var r = xn / (m - 1);
        datosGenerados.push({ iteracion: i + 1, operacion: operacion, numero: xn, divisionRealizada: `(${a}*${xn})/${m - 1}`, division: r.toFixed(4) });
    }

    actualizarTabla();
    generarGrafica();
}

function actualizarTabla() {
    var tablaBody = document.querySelector('#tabla-resultados tbody');
    tablaBody.innerHTML = '';

    for (var i = 0; i < datosGenerados.length; i++) {
        var fila = document.createElement('tr');

        var celdaIteracion = document.createElement('td');
        celdaIteracion.textContent = datosGenerados[i].iteracion;
        fila.appendChild(celdaIteracion);

        var celdaOperacion = document.createElement('td');
        celdaOperacion.textContent = datosGenerados[i].operacion;
        fila.appendChild(celdaOperacion);

        var celdaNumero = document.createElement('td');
        celdaNumero.textContent = datosGenerados[i].numero;
        fila.appendChild(celdaNumero);

        var celdaDivisionRealizada = document.createElement('td');
        celdaDivisionRealizada.textContent = datosGenerados[i].divisionRealizada;
        fila.appendChild(celdaDivisionRealizada);

        var celdaDivision = document.createElement('td');
        celdaDivision.textContent = datosGenerados[i].division;
        fila.appendChild(celdaDivision);

        tablaBody.appendChild(fila);
    }
}

function generarGrafica() {
    var iteraciones = datosGenerados.map(item => item.iteracion);
    var valores = datosGenerados.map(item => item.numero);

    var ctx = document.getElementById('grafica').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: iteraciones,
            datasets: [{
                label: 'Datos Generados',
                data: valores,
                backgroundColor: 'rgba(75, 192, 192, 1)',
                pointRadius: 4.5,
                pointHoverRadius: 8, // Ajustar el tamaño del punto al pasar el ratón
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                },
                y: {
                    type: 'linear',
                    position: 'left'
                }
            }
        }
    });
}