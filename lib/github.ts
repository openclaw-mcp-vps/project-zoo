import { Octokit } from "octokit";

export interface RepositoryCloneInfo {
  owner: string;
  repo: string;
  cloneUrl: string;
  defaultBranch: string;
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  userAgent: "project-zoo/1.0"
});

function parseGitHubRepository(repositoryUrl: string) {
  const match = repositoryUrl.match(
    /github\.com\/([\w.-]+)\/([\w.-]+)(?:\.git)?(?:\/.*)?$/i
  );

  if (!match?.[1] || !match[2]) {
    return null;
  }

  return {
    owner: match[1],
    repo: match[2].replace(/\.git$/i, "")
  };
}

export async function getRepositoryCloneInfo(
  repositoryUrl: string
): Promise<RepositoryCloneInfo> {
  const parsed = parseGitHubRepository(repositoryUrl);

  if (!parsed) {
    throw new Error("Invalid GitHub repository URL.");
  }

  try {
    const { data } = await octokit.request("GET /repos/{owner}/{repo}", {
      owner: parsed.owner,
      repo: parsed.repo
    });

    return {
      owner: parsed.owner,
      repo: parsed.repo,
      cloneUrl: data.clone_url,
      defaultBranch: data.default_branch
    };
  } catch {
    return {
      owner: parsed.owner,
      repo: parsed.repo,
      cloneUrl: `https://github.com/${parsed.owner}/${parsed.repo}.git`,
      defaultBranch: "main"
    };
  }
}

export function buildCloneCommand(
  cloneInfo: RepositoryCloneInfo,
  targetDirectory: string
) {
  const safeTarget = targetDirectory.replace(/[^a-z0-9-_]/gi, "-");

  if (cloneInfo.defaultBranch && cloneInfo.defaultBranch !== "main") {
    return `git clone --branch ${cloneInfo.defaultBranch} ${cloneInfo.cloneUrl} ${safeTarget}`;
  }

  return `git clone ${cloneInfo.cloneUrl} ${safeTarget}`;
}
