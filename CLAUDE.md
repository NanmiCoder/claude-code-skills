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

### Marketplace Structure

This repository follows the official Claude Code plugin marketplace structure:

```
.claude-plugin/
└── marketplace.json              # Marketplace config - lists all available plugins

plugins/
├── <plugin-name>/
│   ├── .claude-plugin/
│   │   └── plugin.json          # Plugin manifest with metadata
│   └── skills/
│       └── <skill-name>/
│           ├── SKILL.md         # Required: skill definition with YAML frontmatter
│           ├── references/      # Optional: docs Claude reads on-demand
│           ├── scripts/         # Optional: executable scripts
│           └── assets/          # Optional: templates and resources
```

### Current Plugins

**1. slides-generator** - Generate interactive presentation slides
- Vite + React + Tailwind presentation projects
- `assets/template/` - Base React project template
- `references/palettes.md` - 76 color themes
- `references/schemas/slidesData.schema.md` - Data structure for slides
- `references/examples/` - Example output formats

**2. langchain-use** - LangChain 1.0 usage guide
- Agent, Tool, Memory, Middleware concepts
- Quick reference for LangChain integration
- Python-based LLM application development

### Skill Loading Hierarchy

1. YAML frontmatter (`name`, `description`) - always in context
2. SKILL.md body - loaded when skill triggers
3. `references/` files - Claude reads these on-demand

## Creating New Plugins

1. Create plugin directory structure:
   ```bash
   mkdir -p plugins/<plugin-name>/.claude-plugin
   mkdir -p plugins/<plugin-name>/skills/<skill-name>
   ```

2. Create `plugins/<plugin-name>/.claude-plugin/plugin.json`:
   ```json
   {
     "name": "plugin-name",
     "description": "What it does",
     "version": "1.0.0",
     "author": { "name": "Your Name" }
   }
   ```

3. Create `plugins/<plugin-name>/skills/<skill-name>/SKILL.md` with frontmatter:
   ```yaml
   ---
   name: skill-name
   description: What it does. Trigger keywords: "word1", "word2"
   ---
   ```

4. Add to `.claude-plugin/marketplace.json` under `plugins` array:
   ```json
   {
     "name": "plugin-name",
     "source": "./plugins/plugin-name",
     "description": "What it does",
     "version": "1.0.0"
   }
   ```

5. Test with `claude --plugin-dir .`

Plugins have no hot reload - restart Claude Code after changes.
