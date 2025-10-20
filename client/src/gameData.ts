import { int } from "./types.js"
import { MapCell } from "./mapCell.js"

export class GameData {
    public currentHealth: int = 100
    public maxHealth: int = 100
    public minAttack: int = 2
    public maxAttack: int = 10
    public minArmor: int = 2
    public maxArmor: int = 10
    public armorName: string = "CYBER_ARMOR"
    public weaponName: string = "LASER_PISTOL"
    public healItemsCount: int = 2
    public enemyName: string = "NONE"
    public enemyMinAttack: int = 0
    public enemyMaxAttack: int = 0
    public enemyCurrentHealth: int = 0
    public enemyMaxHealth: int = 0
    public currentMapCell: MapCell = MapCell.generateMapCell({fromDirection: 1})
}
