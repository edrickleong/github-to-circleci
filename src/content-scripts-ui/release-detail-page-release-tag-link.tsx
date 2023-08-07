import { createRoot } from "react-dom/client"
import { CircleCILogo } from "@/ui/circleci-logo"

const elementId = "github-to-circleci:release-detail-page-release-tag-link"

export const addLinkToReleaseDetailPage = () => {
  const existingElement = document.getElementById(elementId)
  if (existingElement) return

  const anchor = document.querySelector("summary.btn-sm.btn.text-left")
    ?.parentElement

  const container = document.createElement("div")
  container.id = elementId
  anchor?.insertAdjacentElement("beforebegin", container)

  const root = createRoot(container)

  const tag = (document.querySelector("h1.d-inline.mr-3") as HTMLElement)
    .innerText
  const paths = window.location.pathname.split("/")
  const organisation = paths[1]
  const repository = paths[2]
  const url = new URL(
    `https://app.circleci.com/pipelines/github/${organisation}/${repository}`,
  )

  url.searchParams.append("tag", tag)

  root.render(
    <div className={`BtnGroup mr-2`}>
      <a
        className={`btn btn-sm tooltipped tooltipped-s toltipped-multiline BtnGroup-item`}
        href={url.toString()}
        aria-label={`Open ${tag} in CircleCI`}
      >
        <CircleCILogo style={{ verticalAlign: "text-top" }} />
      </a>
    </div>,
  )
}
