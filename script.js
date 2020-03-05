// runWithBackoff is sort of a hack - the frontend on this page takes a bit to load, and that time can vary
runWithBackoff(addLinks)
  .then(() => {
    // set up observer to add new links when relevant DOM changes occur
    const observer = new MutationObserver(addLinks);
    const eventContainerNode = document.querySelector("div.primary");
    observer.observe(eventContainerNode, { childList: true });
  })
  .catch(err => console.log(err));

function addLinks() {
  const emailNode = document.querySelector('h3[data-test-id="user-title"]');
  const email = emailNode.textContent;
  const emailSearchUrl = `https://admin.chirpbooks.com/admin/users?&email=${email}`;

  const emailLinkNode = document.createElement("a");
  emailLinkNode.href = emailSearchUrl;
  emailLinkNode.target = "_blank";

  wrap(emailNode, emailLinkNode);

  emailNode.style = "color: #3b6ecc; text-decoration: underline;";

  const textContextDiv = document.querySelector(".context-item.user");
  const userIdNode = textContextDiv.lastElementChild;
  const userIdNodeText = userIdNode.textContent;
  const userId = userIdNodeText.split("CHIRP_")[1];
  const userIdUrl = `https://admin.chirpbooks.com/admin/users/${userId}`;

  const userLinkElement = document.createElement("a");
  userLinkElement.href = userIdUrl;
  userLinkElement.target = "_blank";

  wrap(userIdNode, userLinkElement);

  userIdNode.style = "color: #3b6ecc; text-decoration: underline;";
}

function wrap(el, wrapper) {
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}

function runWithBackoff(callback, retries = 10, delay = 500) {
  return new Promise((resolve, reject) => {
    if (retries < 0) {
      reject();
    }

    try {
      callback();
      resolve();
    } catch (error) {
      pause(delay).then(() => {
        runWithBackoff(callback, retries - 1, delay * 2)
          .then(() => {
            resolve();
          })
          .catch(e => {
            reject();
          });
      });
    }
  });
}

function pause(duration) {
  return new Promise(res => setTimeout(res, duration));
}
