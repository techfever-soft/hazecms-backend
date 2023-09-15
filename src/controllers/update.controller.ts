import { Octokit } from "octokit";

export class UpdateController {
  constructor() {}

  public checkUpdates(req: any, res: any) {
    const octokit = new Octokit({});

    octokit
      .request("GET /repos/{owner}/{repo}/releases", {
        owner: "techfever-soft",
        repo: "hazecms-backend",
      })
      .then((res) => {
        console.log(res);
      });
  }

  public prepareUpdate(req: any, res: any) {}
}
