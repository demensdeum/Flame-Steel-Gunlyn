export var AuthorizeControllerState;
(function (AuthorizeControllerState) {
    AuthorizeControllerState[AuthorizeControllerState["Idle"] = 0] = "Idle";
    AuthorizeControllerState[AuthorizeControllerState["Authorizing"] = 1] = "Authorizing";
    AuthorizeControllerState[AuthorizeControllerState["Authorized"] = 2] = "Authorized";
    AuthorizeControllerState[AuthorizeControllerState["Error"] = 3] = "Error";
})(AuthorizeControllerState || (AuthorizeControllerState = {}));
