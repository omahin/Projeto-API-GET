const series = require("../models/series.json");

const home = (request, response) => {
    response.status(200).send(
        {
            "message": "Olá, seja bem vinde ao {ReprogramaTube}!"
        }
    )
};

const getAll = (request, response) => {

  response.status(200).send(series);  
};

const getById = (request, response) => {
   
    const requestedId = request.params.id;

    const filteredId = series.find(serie => serie.id == requestedId);

    response.status(200).send(filteredId)
};

// const getByGenre = (request, response) => {

//     const requestedGenre = request.params.genre;

//     const filteredGenre = series.find(serie => serie.genre === requestedGenre);

//     response.status(200).send(filteredGenre)
// };

const getByTitle = (request, response) => {

    const requestedTitle = request.query.title.toLowerCase()

    const filteredTitle = series.find(serie => serie.title.toLowerCase().includes(requestedTitle))

    if(requestedTitle === "" || filteredTitle === undefined) {
        response.status(404).send({
            "message": "Por favor, insira um título válido!"
        })
    }else{
        response.status(200).send(filteredTitle)
    }
};

const getByGenre = (request, response) => {
    
    const requestedGenre = request.query.genre

    let serieList = [];

    series.forEach(serie => {
        let genreList = serie.genre
        // console.log(genreList, "oi")

        for(genre of genreList) {
            if(genre.includes(requestedGenre)) {
                console.log(serie)
                serieList.push(serie)
            }
        }
    })
    response.status(200).send(serieList)
}

const getBySeasons = (request, response) => {

}

module.exports = {
    home,
    getAll,
    getById,
    getByTitle,
    getByGenre,
    getBySeasons
}