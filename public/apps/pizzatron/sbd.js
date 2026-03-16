/**
 * Pizzatron 3000 - SBD Shim
 * Provides the necessary 'app' and 'device' objects for the game.
 */

window.app = {
    _state: "Loading",
    _onLoadCallbacks: [],
    _mainLoopCallbacks: [],
    
    onLoad: function(callback) {
        if (document.readyState === "complete" || document.readyState === "interactive") {
            setTimeout(callback, 0);
        } else {
            this._onLoadCallbacks.push(callback);
        }
    },
    
    setState: function(state) {
        this._state = state;
        console.log("[Pizzatron] State set to:", state);
    },
    
    currentState: function() {
        return this._state;
    },
    
    mainLoop: function(callback, options) {
        const fps = (options && options.fps) ? options.fps : 60;
        setInterval(callback, 1000 / fps);
    }
};

window.device = {
    randomNum: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};

window.include = function(path) {
    const script = document.createElement('script');
    // Main.js calls include("Include/Scripts/Game")
    script.src = path + ".js";
    document.head.appendChild(script);
};

// Helper for jQuery-like functionality if needed, but we'll load real jQuery.
window.testMobile = function() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Handle onload
window.addEventListener('load', function() {
    window.app._onLoadCallbacks.forEach(cb => cb());
});

// Polyfill endsWith for older browsers if needed
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(search, this_len) {
        if (this_len === undefined || this_len > this.length) {
            this_len = this.length;
        }
        return this.substring(this_len - search.length, this_len) === search;
    };
}

// Polyfill roundTo
Number.prototype.roundTo = function(n) {
    return Math.round(this / n) * n;
};
