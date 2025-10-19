import { int } from "./types.js"

export class GameData {
    public currentHealth: int = 100
    public maxHealth: int = 100
    public minAttack = 2
    public maxAttack = 10
    public minArmor = 2
    public maxArmor = 10
    public armorName = "CYBER_ARMOR"
    public weaponName = "LASER_PISTOL"
    public healItemsCount = 2
    public enemyName = "CLANKER"
    public enemyMinAttack = 2
    public enemyMaxAttack = 4
    public enemyCurrentHealth = 2
    public enemyMaxHealth = 2
}
