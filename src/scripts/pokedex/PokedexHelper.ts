import TypeColor = GameConstants.TypeColor;

class PokedexHelper {
    public static getBackgroundColors(name: string): string {
        let pokemon = PokemonHelper.getPokemonByName(name);

        if (!PokedexHelper.pokemonSeen(pokemon.id)()) {
            return "grey"
        }
        if (pokemon.type2 == GameConstants.PokemonType.None) {
            return TypeColor[pokemon.type1];
        }
        return 'linear-gradient(90deg,' + TypeColor[pokemon.type1] + ' 50%, ' + TypeColor[pokemon.type2] + ' 50%)';
    }

    /**
     * Returns true if you have seen the pokemon
     * @param {number} id
     * @returns {boolean}
     */
    public static pokemonSeen(id: number): KnockoutComputed<boolean> {
        return ko.computed(function () {
            return player.defeatedAmount[id]() > 0 || player.caughtAmount[id]() > 0;
        })
    }

    public static filteredList: KnockoutObservableArray<object> = ko.observableArray([]);

    public static populateTypeFilters() {
        var options = $("#pokedex-filter-type1");
        $.each(GameConstants.PokemonType, function () {
            if (isNaN(Number(this)) && this != GameConstants.PokemonType.None) {
                options.append($("<option />").val(GameConstants.PokemonType[this]).text(this));
            }
        });

        options = $("#pokedex-filter-type2");
        $.each(GameConstants.PokemonType, function () {
            if (isNaN(Number(this)) && this != GameConstants.PokemonType.None) {
                options.append($("<option />").val(GameConstants.PokemonType[this]).text(this));
            }
        });
    }

    public static updateList() {
        PokedexHelper.filteredList(PokedexHelper.getList());
    }

    public static getList(): Array<object> {
        let filter = PokedexHelper.getFilters();
        return pokemonList.filter(function (pokemon) {
            if ((filter['name'] || "") != "" && pokemon.name.toLowerCase().indexOf(filter['name'].toLowerCase()) == -1) {
                return false;
            }
            let type1 = parseInt(filter['type1'] || -1);
            if (type1 != -1 && pokemon.type.indexOf(GameConstants.PokemonType[type1]) == -1) {
                return false;
            }

            let type2 = parseInt(filter['type2'] || -1);
            if (type2 != -1 && pokemon.type.indexOf(GameConstants.PokemonType[type2]) == -1) {
                return false;
            }

            if (filter['caught'] && player.caughtAmount[pokemon.id]() == 0) {
                return false;
            }

            if (filter['shiny'] && !player.alreadyCaughtPokemonShiny(pokemon.name)) {
                return false;
            }

            return true;
        });
    }

    private static getFilters() {
        let res = {};
        res['name'] = (<HTMLInputElement>document.getElementById('nameFilter')).value;
        let type1 = <HTMLSelectElement>document.getElementById('pokedex-filter-type1');
        res['type1'] = type1.options[type1.selectedIndex].value;
        let type2 = <HTMLSelectElement>document.getElementById('pokedex-filter-type2');
        res['type2'] = type2.options[type2.selectedIndex].value;
        res['caught'] = (<HTMLInputElement> document.getElementById('pokedex-filter-caught')).checked;
        res['shiny'] = (<HTMLInputElement> document.getElementById('pokedex-filter-shiny')).checked;
        return res;
    }

}