app.get("/diccionario", (req, res) => {
    const agrupado = datos.reduce((acumulador, { palabra, rima }) => {
        if (!acumulador[palabra]) {
            acumulador[palabra] = [];
        }
        acumulador[palabra].push(rima);
        return acumulador;
    }, {});

    res.json({
        message: "Lista de rimas agrupadas",
        data: agrupado
    });
});