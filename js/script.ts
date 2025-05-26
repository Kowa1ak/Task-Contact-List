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

const sidebarAddBtn =
  document.querySelector<HTMLButtonElement>(".sidebar__btn--add");
const sidebarList = document.querySelector<HTMLElement>(".sidebar__list");
const sidebarSaveBtn = document.querySelector<HTMLButtonElement>(
  ".sidebar:not(.contact-sidebar) .sidebar__btn--save"
);

if (sidebarAddBtn && sidebarList) {
  sidebarAddBtn.addEventListener("click", () => {
    const inputs = sidebarList.querySelectorAll<HTMLInputElement>(
      ".sidebar__item-input"
    );
    const lastInput = inputs[inputs.length - 1];
    if (lastInput && lastInput.value.trim() === "") {
      return;
    }
    const itemDiv = document.createElement("div");
    itemDiv.className = "sidebar__item";
    const input = document.createElement("input");
    input.type = "text";
    input.className = "sidebar__item-name";
    input.placeholder = "Введите название";
    const removeBtn = document.createElement("button");
    removeBtn.className = "sidebar__item-remove";
    const img = document.createElement("img");
    img.src = "images/trash.png";
    img.alt = "Удалить группу";
    removeBtn.appendChild(img);
    removeBtn.addEventListener("click", () => {
      itemDiv.remove();
    });
    itemDiv.append(input, removeBtn);
    sidebarList.appendChild(itemDiv);
  });
}

const groupHeaders = document.querySelectorAll<HTMLElement>(".group__header");
groupHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const group = header.closest(".group");
    if (group) {
      group.classList.toggle("open");
    }
  });
});

const addContactBtn = document.querySelector<HTMLButtonElement>(
  ".header__action-btn--add"
);
const contactSidebar = document.querySelector<HTMLElement>(".contact-sidebar");
const contactCloseBtn = document.querySelector<HTMLElement>(
  ".contact-sidebar .sidebar__close"
);

addContactBtn?.addEventListener("click", () => openContactSidebar("add"));

contactCloseBtn?.addEventListener("click", () => {
  contactSidebar?.classList.remove("open");
  overlay?.classList.remove("open");
});

overlay?.addEventListener("click", () => {
  sidebar?.classList.remove("open");
  contactSidebar?.classList.remove("open");
  overlay?.classList.remove("open");
});

const customDropdowns =
  document.querySelectorAll<HTMLElement>(".custom-dropdown");
customDropdowns.forEach((dropdown) => {
  const selected = dropdown.querySelector<HTMLElement>(
    ".custom-dropdown__selected"
  );
  const list = dropdown.querySelector<HTMLElement>(".custom-dropdown__list");
  const items = dropdown.querySelectorAll<HTMLElement>(
    ".custom-dropdown__item"
  );
  if (!selected || !list) return;
  selected.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("open");
  });
  items.forEach((item) => {
    item.addEventListener("click", () => {
      const textSpan = selected.querySelector<HTMLElement>(
        ".custom-dropdown__text"
      );
      if (textSpan) textSpan.textContent = item.textContent || "";
      selected.classList.remove("placeholder");
      dropdown.classList.remove("open");
    });
  });
});
document.addEventListener("click", () => {
  customDropdowns.forEach((dd) => dd.classList.remove("open"));
});

document.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.querySelector<HTMLInputElement>(
    'input[placeholder="Введите номер"]'
  );
  if (phoneInput && (window as any).IMask) {
    (window as any).IMask(phoneInput, {
      mask: "+{7} (000) 000-00-00",
    });
  }
});

