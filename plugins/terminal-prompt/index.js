(() => {
    const { findByName, findByStoreName } = vendetta.metro;
    const { after } = vendetta.patcher;
    const { findInReactTree } = vendetta.utils;
    const log = vendetta.logger;

    const MARK = "@discord:~";
    function prompt(original) {
        const UserStore = findByStoreName("UserStore");
        const user = UserStore?.getCurrentUser?.()?.username ?? "user";
        const where = typeof original === "string" ? original.match(/[#@]\S.*$/) : null;
        return `${user}${MARK}${where ? "/" + where[0] : ""}$`;
    }

    function handler(_, ret) {
        try {
            const input = findInReactTree(ret, x => typeof x?.props?.placeholder === "string");
            if (input && !input.props.placeholder.includes(MARK)) {
                input.props.placeholder = prompt(input.props.placeholder);
            }
        } catch (e) {
            log.error("Terminal Prompt:", e);
        }
        return ret;
    }

    let unpatch;
    return {
        onLoad() {
            const ChatInput = findByName("ChatInput");
            if (ChatInput?.prototype?.render) {
                unpatch = after("render", ChatInput.prototype, handler);
                return;
            }
            const mod = findByName("ChatInput", false);
            if (mod?.default) {
                unpatch = after("default", mod, handler);
                return;
            }
            log.error("Terminal Prompt: couldn't find ChatInput");
        },
        onUnload() {
            unpatch?.();
        }
    };
})()
