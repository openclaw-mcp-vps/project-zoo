import { Octokit } from "octokit";

export interface RepositorySnapshot {
  owner: string;
  repo: string;
  stars: number;
  forks: number;
  defaultBranch: string;
  description: string | null;
  htmlUrl: string;
}

interface RepoCoordinates {
  owner: string;
  repo: string;
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

export function parseGitHubRepository(repoUrl: string): RepoCoordinates | null {
  try {
    const parsed = new URL(repoUrl);

    if (parsed.hostname !== "github.com") {
      return null;
    }

    const parts = parsed.pathname.replace(/^\//, "").split("/").filter(Boolean);

    if (parts.length < 2) {
      return null;
    }

    return {
      owner: parts[0],
      repo: parts[1].replace(/\.git$/, "")
    };
  } catch {
    return null;
  }
}

export function buildCloneCommand(repoUrl: string, targetDirectory?: string): string {
  const destination = targetDirectory ? ` ${targetDirectory}` : "";
  return `git clone ${repoUrl}${destination}`;
}

export async function getRepositorySnapshot(repoUrl: string): Promise<RepositorySnapshot | null> {
  const coordinates = parseGitHubRepository(repoUrl);

  if (!coordinates) {
    return null;
  }

  try {
    const { data } = await octokit.request("GET /repos/{owner}/{repo}", {
      owner: coordinates.owner,
      repo: coordinates.repo
    });

    return {
      owner: coordinates.owner,
      repo: coordinates.repo,
      stars: data.stargazers_count,
      forks: data.forks_count,
      defaultBranch: data.default_branch,
      description: data.description,
      htmlUrl: data.html_url
    };
  } catch {
    return null;
  }
}
