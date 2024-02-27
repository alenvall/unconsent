const bodyObserver = new MutationObserver(() => {
  const forbidden = [
    "onetrust",
    "sp_",
    "didomi",
    "cookie",
    "consent",
    "fides",
    "ch2",
    "termly",
    "qc-cmp2",
    "cc-banner",
  ];
  if (document.body.style.overflow === "hidden") {
    document.body.style.overflow = "unset";
  }

  document.querySelectorAll("div").forEach((div) => {
    const id = div.getAttribute("id");
    if (id && forbidden.some((f) => id.includes(f))) {
      try {
        div.parentNode.removeChild(div);
      } catch {}
      return;
    }

    const classes = div.getAttribute("class");
    if (!classes) {
      return;
    }

    if (forbidden.some((word) => classes.toLowerCase().includes(word))) {
      try {
        div.parentNode.removeChild(div);
      } catch {}
    }
  });
});

bodyObserver.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
});

setTimeout(() => {
  bodyObserver.disconnect();
}, 5000);
