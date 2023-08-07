import { addMainReleaseTagLink } from "@/content-scripts-ui/main-release-tag-link"
import { addBranchLink } from "@/content-scripts-ui/branch-link"
import { addLinksToReleasesPage } from "@/content-scripts-ui/release-page-release-tag-links"
import { addLinkToReleaseDetailPage } from "@/content-scripts-ui/release-detail-page-release-tag-link"

const observer = new MutationObserver(() => {
  addBranchLink()
  addMainReleaseTagLink()
  addLinksToReleasesPage()
  addLinkToReleaseDetailPage()
})

observer.observe(document.documentElement, {
  attributes: true,
  subtree: true,
})
