var unirest = require("unirest")

const args = process.argv.slice(2)
const id = args[0]

if (!id) {
    console.log("\nPlease provide the id in argv! \nex: node exoA.js akR84cX")
} else {
    delete_podcast(id)
}


/**
 * 
 * @param {*} id id of the podcast you want to delete
 * @returns 
 */
function delete_podcast(id) {
    return unirest
        .delete(`http://localhost:3000/podcasts/${id}`)
        .then(res => {
            if (res.error) {
                if (res.statusCode == '404') console.log("404 Podcast Not Found")
                else throw new Error(res.error)
            } else {
                console.log(`${res.statusCode} ${res.statusMessage}`)
            }
        })
}