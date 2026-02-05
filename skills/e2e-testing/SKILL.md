---
name: e2e-testing
description: E2E test execution skill using Playwright MCP. Performs verification after code modifications in Vite projects. When to use: (1) Include E2E tests when planning modifications in Plan mode, (2) When user requests "verify it works", "test it", "check with Playwright" after code modifications. Includes port conflict avoidance and proper data load waiting handling.
---

# E2E Testing with Playwright MCP

Skill for running E2E tests on Vite projects. Avoids typical issues like port conflicts and data load waiting.

## Workflow

### 1. Port Check and Server Startup Decision

**Default Port:** 5173

Use `scripts/check_port.sh` to check port usage status:

```bash
bash scripts/check_port.sh 5173
```

**Decision Flow:**

```
Port in use?
├─ YES → Reuse existing server
│         - Check if accessible in browser
│         - Use as-is if no issues
│         - Kill process and restart only if there are errors
│
└─ NO  → Start new server
          - Start dev server in background
```

**Server startup command:**

```bash
npm run dev &
```

After startup, wait 5-10 seconds for the server to be ready.

### 2. Test Execution with Playwright MCP

#### 2.1 Prerequisite: Loading Playwright MCP Tools

Before running tests, always load Playwright MCP tools:

```
ToolSearch: "select:mcp__playwright__browser_navigate"
```

Then, enable the necessary tools (navigate, click, screenshot, etc.).

#### 2.2 Basic Test Patterns

**Screen Display Verification:**

```
1. browser_navigate: http://localhost:5173/target-page
2. browser_wait_for:
   - selector: Data element selector (e.g., "[data-testid='content']")
   - timeout: 5000ms
3. browser_screenshot:
   - Full screen screenshot
```

**CRITICAL: Data Load Waiting**

Before taking screenshots, always execute one of the following:
- `browser_wait_for`: Wait until a specific selector is displayed
- `browser_wait_for`: Wait until networkidle state
- Fixed wait (last resort): 2-3 second sleep

**Bad example (screenshot before data load):**
```
navigate → screenshot  # NG: Data not loaded
```

**Good example (proper waiting):**
```
navigate → wait_for(selector) → screenshot  # OK
navigate → wait_for(networkidle) → screenshot  # OK
```

#### 2.3 Operation Test Patterns

**Form Input and Click:**

```
1. browser_navigate
2. browser_wait_for: Wait for form to display
3. browser_fill_form: Set input values
4. browser_click: Click submit button
5. browser_wait_for: Wait for result display
6. browser_screenshot: Verify result
```

#### 2.4 Playwright MCP Tool Usage

| Tool | Purpose | Notes |
|------|---------|-------|
| browser_navigate | Page navigation | URL format: `http://localhost:5173` |
| browser_wait_for | Wait for element display | Required before data load |
| browser_screenshot | Take screenshot | Execute after wait_for |
| browser_click | Click operation | Specify selector precisely |
| browser_fill_form | Form input | Specify by name attribute or selector |
| browser_console_messages | Check console logs | Use for error investigation |

### 3. Result Report

After test execution, report the following:

```markdown
## E2E Test Results

### Test Target
- URL: http://localhost:5173/xxx

### Execution Details
1. [Operations performed]
2. [Items verified]

### Result
- ✅ Success / ❌ Failure
- Screenshot: [path]

### Issues (if any)
- [Error content]
- [Console logs]
```

## Plan Mode Integration

When planning code modifications, plan modifications and tests together as follows:

```markdown
## Implementation Plan

### Phase 1: Feature Implementation
- [ ] Component modification
- [ ] API endpoint addition

### Phase 2: E2E Testing
- [ ] Port check and server startup
- [ ] Screen display test
- [ ] Operation flow test
- [ ] Error case test
```

## Troubleshooting

### Port Conflict Error

```
Error: Port 5173 already in use
```

**Solution:**
1. Check process using port with `scripts/check_port.sh 5173`
2. If it's a dev server, reuse it
3. If unknown process, `kill -9 <PID>` then restart

### Data Not Displayed

```
Screenshot does not show data
```

**Solution:**
1. Add `browser_wait_for`
2. Verify selector (inspect element with devtools)
3. Extend timeout (5000ms → 10000ms)

### Build Error

```
Build failed
```

**Solution:**
1. Reinstall dependencies with `npm install`
2. Check TypeScript errors

## Resources

### scripts/

- **check_port.sh**: Port usage status check script
  - Usage: `bash scripts/check_port.sh <port>`
  - Return value: exit 0 (in use), exit 1 (available)
