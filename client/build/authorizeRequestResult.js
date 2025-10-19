export class AuthorizeRequestResult {
    constructor(code, message, heroUUID) {
        this.code = code;
        this.message = message;
        this.heroUUID = heroUUID;
    }
    static fromJson(json) {
        const code = json.code;
        const message = json.message;
        const heroUUID = json.heroUUID;
        return new AuthorizeRequestResult(code, message, heroUUID);
    }
}
