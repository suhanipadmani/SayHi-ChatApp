import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
    const { activeTab, setActiveTab } = useChatStore();

    return (
        <div className="tabs tabs-box w-full bg-transparent p-2">
        <button
            onClick={() => setActiveTab("chats")}
            className={`tab flex-1 justify-center ${
            activeTab === "chats" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"
            }`}
        >
            Chats
        </button>

        <button
            onClick={() => setActiveTab("contacts")}
            className={`tab flex-1 justify-center ${
            activeTab === "contacts" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"
            }`}
        >
            Contacts
        </button>
        </div>
    );
}
export default ActiveTabSwitch;