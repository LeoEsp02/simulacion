document.getElementById('inputForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obtener los valores de las semillas
    var seed1 = parseInt(document.getElementById('seed1').value);
    var seed2 = parseInt(document.getElementById('seed2').value);
    var seed3 = parseInt(document.getElementById('seed3').value);
    var seed4 = parseInt(document.getElementById('seed4').value);
    var seed5 = parseInt(document.getElementById('seed5').value);

    // Generar los números pseudoaleatorios
    var numbers = [];
    var m = 100;
    numbers.push(seed1, seed2, seed3, seed4, seed5);

    for (var i = 5; i < 500; i++) {
        var newNumber = (numbers[i-1] + numbers[i-2] + numbers[i-3] + numbers[i-4] + numbers[i-5]) % m;
        numbers.push(newNumber);
    }

    // Calcular los números pseudoaleatorios r
    var rValues = [];
    for (var i = 5; i < numbers.length; i++) {
        var r = (numbers[i] % m) / (m - 1);
        rValues.push(r.toFixed(4)); // Redondear a 4 decimales
    }

    // Actualizar la tabla de resultados
    var tabla = document.querySelector('#tabla-resultados tbody');
    tabla.innerHTML = '';
    for (var i = 0; i < rValues.length; i++) {
        var row = tabla.insertRow();
        var iteracionCell = row.insertCell(0);
        var operacionCell = row.insertCell(1);
        var numeroCell = row.insertCell(2);
        var divisionCell = row.insertCell(3);
        var rCell = row.insertCell(4);

        iteracionCell.textContent = i + 1;
        operacionCell.textContent = "X" + (i + 6) + " = (X" + (i + 5) + " + X" + (i + 4) + " + X" + (i + 3) + " + X" + (i + 2) + " + X" + (i + 1) + ") mod " + m;
        numeroCell.textContent = numbers[i + 5];
        divisionCell.textContent = "(X" + (i + 6) + " % " + m + ") / (" + m + " - 1)";
        rCell.textContent = rValues[i];
    }

    // Dibujar la gráfica
    var ctx = document.getElementById('chart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Puntos',
                data: rValues.map((value, index) => ({ x: index + 1, y: parseFloat(value) })),
                borderColor: 'blue',
                backgroundColor: 'blue',
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: false
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
});
