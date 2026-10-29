"use strict";

const form = document.querySelector("#crime-report-form");
const confirmation = document.querySelector("#confirmation-message");
const emailInput = document.querySelector("#email");
const subjectInput = document.querySelector("#subject");

const fieldErrors = new Map([
    ["subject", { field: subjectInput, message: "Enter a subject or report title." }],
    ["crime-type", { field: document.querySelector("#crime-type"), message: "Select a crime type." }],
    ["description", { field: document.querySelector("#description"), message: "Enter a description of the incident." }]
]);

const urlParams = new URLSearchParams(window.location.search);
const personName = urlParams.get("person");
const inquirySubjects = new Map([
    ["field-office", "Question about a local field office"],
    ["media", "Media inquiry"],
    ["records", "Public records request"],
    ["general", "General inquiry"]
]);

if (personName) {
    subjectInput.value = `Information about ${personName.slice(0, 120)}`;
} else {
    const topic = urlParams.get("topic");
    if (topic && inquirySubjects.has(topic)) {
        subjectInput.value = inquirySubjects.get(topic);
    }
}

function getErrorElement(field) {
    return document.querySelector(`#${field.id}-error`);
}

function validateField(field) {
    const errorElement = getErrorElement(field);
    let message = "";

    if (field.required && !field.value.trim()) {
        message = fieldErrors.get(field.id)?.message || "This field is required.";
    } else if (field.id === "crime-type" && !field.value) {
        message = fieldErrors.get(field.id).message;
    } else if (field.type === "email" && field.value.trim() && field.validity.typeMismatch) {
        message = "Enter an email address in a valid format.";
    }

    field.setAttribute("aria-invalid", String(Boolean(message)));
    if (errorElement) {
        errorElement.textContent = message;
    }

    return !message;
}

function validateForm() {
    const fields = [...form.querySelectorAll("input, select, textarea")];
    let firstInvalidField = null;

    fields.forEach(field => {
        if (field.type === "email" && field.value.trim()) {
            field.value = field.value.trim();
        }

        if (!validateField(field) && !firstInvalidField) {
            firstInvalidField = field;
        }
    });

    return { valid: !firstInvalidField, firstInvalidField };
}

form.addEventListener("input", event => {
    confirmation.hidden = true;
    if (event.target.matches("input, select, textarea")) {
        validateField(event.target);
    }
});

form.addEventListener("change", event => {
    confirmation.hidden = true;
    if (event.target.matches("input, select, textarea")) {
        validateField(event.target);
    }
});

form.addEventListener("submit", event => {
    event.preventDefault();
    const result = validateForm();

    if (!result.valid) {
        result.firstInvalidField.focus();
        return;
    }

    confirmation.hidden = false;
    confirmation.focus();
});
