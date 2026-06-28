import { type Plugin, tool } from "@opencode-ai/plugin";

const DENIED_IN_PLAN = new Set(["edit", "write", "apply_patch"]);

export const ApexModePlugin: Plugin = async () => {
  let mode: "plan" | "build" = "build";

  return {
    tool: {
      set_mode: tool({
        description:
          "Switch APEX mode. 'plan' = read-only (edit/write/apply_patch blocked), 'build' = full access. Call this at every APEX phase transition.",
        args: { mode: tool.schema.enum(["plan", "build"]) },
        async execute(args) {
          mode = args.mode;
          return `✓ APEX mode switched to ${mode}`;
        },
      }),
      get_mode: tool({
        description: "Get the current APEX mode.",
        args: {},
        async execute() {
          return mode;
        },
      }),
    },
    "tool.execute.before": async (input, _output) => {
      if (mode === "plan" && DENIED_IN_PLAN.has(input.tool)) {
        throw new Error(
          `[APEX] Tool "${input.tool}" is not allowed in plan mode. Call \`set_mode({ mode: "build" })\` first to enable edits.`,
        );
      }
    },
  };
};
