# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Claude Code Skills plugin marketplace repository. It provides custom skills that extend Claude Code's capabilities, distributed through the Claude Code plugin system.

## Development Commands

```bash
# Test plugin locally (no installation required)
claude --plugin-dir .

# Test with debug output
claude --debug --plugin-dir .

# Check Claude Code health
claude doctor

# Clear plugin cache if skills don't appear
rm -rf ~/.claude/plugins/cache
```

## Architecture

### Plugin Structure

```
.claude-plugin/marketplace.json  # Marketplace config - register new skills here
skills/<skill-name>/
├── SKILL.md                     # Required: skill definition with YAML frontmatter
├── references/                  # Optional: docs Claude reads on-demand
├── scripts/                     # Optional: executable scripts
└── assets/                      # Optional: templates and resources
```

### Skill Loading Hierarchy

1. YAML frontmatter (`name`, `description`) - always in context
2. SKILL.md body - loaded when skill triggers
3. `references/` files - Claude reads these on-demand

### Key Files

- `.claude-plugin/marketplace.json` - Plugin registry. Add new skills to the `skills` array.
- `skills/*/SKILL.md` - Skill definitions. Must start with YAML frontmatter (no blank lines before `---`).

### slides-generator Skill

The main skill generates Vite + React + Tailwind presentation projects:

- `assets/template/` - Base React project template
- `references/palettes.md` - 76 color themes
- `references/schemas/slidesData.schema.md` - Data structure for slides
- `references/examples/` - Example output formats

Generated projects require `src/data/slidesData.js` (content) and `tailwind.config.js` (theme) customization.

## Creating New Skills

1. Create `skills/<skill-name>/SKILL.md` with frontmatter:
   ```yaml
   ---
   name: skill-name
   description: What it does. Trigger keywords: "word1", "word2"
   ---
   ```

2. Add to `.claude-plugin/marketplace.json` under `plugins[0].skills`

3. Test with `claude --plugin-dir .`

Skills have no hot reload - restart Claude Code after changes.
