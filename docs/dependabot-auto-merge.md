# Dependabot Auto-Merge Setup

This repository is configured to automatically approve and enable auto-merge for Dependabot pull requests that contain only minor or patch version updates.

## How it works

The workflow `.github/workflows/dependabot-auto-merge.yml` will:

1. **Automatically approve** Dependabot PRs with minor/patch updates
2. **Enable auto-merge** with squash merge strategy
3. **Add a comment** explaining the auto-merge status
4. **Skip major updates** (requires manual review)

## Required Repository Settings

For auto-merge to work properly, ensure the following settings are configured in your GitHub repository:

### 1. Branch Protection Rules

Go to **Settings > Branches** and configure protection rules for your default branch:

- ✅ **Require a pull request before merging**
  - ✅ Require approvals: 1
  - ✅ Dismiss stale reviews when new commits are pushed
- ✅ **Require status checks to pass before merging**
  - Add your CI/CD workflow names (e.g., `ci`, `test`, `build`)
- ✅ **Require branches to be up to date before merging**
- ✅ **Allow auto-merge**

### 2. Auto-merge Settings

In **Settings > General > Pull Requests**:

- ✅ **Allow auto-merge**
- ✅ **Allow squash merging** (recommended)
- ✅ **Automatically delete head branches**

### 3. Dependabot Settings

In **Settings > Security > Dependabot**:

- ✅ **Dependabot alerts** enabled
- ✅ **Dependabot security updates** enabled
- ✅ **Dependabot version updates** enabled

## Update Types Handled

| Update Type    | Action                       | Description                        |
| -------------- | ---------------------------- | ---------------------------------- |
| `semver-patch` | ✅ Auto-approve & Auto-merge | Bug fixes, security patches        |
| `semver-minor` | ✅ Auto-approve & Auto-merge | New features (backward compatible) |
| `semver-major` | ❌ Manual review required    | Breaking changes                   |

## Security Considerations

- Only minor and patch updates are auto-merged to minimize risk
- Major updates always require manual review
- The workflow uses `pull_request_target` with limited permissions
- All status checks must pass before auto-merge occurs

## Disabling Auto-merge

If you need to review a PR manually, you can disable auto-merge:

```bash
gh pr merge --disable-auto <PR_NUMBER>
```

Or use the GitHub web interface to disable auto-merge on the PR.

## Troubleshooting

If auto-merge isn't working:

1. Check that branch protection rules allow auto-merge
2. Verify all required status checks are passing
3. Ensure the repository has auto-merge enabled in settings
4. Check that the Dependabot PR is for minor/patch updates only
