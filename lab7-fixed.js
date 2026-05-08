(() => {
    const THEME_SELECTOR = ".theme--fixed";
    const TILE_SELECTOR = ".tile";
    const MOBILE_MAX_WIDTH = 760;

    let resizeTimer = null;

    function isMobile() {
        return window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`).matches;
    }

    function resetTilesToFlow(tiles) {
        tiles.forEach(tile => {
            tile.style.position = "";
            tile.style.left = "";
            tile.style.top = "";
            tile.style.width = "";
            tile.style.height = "";
            tile.style.margin = "";
            tile.style.zIndex = "";
        });
    }

    function applyFixedPositioning() {
        const theme = document.querySelector(THEME_SELECTOR);
        if (!theme) return;

        const tiles = Array.from(theme.querySelectorAll(TILE_SELECTOR));
        if (tiles.length === 0) return;

        // 小屏不做 fixed，避免遮挡/布局错乱（本实验主要用于演示定位方法）
        if (isMobile()) {
            resetTilesToFlow(tiles);
            tiles.forEach(tile => (tile.style.visibility = ""));
            return;
        }

        // 先回到正常流，确保 getBoundingClientRect() 反映“当前布局下”的位置与尺寸
        // 不在这里设置 visibility hidden，避免 JS 报错导致“整行不显示”
        resetTilesToFlow(tiles);

        requestAnimationFrame(() => {
            tiles.forEach(tile => {
                const rect = tile.getBoundingClientRect();

                tile.style.position = "fixed";
                tile.style.left = `${rect.left}px`;
                tile.style.top = `${rect.top}px`;
                tile.style.width = `${rect.width}px`;
                tile.style.height = `${rect.height}px`;
                tile.style.margin = "0";
                tile.style.zIndex = "10";
                tile.style.visibility = "";
            });
        });
    }

    function onReady(fn) {
        if (document.readyState !== "loading") fn();
        else document.addEventListener("DOMContentLoaded", fn, { once: true });
    }

    onReady(applyFixedPositioning);

    window.addEventListener("resize", () => {
        if (resizeTimer) window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
            applyFixedPositioning();
        }, 80);
    });
})();

