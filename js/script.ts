function moveAddButton(): void {
  const addBtn = document.querySelector<HTMLButtonElement>(
    ".header__action-btn--add"
  );
  const headerActions = document.querySelector<HTMLElement>(".header__actions");
  const placeholder = document.querySelector<HTMLElement>(
    ".header__mobile-add-placeholder"
  );
  if (!addBtn || !headerActions || !placeholder) return;

  if (window.innerWidth <= 760) {
    if (headerActions.contains(addBtn)) {
      placeholder.appendChild(addBtn);
      addBtn.style.width = "100%";
    }
  } else {
    if (!headerActions.contains(addBtn)) {
      headerActions.insertBefore(addBtn, headerActions.firstChild);
      addBtn.removeAttribute("style");
    }
  }
}

window.addEventListener("DOMContentLoaded", moveAddButton);
window.addEventListener("resize", moveAddButton);
