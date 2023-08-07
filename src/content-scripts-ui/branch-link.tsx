import { CircleCILogo } from "@/ui/circleci-logo"
import { createRoot } from "react-dom/client"

const elementId = "github-to-circleci:branch-link"

export const addBranchLink = () => {
  const existingElement = document.getElementById(elementId)
  if (existingElement) {
    return
  }

  const anchor = document.querySelector("get-repo")
  if (!anchor) {
    return
  }

  const isOnPullRequestsTab = window.location.pathname.includes("/pull/")

  const container = document.createElement("div")
  container.id = elementId
  container.className = `BtnGroup ${
    isOnPullRequestsTab ? "flex-md-order-2" : "ml-2"
  }`
  container.setAttribute("aria-label", "Open in CircleCI")
  anchor.parentElement?.insertAdjacentElement("beforebegin", container)

  const root = createRoot(container)

  const url = getCircleCIUrl(isOnPullRequestsTab)

  root.render(
    <a
      className={`btn tooltipped tooltipped-s toltipped-multiline ${
        isOnPullRequestsTab ? "btn-sm" : ""
      }`}
      href={url}
      aria-label={`Open ${isOnPullRequestsTab ? "PR" : "main"} in CircleCI `}
    >
      <CircleCILogo style={{ verticalAlign: "text-top" }} />
    </a>,
  )
}

function getCircleCIUrl(isOnPullRequestsTab: boolean) {
  const paths = window.location.pathname.split("/")
  const organisation = paths[1]
  const repository = paths[2]
  const url = new URL(
    `https://app.circleci.com/pipelines/github/${organisation}/${repository}`,
  )

  if (isOnPullRequestsTab) {
    url.searchParams.append("branch", getCircleCIBranch())
    return url.toString()
  } else {
    return url.toString()
  }
}

function getCircleCIBranch() {
  const branchElements = document.getElementsByClassName(
    "commit-ref css-truncate user-select-contain expandable head-ref",
  )
  const headBranch = branchElements[1].textContent
  // If the head branch originates from upstream and not from a fork (ie. doesn't include ':'),
  // then CircleCI uses the head branch name
  if (headBranch && !headBranch.includes(":")) return headBranch

  // Otherwise, if the head branch originates from a fork (ie. includes ':'),
  // then CircleCI uses the pull request number
  const paths = window.location.pathname.split("/")
  return `pull/${paths[4]}`
}
