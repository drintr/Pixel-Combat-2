
Object.defineProperty(document.head, 'insertBefore', {
    value: function () {/* method is not allowed here */ },
    writable: false
});

var gameInstance = UnityLoader.instantiate("gameContainer", "/js/pixel-combat2.json", {
    onProgress: UnityProgress,
    Module: {
        onRuntimeInitialized: function () {
            UnityProgress(gameInstance, "complete")
        }
    }
});
