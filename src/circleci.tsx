const filterByTag = () => {
  const params = new URLSearchParams(document.location.search)
  const tag = params.get("tag")
  if (!tag) return

  const getSeeMoreButton = () =>
    Array.from(document.querySelectorAll(".css-1u7cwjg")).find((it) =>
      (it as HTMLElement).innerText.startsWith("See more"),
    ) as HTMLButtonElement

  const isFoundTag = (pipelineElement: HTMLElement) => {
    const tagElement = pipelineElement.querySelector("[title='Tag']")
    if (!tagElement) return false

    return (
      tagElement.parentElement?.getAttribute("aria-label")?.split(" ")[0] ===
      tag
    )
  }

  const hidePipelines = () =>
    Array.from(document.querySelectorAll(".css-9bg0jz"))
      .filter((it) => !isFoundTag(it as HTMLElement))
      .forEach((it) => ((it as HTMLElement).style.display = "none"))

  const checkIfTagIsDisplayed = () =>
    Array.from(document.querySelectorAll(".css-9bg0jz")).some((it) =>
      isFoundTag(it as HTMLElement),
    )

  const findTag = () => {
    const seeMoreButton = getSeeMoreButton()
    if (seeMoreButton.disabled) {
      seeMoreButton.innerText = `See more (Finding tag ${tag} - ${
        Array.from(document.querySelectorAll(".css-9bg0jz")).length
      } pipelines scanned)`
      return
    }

    seeMoreButton.innerText = "See more"
    hidePipelines()

    const tagIsDisplayed = checkIfTagIsDisplayed()
    if (!tagIsDisplayed) seeMoreButton.click()
  }

  const observer = new MutationObserver((mutations, observer) => {
    for (const mutation of mutations) {
      if (mutation.type !== "attributes") continue
      if (mutation.attributeName !== "disabled") continue
      findTag()
    }
  })

  const checkInterval = setInterval(() => {
    const button = getSeeMoreButton()
    if (button) {
      clearInterval(checkInterval)
      observer.observe(button, { attributes: true })
      findTag()
    }
  }, 100)
}

filterByTag()
