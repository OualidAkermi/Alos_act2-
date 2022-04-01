var unirest = require('unirest')

var id = ''; //id de podcast récemment ajouté



/**
 * Ajout d'un nouveau podcast (exo1 question 1+3), puis en utilise l'id pour le mettre à jour, en changeant le status à "Hiatus"(pause) (question2+3) 
 */
ajouter_podcast("Akermi", "Ahmed Keddar").then(() => {

    //mètre a jour le status nouveau podcast "Ongoing" => "Completed"
    mis_a_jour_podcast(id, {
        "status": "Completed"
    })
})


/**
 * 
 * @param {*} nom_host Le nom du host de podcast
 * @param {*} prenom_host Le prénom du host de podcast
 * @returns promise that we can use to await result
 * 
 */
function ajouter_podcast(nom_host, prenom_host) {

    var promise = unirest.post("http://localhost:3000/podcasts")
        .headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
        .send({
            "index": 0,
            "name": "STAY AT HOME",
            "status": "Ongoing",
            "listeners": 101010,
            "picture": "http://placehold.it/320x320",
            "about": "Sit occaecat est laboris veniam laboris enim. Quis veniam ad reprehenderit anim incididunt tempor velit. Adipisicing sunt nulla cillum do deserunt. Enim aliquip consectetur do sit cillum velit magna elit ullamco cillum excepteur deserunt laboris commodo. Sint sint fugiat id anim. Quis laborum ipsum dolor fugiat culpa nostrud do et nisi aliquip velit irure aute.",
            "releaseDate": "Saturday, November 5, 2019 11:20 AM",
            "category": "series",
            "hosts": [{
                "id": 0,
                "name": `${nom_host} ${prenom_host}`
            }],
        })
        .then(res => {
            if (res.error) throw new Error(res.error)
            // affiche l'entète HTTP (pour la 3eme question)
            console.log(`${res.statusCode} ${res.statusMessage}`)
            id = res.body.id;
        })

    return promise;
}



/**
 * 
 * @param {*} id id of the podcast you want to change
 * @param {*} new_data the data you want to update in the chosen podcast
 */
function mis_a_jour_podcast(id, new_data) {
    unirest.patch(`http://localhost:3000/podcasts/${id}`)
        .headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
        .send(new_data)
        .then(res => {
            if (res.error) console.log(res.error)
            // affiche l'entète HTTP (pour la 3eme question)
            console.log(`${res.statusCode} ${res.statusMessage}`)
        })
}