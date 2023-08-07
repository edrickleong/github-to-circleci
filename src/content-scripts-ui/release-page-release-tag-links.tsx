import { createRoot } from "react-dom/client"
import { CircleCILogo } from "@/ui/circleci-logo"

export const addLinksToReleasesPage = () => {
  if (!document.location.pathname.endsWith("releases")) return

  const anchors = Array.from(document.querySelectorAll("a.Link--primary"))
  const filteredAnchors = anchors.filter(
    (it) => it.getAttribute("href")?.includes("releases") ?? false,
  )
  for (const anchor of filteredAnchors) {
    const tag = (anchor as HTMLElement).innerText
    const elementId = `github-to-circleci:circleci-tag-${tag}`

    if (!!document.getElementById(elementId)) continue
    const container = document.createElement("div")
    container.id = elementId
    container.className = "BtnGroup mr-3"
    container.style.verticalAlign = "text-bottom"
    const secondaryButtonsGroup = anchor.parentElement
    if (!secondaryButtonsGroup) continue
    secondaryButtonsGroup.parentElement?.insertBefore(
      container,
      secondaryButtonsGroup.nextElementSibling,
    )

    const root = createRoot(container)
    const url = getCircleCILink(tag)

    root.render(
      <a
        className={`btn tooltipped tooltipped-s tooltipped-multiline BtnGroup-item`}
        style={{ display: "flex", alignItems: "center", gap: 4 }}
        href={url.toString()}
        aria-label={`Open ${tag} in CircleCI`}
      >
        <CircleCILogo style={{ verticalAlign: "text-top" }} />
      </a>,
    )
  }
}

function getCircleCILink(tag: string) {
  const paths = window.location.pathname.split("/")
  const organisation = paths[1]
  const repository = paths[2]
  const url = new URL(
    `https://app.circleci.com/pipelines/github/${organisation}/${repository}`,
  )

  url.searchParams.append("tag", tag)
  return url
}
