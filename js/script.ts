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

addContactBtn?.addEventListener("click", () => {
  // закрыть группы, если открыты
  sidebar?.classList.remove("open");
  // открыть форму добавления
  contactSidebar?.classList.add("open");
  overlay?.classList.add("open");
});

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
