import myJson from './package.json' assert {type: 'json'};
import fetch from 'node-fetch';

const arguments_value = process.argv.slice(2);

console.log("##############################")
console.log('Film Number: ', arguments_value[0]);
console.log("##############################")


if (arguments_value.length != 1) {
    console.log( "INVALID FORMAT: the command should have the following format")
    console.log("node ts.js film_number")
} else if (arguments_value[0] <= 0 || arguments_value[0] > 6){
    console.log("INVALID ARGUMENT: The argument film number should have a value between 1 and 6 included")
} else {

    // set timeout 
    async function check_planet(planet_url) {
        try {
            let planet_object;
            const res = await fetch(planet_url)
        
            planet_object = await res.json();

            var terrain_list = planet_object.terrain
            var surface_water = planet_object.surface_water
            if (terrain_list.includes("mountains") & surface_water > 0) {
                return planet_object.diameter
            }
            return null

        } catch (err){
            console.log(err)
        }

    }
    async function check_film (film_nbr) {
        try {
            let film_object;
            var url = "https://swapi.dev/api/films/"+film_nbr+"/";
            const res = await fetch(url)
        
            film_object = await res.json();
            var planetes = film_object.planets
            var sumy = 0

            for (let i = 0; i < planetes.length; i++) {
                var result = await check_planet(planetes[i])
                if (result != null) {
                    sumy = sumy + parseInt(result)
                }
            }
            return sumy

        } catch (err){
            console.error(err);
        }
    }
    
    var resu = check_film(arguments_value[0])
    console.log("Total diameter: " + await resu)
}