const saveContactBtn = document.querySelector<HTMLButtonElement>(
  ".contact-sidebar .sidebar__btn--save"
);
if (saveContactBtn) {
  saveContactBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let valid = true;

    const fioInput = document.querySelector<HTMLInputElement>(
      'input[placeholder="Введите ФИО"]'
    );
    const fioError = document.querySelector<HTMLDivElement>(
      '.error-message[data-for="fio"]'
    );
    if (!fioInput || fioInput.value.trim() === "") {
      fioInput?.classList.add("invalid");
      if (fioError) fioError.textContent = "Поле является обязательным";
      valid = false;
    } else {
      fioInput.classList.remove("invalid");
      if (fioError) fioError.textContent = "";
    }
    const phoneInput = document.querySelector<HTMLInputElement>(
      'input[placeholder="Введите номер"]'
    );
    const phoneError = document.querySelector<HTMLDivElement>(
      '.error-message[data-for="phone"]'
    );
    if (!phoneInput || phoneInput.value.trim() === "") {
      phoneInput?.classList.add("invalid");
      if (phoneError) phoneError.textContent = "Поле является обязательным";
      valid = false;
    } else {
      phoneInput.classList.remove("invalid");
      if (phoneError) phoneError.textContent = "";
    }
    const dropdown = document.querySelector<HTMLDivElement>(
      ".contact-sidebar .custom-dropdown"
    );
    const groupError = document.querySelector<HTMLDivElement>(
      '.contact-sidebar .error-message[data-for="group"]'
    );
    const selectedText = dropdown?.querySelector<HTMLElement>(
      ".custom-dropdown__text"
    );
    if (!selectedText || selectedText.classList.contains("placeholder")) {
      dropdown?.classList.add("invalid");
      if (groupError) groupError.textContent = "Поле является обязательным";
      valid = false;
    } else {
      dropdown?.classList.remove("invalid");
      if (groupError) groupError.textContent = "";
    }
    if (!valid) return;
  });
}

const inputs = document.querySelectorAll<HTMLInputElement>(
  ".sidebar__item-input"
);
inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.classList.remove("invalid");
    const err = document.querySelector<HTMLDivElement>(
      `.error-message[data-for="${
        input.placeholder.includes("ФИО") ? "fio" : "phone"
      }"]`
    );
    if (err) err.textContent = "";
  });
});
const dropdownEl = document.querySelector<HTMLDivElement>(".custom-dropdown");
if (dropdownEl) {
  dropdownEl.addEventListener("click", () => {
    dropdownEl.classList.remove("invalid");
    const err = document.querySelector<HTMLDivElement>(
      '.error-message[data-for="group"]'
    );
    if (err) err.textContent = "";
  });
}

class Contact {
  constructor(public id: string, public name: string, public phone: string) {}
}

interface Group {
  id: string;
  name: string;
  contacts: Contact[];
}

class GroupStorage {
  static getGroups(): Group[] {
    return JSON.parse(localStorage.getItem("groups") || "[]");
  }
  static saveGroups(groups: Group[]): void {
    localStorage.setItem("groups", JSON.stringify(groups));
  }
  static removeGroup(id: string): void {
    const groups = this.getGroups().filter((g) => g.id !== id);
    this.saveGroups(groups);
  }
}

function populateGroupDropdown(): void {
  const dropdown = document.querySelector<HTMLDivElement>(
    ".contact-sidebar .custom-dropdown"
  );
  if (!dropdown) return;
  const selected = dropdown.querySelector<HTMLElement>(
    ".custom-dropdown__selected"
  );
  const list = dropdown.querySelector<HTMLElement>(".custom-dropdown__list");
  if (!selected || !list) return;
  list.innerHTML = "";
  GroupStorage.getGroups().forEach((g) => {
    const li = document.createElement("li");
    li.className = "custom-dropdown__item";
    li.textContent = g.name;
    li.dataset.id = g.id;
    li.addEventListener("click", () => {
      const textSpan = selected.querySelector<HTMLElement>(
        ".custom-dropdown__text"
      );
      if (textSpan) textSpan.textContent = g.name;
      dropdown.dataset.selectedId = g.id;
      dropdown.classList.remove("open");
      selected.classList.remove("placeholder");
    });
    list.appendChild(li);
  });
}

let deletingGroupId: string | null = null;

let editingGroupId: string | null = null;
let editingContactId: string | null = null;

