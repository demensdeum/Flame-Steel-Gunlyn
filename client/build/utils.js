export class Utils {
    static showHtmlElement(args) {
        if (document.getElementsByClassName(args.name)[0].style.display != "block") {
            document.getElementsByClassName(args.name)[0].style.display = "block";
        }
    }
    static hideHtmlElement(args) {
        if (document.getElementsByClassName(args.name)[0].style.display != "none") {
            document.getElementsByClassName(args.name)[0].style.display = "none";
        }
    }
    static showHtmlFlexElement(args) {
        if (document.getElementsByClassName(args.name)[0].style.display != "flex") {
            document.getElementsByClassName(args.name)[0].style.display = "flex";
        }
    }
    static generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    static degreesToRadians(angle) {
        return angle * Math.PI / 180;
    }
    static randomInt(max) {
        return Math.floor(Math.random() * max);
    }
    static randomFloat(max) {
        return Math.random() * max;
    }
    static randomBool(factor = 50) {
        const random = Utils.randomInt(100);
        const randomBool = random < factor;
        return randomBool;
    }
    static radiansToAngle(radians) {
        return radians * 180 / 3.14;
    }
    static shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]
            ];
        }
        return array;
    }
    static isOperable(value) {
        if (value == null) {
            return false;
        }
        else if (value == undefined) {
            return false;
        }
        return true;
    }
    static isNumber(value) {
        if (this.isOperable(value) == false) {
            return false;
        }
        else {
            return isNaN(value) == false;
        }
    }
    static numberOrConstant(value, constant) {
        return this.isNumber(value) ? value : constant;
    }
    static timestamp() {
        return new Date().getTime();
    }
    static getCookieValue(cookieName) {
        var name = cookieName + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookieArray = decodedCookie.split(';');
        for (var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i].trim();
            if (cookie.indexOf(name) == 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return null;
    }
}
