let isCloud = 'cloud'
const radioButtons = document.querySelectorAll('input[name="target"]');
  
radioButtons.forEach(function(radioButton) {
  radioButton.addEventListener('change', function() {
    isCloud = document.querySelector('input[name="target"]:checked').value;
  });
});
const payloadInput = document.getElementById("payload");
const payloadError = document.getElementById("payload-error");
const selectElement = document.getElementById("method");
const parentElement = document.getElementById("parentElementId");

function calculateExpectedTotal() {
  var connectionCount = document.getElementById("connection-count").value || 5; // default value is 5
  var maxConnection = document.getElementById("requester-count").value || 5; // default value is 5
  var pipelining = document.getElementById("pipeline").value || 1; // default value is 1

  var expectedTotal = Number(connectionCount) * Number(maxConnection) * Number(pipelining);

  document.getElementById("expected-requests").textContent = `Expected number of hits: ${expectedTotal}`;
}

window.onload = calculateExpectedTotal;

document.addEventListener("input", calculateExpectedTotal);

let method = "GET";
selectElement.addEventListener("change", function () {
  method = selectElement.value;
});
// Validate JSON payload
payloadInput.addEventListener("input", () => {
  try {
    if(payloadInput.value.length !== 0) {
      JSON.parse(payloadInput.value);
      payloadError.textContent = ""
    } else {
      payloadError.textContent = ""
    }
  } catch (error) {
    payloadError.textContent = error.message;
  }
});

// function addQueryInput() {
//   // Create a new input field for a query parameter
//   var queryInput = document.createElement("div");
//   queryInput.classList.add("query-input");

//   var keyInput = document.createElement("input");
//   keyInput.classList.add("query-key");
//   keyInput.type = "text";
//   keyInput.placeholder = "Key";

//   var valueInput = document.createElement("input");
//   valueInput.classList.add("query-value");
//   valueInput.type = "text";
//   valueInput.placeholder = "Value";

//   var removeButton = document.createElement("button");
//   removeButton.type = "button";
//   removeButton.innerText = "Remove";
//   removeButton.onclick = function() {
//     queryInput.remove();
//   };

//   queryInput.appendChild(keyInput);
//   queryInput.appendChild(valueInput);
//   queryInput.appendChild(removeButton);

//   document.getElementById("query-params").appendChild(queryInput);
// }

// Add more headers
const addHeaderButton = document.getElementById("add-header");
const headersDiv = document.getElementById("headers");
addHeaderButton.addEventListener("click", () => {
  const newHeaderDiv = document.createElement("div");
  newHeaderDiv.innerHTML = `
    <input type="text" name="header-key[]" placeholder="Key">
    <input type="text" name="header-value[]" placeholder="Value">
    <button type="button" class="remove-header-button">-</button>
  `;
  headersDiv.appendChild(newHeaderDiv);

  // Add event listener to remove-header-button inside newHeaderDiv
  const removeHeaderButton = newHeaderDiv.querySelector(
    ".remove-header-button"
  );
  removeHeaderButton.addEventListener("click", () => {
    newHeaderDiv.remove();
  });
});

// Submit form
const form = document.getElementById("benchmark-form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  baseUrl = isCloud == "cloud" ? "http://143.244.145.16:3001" : 'http://localhost:3001';

  const formData = new FormData(form);
  const payload = formData.get("payload");

  // Validate JSON payload
  if (method !== "GET") {
    if (payload.length === 0) {
      payloadError.textContent = "Selected method required payload.";
      return;
    }
    try {
      JSON.parse(payload);
    } catch (error) {
      payloadError.textContent = error.message;
      return;
    }
  }
  // Convert form data to JSON
  const json = {};
  for (const [key, value] of formData.entries()) {
    if (key === "header-key[]" || key === "header-value[]") {
      continue;
    }
    json[key] = value;
  }

  const headers = {};
  const headerKeys = formData.getAll("header-key[]");
  const headerValues = formData.getAll("header-value[]");
  headerKeys.forEach((key, index) => {
    if (key) {
      headers[key] = headerValues[index];
    }
  });
  json.headers = headers;
  parentElement.textContent = "";

  // Send HTTP request
  const response = await fetch(`${baseUrl}/benchmark`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });
  const result = await response.json();
  // if(Object.keys(result).length > 1) {
  //   result = result.data
  //   if(result.includes("generate")) {
  //     result = "You need to set the token first."
  //   }
  // }
  // Create a table element
  const table = document.createElement("table");
  const td = createTableFromObject(result, table);
  parentElement.appendChild(td);
});

function createTableFromObject(result, table) {
  for (const [key, value] of Object.entries(result)) {
    const row = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = key;
    row.appendChild(th);
    const td = document.createElement("td");
    if (typeof value === "object" && !Array.isArray(value)) {
      const nestedTable = document.createElement("table");
      createTableFromObject(value, nestedTable);
      td.appendChild(nestedTable);
    } else if (Array.isArray(value)) {
      const ul = document.createElement("ul");
      value.forEach((val) => {
        const li = document.createElement("li");
        if (typeof val === "object" && !Array.isArray(val)) {
          const nestedTable = document.createElement("table");
          createTableFromObject(val, nestedTable);
          li.appendChild(nestedTable);
        } else {
          li.textContent = val;
        }
        ul.appendChild(li);
      });
      td.appendChild(ul);
    } else {
      td.textContent = value;
    }
    row.appendChild(td);
    table.appendChild(row);
  }
  return table;
}