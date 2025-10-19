import { ServerInfoEntry } from "./serverInfoEntry.js";
export class ServerInfoRequestResult {
    constructor(code, message, entities) {
        this.code = code;
        this.message = message;
        this.entities = entities;
    }
    static fromJson(json) {
        const code = json.code;
        const message = json.message;
        const entries = json.entities.map((data) => ServerInfoEntry.fromJson(data));
        return new ServerInfoRequestResult(code, message, entries);
    }
}