function openContactSidebar(
  mode: "add" | "edit",
  groupId?: string,
  contactId?: string
): void {
  editingGroupId = mode === "edit" ? groupId! : null;
  editingContactId = mode === "edit" ? contactId! : null;

  const title = contactSidebar?.querySelector<HTMLElement>(".sidebar__title");
  title!.textContent =
    mode === "edit" ? "Редактирование контакта" : "Добавление контакта";

  const fioInput = document.querySelector<HTMLInputElement>(
    'input[placeholder="Введите ФИО"]'
  )!;
  const phoneInput = document.querySelector<HTMLInputElement>(
    'input[placeholder="Введите номер"]'
  )!;
  const dropdownEl =
    document.querySelector<HTMLDivElement>(".custom-dropdown")!;

  populateGroupDropdown();
  if (mode === "edit") {
    const groups = GroupStorage.getGroups();
    const grp = groups.find((g) => g.id === groupId);
    const cnt = grp?.contacts.find((c) => c.id === contactId);
    fioInput.value = cnt?.name || "";
    phoneInput.value = cnt?.phone || "";
    dropdownEl.dataset.selectedId = grp!.id;
    const txt = dropdownEl.querySelector<HTMLElement>(
      ".custom-dropdown__text"
    )!;
    txt.textContent = grp!.name;
    dropdownEl
      .querySelector(".custom-dropdown__selected")!
      .classList.remove("placeholder");
  } else {
    fioInput.value = "";
    phoneInput.value = "";
    dropdownEl.dataset.selectedId = "";
    const txt = dropdownEl.querySelector<HTMLElement>(
      ".custom-dropdown__text"
    )!;
    txt.textContent = "Выберите группу";
    dropdownEl
      .querySelector(".custom-dropdown__selected")!
      .classList.add("placeholder");
  }

  contactSidebar?.classList.add("open");
  overlay?.classList.add("open");
}

function renderGroups(): void {
  const groups = GroupStorage.getGroups();
  const mainContainer = document.querySelector<HTMLElement>(".main .groups");
  if (groups.length === 0 && mainContainer) {
    mainContainer.innerHTML =
      '<div class="main__empty full">Список контактов пуст</div>';
    return;
  }
  const sidebarListEl = document.querySelector<HTMLElement>(
    ".sidebar:not(.contact-sidebar) .sidebar__list"
  );
  if (sidebarListEl) {
    sidebarListEl.innerHTML = "";
    groups.forEach((g) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "sidebar__item";
      const nameSpan = document.createElement("span");
      nameSpan.className = "sidebar__item-name";
      nameSpan.textContent = g.name;
      const removeBtn = document.createElement("button");
      removeBtn.className = "sidebar__item-remove";
      const img = document.createElement("img");
      img.src = "images/trash.png";
      img.alt = "Удалить группу";
      removeBtn.appendChild(img);
      removeBtn.addEventListener("click", () => {
        deletingGroupId = g.id;
        sidebar?.classList.remove("open");
        overlay?.classList.remove("open");
        modalOverlay?.classList.add("open");
        modal?.classList.add("open");
      });
      itemDiv.append(nameSpan, removeBtn);
      sidebarListEl.appendChild(itemDiv);
    });
  }
  const mainGroupsContainer =
    document.querySelector<HTMLElement>(".main .groups");
  if (mainGroupsContainer) {
    mainGroupsContainer.innerHTML = "";
    groups.forEach((g) => {
      const groupDiv = document.createElement("div");
      groupDiv.className = "group";
      const header = document.createElement("button");
      header.className = "group__header";
      header.innerHTML = `<span class="group__title">${g.name}</span>
        <img class="group__icon" src="images/down_arrow.png" alt="Toggle">`;
      header.addEventListener("click", () => groupDiv.classList.toggle("open"));
      const list = document.createElement("div");
      list.className = "group__list";

      if (g.contacts.length === 0) {
        const empty = document.createElement("div");
        empty.className = "main__empty";
        empty.textContent = "Контактов нет";
        list.appendChild(empty);
        groupDiv.classList.add("no-contacts");
      } else {
        g.contacts.forEach((c) => {
          const item = document.createElement("div");
          item.className = "group__item";
          item.innerHTML = `
            <span class="group__name">${c.name}</span>
            <span class="group__phone">${c.phone}</span>
            <div class="group__actions">
              <button class="group__btn group__btn--edit">
                <img src="images/pen_gray.png" alt="Редактировать" />
              </button>
              <button class="group__btn group__btn--remove">
                <img src="images/trash.png" alt="Удалить" />
              </button>
            </div>`;
          item
            .querySelector<HTMLButtonElement>(".group__btn--remove")
            ?.addEventListener("click", () => {
              const groups = GroupStorage.getGroups();
              const grp = groups.find((gg) => gg.id === g.id)!;
              grp.contacts = grp.contacts.filter((cc) => cc.id !== c.id);
              GroupStorage.saveGroups(groups);
              renderGroups();
              showToast("Контакт успешно удалён", "success");
            });
          item
            .querySelector<HTMLButtonElement>(".group__btn--edit")
            ?.addEventListener("click", () =>
              openContactSidebar("edit", g.id, c.id)
            );
          list.appendChild(item);
        });
      }

      groupDiv.append(header, list);
      mainGroupsContainer.appendChild(groupDiv);
    });
  }
}

