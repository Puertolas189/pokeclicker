class StartSequenceRunner {

    public static start() {
        Game.gameState(GameConstants.GameState.paused);
        $('#startSequenceModal').modal('show');

    }

    public static pickStarter(s: GameConstants.Starter) {
        player.starter = s;
        $('#pickStarterModal').modal('hide');
        let dataPokemon = PokemonHelper.getPokemonByName(GameConstants.Starter[player.starter]);
        let shiny: boolean = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_BATTLE);

        Game.gameState(GameConstants.GameState.fighting);

        let battlePokemon = new BattlePokemon(dataPokemon.name, dataPokemon.id, dataPokemon.type1, dataPokemon.type2, 10, 1, 100, 0, 0, shiny);
        Battle.enemyPokemon(battlePokemon);
        // Set the function to call showCaughtMessage after pokemon is caught
        battlePokemon.isAlive = function () {
            if (battlePokemon.health() <= 0) {
                setTimeout(
                    function () {
                        StartSequenceRunner.showCaughtMessage()
                    }, player.calculateCatchTime());

                //reset the function so you don't call it too many times :)
                //What a beautiful piece of code
                battlePokemon.isAlive = function () {
                    return false;
                }
            }
            return this.health() > 0;
        };
    }

    public static showCaughtMessage() {
        player.routeKills[1](0);
        Game.gameState(GameConstants.GameState.paused);
        $('#starterCaughtModal').modal('show');
    }
}

document.addEventListener("DOMContentLoaded", function (event) {

    $('#startSequenceModal').on('hidden.bs.modal', function () {
        $('#pickStarterModal').modal('show');

    });

    $('#pickStarterModal').on('hidden.bs.modal', function () {
        if (player.starter == GameConstants.Starter.None) {
            $('#pickStarterModalText').text("I can't hold them off both! Please pick the pokémon you want to fight");
            $('#pickStarterModal').modal('show');
        }
    });

    $('#starterCaughtModal').on('hidden.bs.modal', function () {
        Save.store(player);
        Game.gameState(GameConstants.GameState.fighting);

    });
});