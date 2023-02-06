import { Pokemon } from './interface';
const cheerio = require('cheerio');
import * as fs from 'fs';

const listUrl: string = 'https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_Paldea_Pok%C3%A9dex_number';
const output: string = 'json/gen9.json';

const getPokemonList = async () => {
    try {
        const response = await fetch(listUrl);
        const $ = cheerio.load(await response.text());

        const pokemons: Pokemon[] = [];
        const $rows = $('table.roundtable tr');
        $rows.each((_: number, row: any) => {
            const $row = $(row);
            if (!$row.find('td').length) {
                return true;
            }

            console.log($row.find('td:eq(5)').html());
            const pokemon: Pokemon = {
                zenkokuId: Number($row.find('td:eq(1)').text().trim().replace(/#/, '')),
                paldeaId: Number($row.find('td:eq(0)').text().trim().replace(/#/, '')),
                icon: $row.find('th:eq(0) > a > img').attr('src'),
                name: $row.find('td:eq(2)').text().trim(),
                pokedexImageUrl: $row.find('td:eq(5) img').attr('src'),
            };
            console.log(pokemon);
            pokemons.push(pokemon);
        });

        fs.writeFileSync(output, JSON.stringify(pokemons, null, 2));
    } catch (err) {
        console.error(err);
    }
}

getPokemonList();