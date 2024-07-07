interface Command {
    onLoad(): void;    // Method to apply minor changes when loaded into the system
    execute(): void;   // Core functionality of the command that can be triggered multiple times
    onLeave(): void;   // Method to apply minor changes when removed from the active command list
}

export default Command;