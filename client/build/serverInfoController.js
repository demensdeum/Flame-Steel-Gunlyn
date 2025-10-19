import { ServerInfoRequestResult } from "./serverInfoRequestResult.js";
import { Constants } from "./constants.js";
export class ServerInfoController {
    constructor(delegate) {
        this.delegate = delegate;
    }
    async fetch() {
        const url = `${Constants.apiPath}/server/info.php`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            const jsonData = await response.json();
            const result = ServerInfoRequestResult.fromJson(jsonData);
            const entries = result.entities;
            this.delegate.serverInfoControllerDidFetchInfo(this, entries);
        }
        catch (error) {
            console.error("Error fetching entries:", error);
        }
    }
}
