import { MapCell } from "./mapCell.js";
export class GameData {
    constructor() {
        this.currentHealth = 100;
        this.maxHealth = 100;
        this.minAttack = 2;
        this.maxAttack = 10;
        this.minArmor = 2;
        this.maxArmor = 10;
        this.armorName = "CYBER_ARMOR";
        this.weaponName = "LASER_PISTOL";
        this.healItemsCount = 2;
        this.enemyName = "NONE";
        this.enemyMinAttack = 0;
        this.enemyMaxAttack = 0;
        this.enemyCurrentHealth = 0;
        this.enemyMaxHealth = 0;
        this.currentMapCell = MapCell.generateMapCell({ fromDirection: 1 });
    }
}
