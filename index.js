const editButton = document.querySelector("#edit-button");
const editableFields = [...document.querySelectorAll("[data-field]")];
const storageKey = "jihane-portfolio-fields-v1";

function updateContactLinks() {
	const email = document.querySelector('[data-field="email"]').textContent.trim();
	const phone = document.querySelector('[data-field="phone"]').textContent.trim();
	const phoneDigits = phone.replace(/\D/g, "");

	document.querySelectorAll("[data-email-link]").forEach((link) => {
		link.href = `mailto:${email}`;
	});
	document.querySelectorAll("[data-phone-link]").forEach((link) => {
		link.href = `tel:+${phoneDigits}`;
	});
}

try {
	const savedFields = JSON.parse(localStorage.getItem(storageKey) ?? "{}");
	for (const field of editableFields) {
		if (typeof savedFields[field.dataset.field] === "string") {
			field.textContent = savedFields[field.dataset.field];
		}
	}
} catch {
	localStorage.removeItem(storageKey);
}

updateContactLinks();
document.querySelector("#current-year").textContent = new Date().getFullYear();

function setEditing(enabled) {
	for (const field of editableFields) {
		field.contentEditable = String(enabled);
		field.spellcheck = enabled;
	}
	editButton.setAttribute("aria-pressed", String(enabled));
	editButton.textContent = enabled ? "Terminer" : "Modifier";
}

editButton.addEventListener("click", () => {
	const isEditing = editButton.getAttribute("aria-pressed") === "true";
	setEditing(!isEditing);
});

document.addEventListener("input", (event) => {
	if (!event.target.closest("[data-field]")) return;

	const savedFields = Object.fromEntries(
		editableFields.map((field) => [field.dataset.field, field.textContent]),
	);
	localStorage.setItem(storageKey, JSON.stringify(savedFields));
	updateContactLinks();
});
