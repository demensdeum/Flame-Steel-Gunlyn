export class ServerInfoEntry {
    constructor(id, key, value) {
        this.id = id;
        this.key = key;
        this.value = value;
    }
    static fromJson(json) {
        const id = json.id;
        const key = json.key;
        const value = json.value;
        return new ServerInfoEntry(id, key, value);
    }
}
