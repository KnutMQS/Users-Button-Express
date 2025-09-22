const button = document.querySelector("#myButton");
const messageParagraph = document.querySelector("#message");
const jsonDisplay = document.querySelector("#jsonDisplay");
let isVisible = false;

button.addEventListener("click", async () => {
  if (!isVisible) {
    try {
      const response = await fetch("/button-click", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userData = await response.json();
        messageParagraph.textContent = "Data loaded successfully";
        displayUsersInColumns(userData);
        isVisible = true;
        button.textContent = "Hide Users";
      } else {
        messageParagraph.textContent = "Error sending button click to server.";
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      messageParagraph.textContent = "Network error occurred.";
      console.error("Fetch error:", error);
    }
  } else {
    jsonDisplay.innerHTML = "";
    messageParagraph.textContent = "Users hidden";
    isVisible = false;
    button.textContent = "Show Users";
  }
});

function displayUsersInColumns(users) {
  const container = document.createElement("div");
  container.className = "users-container";

  users.forEach((user, index) => {
    const userCard = createUserCard(user, index);
    container.appendChild(userCard);
  });

  jsonDisplay.replaceChildren(container);
}

function createUserCard(user, index) {
  const card = document.createElement("div");
  card.className = "user-card";

  const title = document.createElement("h3");
  title.textContent = `User ${index + 1}`;

  const details = createUserDetailsElement(user);

  card.appendChild(title);
  card.appendChild(details);

  return card;
}

function createUserDetailsElement(user) {
  const details = document.createElement("div");
  details.className = "user-details";

  const fields = [
    { label: "ID", value: user.id },
    { label: "Name", value: user.name },
    { label: "Email", value: user.email },
    { label: "Age", value: user.age },
    { label: "Active", value: user.isActive ? "Yes" : "No" },
    { label: "Roles", value: user.roles.join(", ") },
  ];

  fields.forEach((field) => {
    const row = document.createElement("div");
    row.className = "detail-row";

    const label = document.createElement("span");
    label.className = "label";
    label.textContent = `${field.label}`;

    const value = document.createElement("span");
    value.className = "value";
    value.textContent = field.value;

    row.appendChild(label);
    row.appendChild(value);
    details.appendChild(row);
  });

  return details;
}
