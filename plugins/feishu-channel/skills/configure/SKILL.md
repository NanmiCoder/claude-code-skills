---
name: feishu:configure
description: "Set up the Feishu channel — save the bot credentials and check connection status. Use when the user pastes Feishu app credentials, asks to configure Feishu, or wants to check channel status."
---

# Feishu Channel Configuration

This skill helps users configure their Feishu bot credentials for the Claude Code Feishu channel.

## What you need

Prefer the official one-click tutorial:

1. Follow [开发一个回声机器人](https://open.feishu.cn/document/develop-an-echo-bot/introduction?from=op_develop_app)
2. Let the official flow create and publish the app
3. Open the generated app and get the **App ID** and **App Secret** from "Credentials & Basic Info"

This path is preferred because the generated bot already has enough capability, event, and permission setup for basic Claude Code channel testing.

## Configuration

When the user provides credentials, write them to `~/.claude/channels/feishu/.env`:

```
FEISHU_APP_ID=<app_id>
FEISHU_APP_SECRET=<app_secret>
```

Optional fields:
```
FEISHU_ENCRYPT_KEY=<encrypt_key>
FEISHU_VERIFICATION_TOKEN=<verification_token>
FEISHU_BRAND=feishu
```

`FEISHU_BRAND` can be `feishu` (China, default) or `lark` (International).

### Steps

1. Create the directory if it doesn't exist: `mkdir -p ~/.claude/channels/feishu`
2. Write the `.env` file with the credentials
3. Inform the user to restart Claude Code with the channel flag:
   ```bash
   claude --allow-dangerously-skip-permissions --dangerously-load-development-channels plugin:feishu-channel@claude-code-skills
   ```
   Explain that after `/plugin install feishu-channel@claude-code-skills`, reloading plugins is not enough — the user needs a full Claude Code restart.

## Status Check

To check if the Feishu channel is configured:
1. Check if `~/.claude/channels/feishu/.env` exists and has `FEISHU_APP_ID` set
2. Remind the user that Team / Enterprise orgs also need `channelsEnabled`
3. Report the configuration status to the user

## Security

- NEVER log or display the App Secret
- NEVER commit credentials to git
- Store credentials only in `~/.claude/channels/feishu/.env`
