(() => {
    const { findByName } = vendetta.metro;
    const { after } = vendetta.patcher;
    const log = vendetta.logger;

    const pad = n => String(n).padStart(2, "0");
    function format(t) {
        if (t == null) return null;
        const d = typeof t === "string" ? new Date(t) : new Date(+t);
        if (isNaN(d.getTime())) return null;
        return `[${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}]`;
    }

    let unpatch;
    const plugin = {
        onLoad() {
            const RowManager = findByName("RowManager");
            if (!RowManager?.prototype?.generate) {
                log.error("Terminal Timestamps: couldn't find RowManager");
                return;
            }
            unpatch = after("generate", RowManager.prototype, ([data], row) => {
                try {
                    if (data?.rowType !== 1 || !row?.message) return;
                    const ts = format(data.message?.timestamp);
                    if (ts && typeof row.message.timestamp === "string") row.message.timestamp = ts;
                } catch (e) {
                    log.error("Terminal Timestamps:", e);
                }
            });
        },
        onUnload() {
            unpatch?.();
        }
    };

    // Kettu can start a plugin again without stopping the copy that's already running,
    // which doubled commands and made two copies fight. Only ever let one copy run.
    const SLOT = "terminal-timestamps";
    const live = (globalThis.__horribleKettuPlugins ??= {});
    let running = false;
    const stop = superseded => {
        if (!running) return;
        running = false;
        plugin.onUnload(superseded);
    };

    return {
        onLoad() {
            live[SLOT]?.(true);
            live[SLOT] = stop;
            running = true;
            plugin.onLoad();
        },
        onUnload() {
            if (live[SLOT] === stop) delete live[SLOT];
            stop(false);
        }
    };
})()