modalConfirm?.addEventListener("click", () => {
  if (deletingGroupId) {
    GroupStorage.removeGroup(deletingGroupId);
    renderGroups();
    deletingGroupId = null;
  }
  modalOverlay?.classList.remove("open");
  modal?.classList.remove("open");
});

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("groups")) {
    GroupStorage.saveGroups([
      { id: Date.now().toString(), name: "Друзья", contacts: [] },
      { id: (Date.now() + 1).toString(), name: "Коллеги", contacts: [] },
    ]);
  }
  renderGroups();
  populateGroupDropdown();
});

let toastContainer: HTMLElement | null = null;
function initToastContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.append(toastContainer);
  }
}

function showToast(message: string, type: "success" | "error") {
  initToastContainer();
  const toast = document.createElement("div");
  toast.className = "toast";
  const icon = document.createElement("img");
  icon.className = "toast__icon";
  icon.src = type === "success" ? "images/right.png" : "images/error.png";
  const text = document.createElement("span");
  text.className = "toast__text";
  text.textContent = message;
  toast.append(icon, text);
  toastContainer!.append(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

sidebarSaveBtn?.addEventListener("click", (e: Event) => {
  e.preventDefault();
  const sidebarListEl = document.querySelector<HTMLElement>(
    ".sidebar:not(.contact-sidebar) .sidebar__list"
  );
  const inputs =
    sidebarListEl?.querySelectorAll<HTMLInputElement>(
      "input.sidebar__item-name"
    ) || [];

  const existingGroups = GroupStorage.getGroups();
  for (const input of inputs) {
    const nameVal = input.value.trim();
    if (nameVal && existingGroups.some((g) => g.name === nameVal)) {
      showToast("Группа с таким именем уже существует", "error");
      return;
    }
  }

  inputs.forEach((input) => {
    const nameVal = input.value.trim();
    if (nameVal) {
      existingGroups.push({
        id: Date.now().toString(),
        name: nameVal,
        contacts: [],
      });
    }
  });
  GroupStorage.saveGroups(existingGroups);
  renderGroups();
  populateGroupDropdown();
  sidebar?.classList.remove("open");
  overlay?.classList.remove("open");
  showToast("Группа успешно сохранена", "success");
});

modalConfirm?.addEventListener("click", () => {
  if (deletingGroupId) {
    GroupStorage.removeGroup(deletingGroupId);
    renderGroups();
    deletingGroupId = null;
  }
  modalOverlay?.classList.remove("open");
  modal?.classList.remove("open");
  showToast("Группа и все контакты удалены", "success");
});

saveContactBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  const wasEditing = !!editingContactId;
  let valid = true;
  const fioInput = document.querySelector<HTMLInputElement>(
    'input[placeholder="Введите ФИО"]'
  );
  const fioError = document.querySelector<HTMLDivElement>(
    '.error-message[data-for="fio"]'
  );
  if (!fioInput || fioInput.value.trim() === "") {
    fioInput?.classList.add("invalid");
    if (fioError) fioError.textContent = "Поле является обязательным";
    valid = false;
  } else {
    fioInput.classList.remove("invalid");
    if (fioError) fioError.textContent = "";
  }
  const phoneInput = document.querySelector<HTMLInputElement>(
    'input[placeholder="Введите номер"]'
  )!;
  const phoneError = document.querySelector<HTMLDivElement>(
    '.error-message[data-for="phone"]'
  )!;
  const phoneValue = phoneInput.value.trim();
  if (!phoneValue) {
    phoneInput.classList.add("invalid");
    phoneError.textContent = "Поле является обязательным";
    valid = false;
  } else {
    const digits = phoneValue.replace(/\D/g, "");
    if (digits.length !== 11) {
      phoneInput.classList.add("invalid");
      phoneError.textContent = "Введите полный номер";
      valid = false;
    } else {
      phoneInput.classList.remove("invalid");
      phoneError.textContent = "";
    }
  }
  const dropdown = document.querySelector<HTMLDivElement>(
    ".contact-sidebar .custom-dropdown"
  );
  const groupError = document.querySelector<HTMLDivElement>(
    '.contact-sidebar .error-message[data-for="group"]'
  );
  const selectedText = dropdown?.querySelector<HTMLElement>(
    ".custom-dropdown__text"
  );
  if (!selectedText || selectedText.classList.contains("placeholder")) {
    dropdown?.classList.add("invalid");
    if (groupError) groupError.textContent = "Поле является обязательным";
    valid = false;
  } else {
    dropdown?.classList.remove("invalid");
    if (groupError) groupError.textContent = "";
  }
  if (!valid) return;

  const phoneVal = phoneInput.value.trim();
  const groupList = GroupStorage.getGroups();
  for (const grp of groupList) {
    for (const contact of grp.contacts) {
      if (contact.phone === phoneVal && contact.id !== editingContactId) {
        showToast("Контакт с таким номером уже существует", "error");
        return;
      }
    }
  }

  const newGroupId = dropdown!.dataset.selectedId!;
  const allGroups = GroupStorage.getGroups();
  if (editingContactId && editingGroupId) {
    const oldGroup = allGroups.find((g) => g.id === editingGroupId)!;
    const idx = oldGroup.contacts.findIndex((c) => c.id === editingContactId);
    const contact = oldGroup.contacts.splice(idx, 1)[0];
    contact.name = fioInput!.value.trim();
    contact.phone = phoneInput!.value.trim();
    const targetGroup = allGroups.find((g) => g.id === newGroupId)!;
    targetGroup.contacts.push(contact);
  } else {
    const targetGroup = allGroups.find((g) => g.id === newGroupId)!;
    // В добавлении нового контакта используем класс Contact
    targetGroup.contacts.push(
      new Contact(
        Date.now().toString(),
        fioInput!.value.trim(),
        phoneInput!.value.trim()
      )
    );
  }
  GroupStorage.saveGroups(allGroups);
  renderGroups();
  populateGroupDropdown();

  editingContactId = null;
  editingGroupId = null;

  const title = contactSidebar?.querySelector<HTMLElement>(".sidebar__title");
  title!.textContent = "Добавление контакта";

  contactSidebar?.classList.remove("open");
  overlay?.classList.remove("open");
  fioInput!.value = "";
  phoneInput!.value = "";
  const textSpan = dropdown!.querySelector<HTMLElement>(
    ".custom-dropdown__text"
  )!;
  textSpan.textContent = "Выберите группу";
  dropdown!.dataset.selectedId = "";
  dropdown!.classList.add("placeholder");

  const msg = wasEditing ? "Контакт успешно изменён" : "Контакт успешно создан";
  showToast(msg, "success");
});
