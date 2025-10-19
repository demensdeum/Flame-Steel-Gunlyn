export class GameUtils {
    static gotoWiki(args) {
        const url = args.locale == "ru" ? "https://demensdeum.com/masonry-ar-wiki-ru/" : "https://demensdeum.com/masonry-ar-wiki-en/";
        window.location.assign(url);
    }
}
