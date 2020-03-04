function run() {
  const emailElement = document.querySelector('h3[data-test-id="user-title"]');
  const email = emailElement.textContent;
  const emailSearchUrl = `https://admin.chirpbooks.com/admin/users?&email=${email}`;

  const emailLinkElement = document.createElement("a");
  emailLinkElement.href = emailSearchUrl;
  emailLinkElement.target = "_blank";

  wrap(emailElement, emailLinkElement);

  emailElement.style = "color: #3b6ecc; text-decoration: underline;";

  const textContextDiv = document.querySelector(".context-item.user");
  const userIdElement = textContextDiv.lastElementChild;
  const userIdElementText = userIdElement.textContent;
  const userId = userIdElementText.split("CHIRP_")[1];
  const userIdUrl = `https://admin.chirpbooks.com/admin/users/${userId}`;

  const userLinkElement = document.createElement("a");
  userLinkElement.href = userIdUrl;
  userLinkElement.target = "_blank";

  wrap(userIdElement, userLinkElement);

  emailElement.style = "color: #3b6ecc; text-decoration: underline;";
}

function wrap(el, wrapper) {
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}

// this is a hack - it takes variable amounts of time for this page to load
setTimeout(run, 1000);
setTimeout(run, 2000);
setTimeout(run, 5000);
