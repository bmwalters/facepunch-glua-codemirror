console.log("[FPCM] page loaded")

CodeMirror.defaults.mode = "lua"
CodeMirror.defaults.lint = true
CodeMirror.defaults.lineNumbers = true
CodeMirror.defaults.theme = "monokai"
CodeMirror.defaults.gutters = ["CodeMirror-lint-markers"]

for (let pre of document.querySelectorAll("pre.bbcode_code")) {
  let container = document.createElement("div")
  container.innerHTML = `
    <div class="fpcm-nav">
      <ul>
        <li><a data-link-id="lua" href="javascript:;" class="nav-link active">Lua</a></li>
        <li><a data-link-id="repl" href="javascript:;" class="nav-link">Run</a></li>
      </ul>
    </div>
    <div class="fpcm-output">
      <div data-box-id="lua" class="code-box active"></div>
      <div data-box-id="repl" class="code-box"></div>
    </div>
  `

  let activeLink = container.querySelector(".nav-link.active")
  let activeCodeBox = container.querySelector(".code-box.active")

  let navLinkClicked = function(e) {
    if (activeLink) {
      activeLink.classList.remove("active")
    }

    e.target.classList.add("active")

    activeLink = e.target

    let codeBox = container.querySelector(`[data-box-id=${activeLink.dataset.linkId}]`)

    if (activeCodeBox) {
      activeCodeBox.classList.remove("active")
    }

    if (codeBox) {
      codeBox.classList.add("active")

      let codeMirror = codeBox.querySelector(".CodeMirror")
      if (codeMirror && codeMirror.CodeMirror) {
        codeMirror.CodeMirror.refresh()
      }
    }

    activeCodeBox = codeBox
  }

  for (let navLink of container.querySelectorAll(".nav-link")) {
    navLink.addEventListener("click", navLinkClicked)
  }

  CodeMirror(container.querySelector(".code-box[data-box-id='lua']"), {
    value: pre.innerText
  })

  CodeMirror(container.querySelector(".code-box[data-box-id='repl']"), {
    value: "-- TODO"
  })

  pre.parentElement.replaceChild(container, pre)
}