///<reference path="Item.ts"/>
class BattleItem extends Item {

    type: GameConstants.BattleItemType;
    timeLeft: KnockoutObservable<number>;

    constructor(type: GameConstants.BattleItemType, time: number = 60) {
        let basePrice = 1000;

        switch (type) {
            case GameConstants.BattleItemType.xAttack:
                basePrice = GameConstants.ItemPrice.xAttack;
                break;
            case GameConstants.BattleItemType.xClick:
                basePrice = GameConstants.ItemPrice.xClick;
                break;
            case GameConstants.BattleItemType.xExp:
                basePrice = GameConstants.ItemPrice.xExp;
                break;
            case GameConstants.BattleItemType.Token_collector:
                basePrice = GameConstants.ItemPrice.Token_collector;
                break;
            case GameConstants.BattleItemType.Item_magnet:
                basePrice = GameConstants.ItemPrice.Item_magnet;
                break;
            case GameConstants.BattleItemType.Lucky_incense:
                basePrice = GameConstants.ItemPrice.Lucky_incense;
                break;
        }

        let priceMultiplier = 1;
        super(GameConstants.BattleItemType[type], basePrice, priceMultiplier, GameConstants.Currency.money);
        this.type = type;
        this.timeLeft = ko.observable(time);
    }

    buy(amt: number) {
    }

    use() {
        switch (this.type) {
            case GameConstants.BattleItemType.xAttack:
                break;
            case GameConstants.BattleItemType.xClick:
                break;
            case GameConstants.BattleItemType.xExp:
                break;
            case GameConstants.BattleItemType.Token_collector:
                break;
            case GameConstants.BattleItemType.Item_magnet:
                break;
            case GameConstants.BattleItemType.Lucky_incense:
                break;
        }
    }
}

ItemList['xAttack'] = new BattleItem(GameConstants.BattleItemType.xAttack);
ItemList['xClick'] = new BattleItem(GameConstants.BattleItemType.xClick);
ItemList['xExp'] = new BattleItem(GameConstants.BattleItemType.xExp);
ItemList['Token_collector'] = new BattleItem(GameConstants.BattleItemType.Token_collector);
ItemList['Item_magnet'] = new BattleItem(GameConstants.BattleItemType.Item_magnet);
ItemList['Lucky_incense'] = new BattleItem(GameConstants.BattleItemType.Lucky_incense);