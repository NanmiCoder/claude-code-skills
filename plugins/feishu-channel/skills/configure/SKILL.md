---
name: feishu:configure
description: "Set up the Feishu channel — save the bot credentials and check connection status. Use when the user pastes Feishu app credentials, asks to configure Feishu, or wants to check channel status."
---

# Feishu Channel Configuration

This skill helps users configure their Feishu bot credentials for the Claude Code Feishu channel.

## What you need

To connect Claude Code with Feishu, users need to create a **Self-Built App** in the Feishu Developer Console:

1. Go to [Feishu Open Platform](https://open.feishu.cn/app) → Create App → Enterprise Self-Built App
2. Get the **App ID** and **App Secret** from "Credentials & Basic Info"
3. Enable the bot capability: "Add Capability" → "Bot"
4. Add event subscriptions (use WebSocket mode):
   - `im.message.receive_v1` — Receive messages
5. Grant permissions:
   - `im:message` — Send messages
   - `im:message:send_as_bot` — Send messages as bot
   - `im:resource` — Access message resources (images, files)
   - `im:message.reactions:write` — Add reactions
6. Publish the app version

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
   claude --dangerously-load-development-channels plugin:feishu-channel
   ```
   Or if using plugin-dir for local development:
   ```bash
   claude --plugin-dir /path/to/claude-code-skills/plugins/feishu-channel --dangerously-load-development-channels plugin:feishu-channel
   ```

## Status Check

To check if the Feishu channel is configured:
1. Check if `~/.claude/channels/feishu/.env` exists and has `FEISHU_APP_ID` set
2. Report the configuration status to the user

## Security

- NEVER log or display the App Secret
- NEVER commit credentials to git
- Store credentials only in `~/.claude/channels/feishu/.env`
