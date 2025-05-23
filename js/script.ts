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

const groupsBtn = document.querySelector<HTMLButtonElement>(
  ".header__action-btn--groups"
);
const sidebar = document.querySelector<HTMLElement>(".sidebar");
const overlay = document.querySelector<HTMLElement>(".sidebar-overlay");
const closeBtn = document.querySelector<HTMLButtonElement>(".sidebar__close");

groupsBtn?.addEventListener("click", () => {
  sidebar?.classList.add("open");
  overlay?.classList.add("open");
});

closeBtn?.addEventListener("click", () => {
  sidebar?.classList.remove("open");
  overlay?.classList.remove("open");
});

overlay?.addEventListener("click", () => {
  sidebar?.classList.remove("open");
  overlay?.classList.remove("open");
});

const modal = document.querySelector<HTMLElement>(".modal");
const modalOverlay = document.querySelector<HTMLElement>(".modal-overlay");
const modalClose = document.querySelector<HTMLButtonElement>(".modal__close");
const modalCancel = document.querySelector<HTMLButtonElement>(
  ".modal__btn--cancel"
);
const modalConfirm = document.querySelector<HTMLButtonElement>(
  ".modal__btn--confirm"
);
const groupRemoveBtns = document.querySelectorAll<HTMLButtonElement>(
  ".sidebar__item-remove"
);

groupRemoveBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    sidebar?.classList.remove("open");
    overlay?.classList.remove("open");
    modalOverlay?.classList.add("open");
    modal?.classList.add("open");
  });
});

const closeModal = () => {
  overlay?.classList.remove("open");
  modalOverlay?.classList.remove("open");
  modal?.classList.remove("open");
};

modalClose?.addEventListener("click", closeModal);
modalCancel?.addEventListener("click", closeModal);
modalOverlay?.addEventListener("click", closeModal);

modalConfirm?.addEventListener("click", closeModal);
