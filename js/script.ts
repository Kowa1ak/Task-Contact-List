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

// Добавление новой группы через инпут
const sidebarAddBtn =
  document.querySelector<HTMLButtonElement>(".sidebar__btn--add");
const sidebarList = document.querySelector<HTMLElement>(".sidebar__list");
if (sidebarAddBtn && sidebarList) {
  sidebarAddBtn.addEventListener("click", () => {
    // проверяем последний инпут на непустое значение
    const inputs = sidebarList.querySelectorAll<HTMLInputElement>(
      ".sidebar__item-input"
    );
    const lastInput = inputs[inputs.length - 1];
    if (lastInput && lastInput.value.trim() === "") {
      return; // не добавляем пока пусто
    }
    // создаём новый элемент списка с инпутом
    const itemDiv = document.createElement("div");
    itemDiv.className = "sidebar__item";
    const input = document.createElement("input");
    input.type = "text";
    input.className = "sidebar__item-name";
    input.placeholder = "Введите название";
    // кнопка удаления
    const removeBtn = document.createElement("button");
    removeBtn.className = "sidebar__item-remove";
    const img = document.createElement("img");
    img.src = "images/trash.png";
    img.alt = "Удалить группу";
    removeBtn.appendChild(img);
    // добавляем обработчик удаления для нового элемента
    removeBtn.addEventListener("click", () => {
      itemDiv.remove();
    });
    // вставляем в DOM
    itemDiv.append(input, removeBtn);
    sidebarList.appendChild(itemDiv);
  });
}

// Toggle групп на главном экране
const groupHeaders = document.querySelectorAll<HTMLElement>(".group__header");
groupHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const group = header.closest(".group");
    if (group) {
      group.classList.toggle("open");
    }
  });
});

// Добавить контакт: открытие contact-sidebar
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

// Закрытие по клику вне панели для форм и групп
overlay?.addEventListener("click", () => {
  sidebar?.classList.remove("open");
  contactSidebar?.classList.remove("open");
  overlay?.classList.remove("open");
});

// Custom dropdown logic for contact sidebar
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
      // обновляем только текст, сохраняя иконку
      const textSpan = selected.querySelector<HTMLElement>(
        ".custom-dropdown__text"
      );
      if (textSpan) textSpan.textContent = item.textContent || "";
      selected.classList.remove("placeholder");
      dropdown.classList.remove("open");
    });
  });
});
// Close dropdown when clicking outside
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

// Валидация полей добавления контакта
const saveContactBtn = document.querySelector<HTMLButtonElement>(
  ".contact-sidebar .sidebar__btn--save"
);
if (saveContactBtn) {
  saveContactBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let valid = true;
    // ФИО
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
    // Телефон
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
    // Группа
    const dropdown = document.querySelector<HTMLDivElement>(".custom-dropdown");
    const groupError = document.querySelector<HTMLDivElement>(
      '.error-message[data-for="group"]'
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
    // TODO: логика сохранения контакта
  });
}

// Очистка ошибки при вводе/выборе
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

// Модель контакта
interface Contact {
  id: string;
  name: string;
  phone: string;
}

// Обновляем модель группы
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

// Заполняем дропдаун актуальными группами
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
      selected.classList.remove("placeholder"); // вот здесь
    });
    list.appendChild(li);
  });
}

let deletingGroupId: string | null = null;

// режим редактирования
let editingGroupId: string | null = null;
let editingContactId: string | null = null;

// общая функция открытия панели добавления/редактирования
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
  // Если нет групп, показать сообщение и выйти
  const mainContainer = document.querySelector<HTMLElement>(".main .groups");
  if (groups.length === 0 && mainContainer) {
    mainContainer.innerHTML =
      '<div class="main__empty full">Список контактов пуст</div>';
    return;
  }
  // sidebar
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
        // открыть модалку подтверждения
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
  // main
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
          // удаление контакта
          item
            .querySelector<HTMLButtonElement>(".group__btn--remove")
            ?.addEventListener("click", () => {
              const groups = GroupStorage.getGroups();
              const grp = groups.find((gg) => gg.id === g.id)!;
              grp.contacts = grp.contacts.filter((cc) => cc.id !== c.id);
              GroupStorage.saveGroups(groups);
              renderGroups();
            });
          // обработчик редактирования
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

