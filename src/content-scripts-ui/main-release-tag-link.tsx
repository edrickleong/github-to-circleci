import { createRoot } from "react-dom/client"
import { CircleCILogo } from "@/ui/circleci-logo"

const elementId = "github-to-circleci:main-release-tag-link"

export const addMainReleaseTagLink = () => {
  const element = document.getElementById(elementId)
  if (element) return

  const anchor = document.querySelector(".Link--primary.d-flex.no-underline")
  if (!anchor) return

  const container = document.createElement("div")
  container.id = elementId
  anchor.insertAdjacentElement("afterend", container)

  const root = createRoot(container)

  const releaseTag = getReleaseTag()
  const url = getCircleCIUrl(releaseTag)

  root.render(
    <div className="BtnGroup mt-1 d-flex">
      <a
        className="btn btn-sm BtnGroup-item d-flex"
        style={{ alignItems: "center", gap: 4 }}
        href={url.toString()}
      >
        <CircleCILogo />
        {releaseTag}
      </a>
    </div>,
  )
}

function getReleaseTag() {
  return (
    document.querySelector(
      ".css-truncate.css-truncate-target.text-bold.mr-2",
    ) as HTMLElement
  ).innerText
}

function getCircleCIUrl(releaseTag: string) {
  const paths = window.location.pathname.split("/")
  const organisation = paths[1]
  const repository = paths[2]
  const url = new URL(
    `https://app.circleci.com/pipelines/github/${organisation}/${repository}`,
  )

  url.searchParams.append("tag", releaseTag)
  return url
}