// Подтверждение удаления группы
modalConfirm?.addEventListener("click", () => {
  if (deletingGroupId) {
    GroupStorage.removeGroup(deletingGroupId);
    renderGroups(); // сразу рендерим — удалённая группа пропадёт
    deletingGroupId = null;
  }
  modalOverlay?.classList.remove("open");
  modal?.classList.remove("open");
});

// Инициализация и первичный рендер
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

// Логика сохранения контакта
saveContactBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  let valid = true;
  // ФИО
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
  // Телефон
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
  // Группа
  const dropdown = document.querySelector<HTMLDivElement>(".custom-dropdown");
  const groupError = document.querySelector<HTMLDivElement>(
    '.error-message[data-for="group"]'
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
  // после успешной валидации — сохранение контакта
  const fio = fioInput!.value.trim();
  const phone = phoneInput!.value.trim();
  const dropdownEl = document.querySelector<HTMLDivElement>(
    ".contact-sidebar .custom-dropdown"
  )!;
  const newGroupId = dropdownEl.dataset.selectedId!;
  const groups = GroupStorage.getGroups();

  if (editingContactId && editingGroupId) {
    // переносим контакт при смене группы
    const oldGroup = groups.find((g) => g.id === editingGroupId)!;
    const idx = oldGroup.contacts.findIndex((c) => c.id === editingContactId);
    if (idx !== -1) {
      const contact = oldGroup.contacts.splice(idx, 1)[0];
      contact.name = fio;
      contact.phone = phone;
      // если группа изменилась — пушим в новую, иначе — обратно в старую
      const targetGroup =
        newGroupId === editingGroupId
          ? oldGroup
          : groups.find((g) => g.id === newGroupId)!;
      targetGroup.contacts.push(contact);
    }
  } else {
    // добавление нового
    const grp = groups.find((g) => g.id === newGroupId)!;
    grp.contacts.push({ id: Date.now().toString(), name: fio, phone });
  }

  GroupStorage.saveGroups(groups);
  renderGroups();
  populateGroupDropdown();

  // сброс режима и закрытие
  editingContactId = null;
  editingGroupId = null;
  const title = contactSidebar?.querySelector<HTMLElement>(".sidebar__title");
  title!.textContent = "Добавление контакта";

  // закрыть и очистить
  contactSidebar?.classList.remove("open");
  overlay?.classList.remove("open");
  fioInput!.value = "";
  phoneInput!.value = "";
  const textSpan = dropdownEl.querySelector<HTMLElement>(
    ".custom-dropdown__text"
  )!;
  textSpan.textContent = "Выберите группу";
  dropdownEl.dataset.selectedId = "";
  dropdownEl.classList.add("placeholder");
});

// Сохранение новых групп из sidebar
const sidebarSaveBtn = document.querySelector<HTMLButtonElement>(
  ".sidebar:not(.contact-sidebar) .sidebar__btn--save"
);
sidebarSaveBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  const sidebarListEl = document.querySelector<HTMLElement>(
    ".sidebar:not(.contact-sidebar) .sidebar__list"
  );
  const inputs =
    sidebarListEl?.querySelectorAll<HTMLInputElement>(
      "input.sidebar__item-name"
    ) || [];
  const groups = GroupStorage.getGroups();
  inputs.forEach((input) => {
    const name = input.value.trim();
    if (name) groups.push({ id: Date.now().toString(), name, contacts: [] });
  });
  GroupStorage.saveGroups(groups);
  renderGroups();
  populateGroupDropdown();
  // закрыть sidebar после сохранения
  sidebar?.classList.remove("open");
  overlay?.classList.remove("open");
});
