const section = document.querySelector(".citation");
    const loader = document.querySelector(".loader");
    const content = document.querySelector(".citation__content");

    async function fetchQuote() {
      try {
        loader.style.display = "block"; // Show the loader

        const response = await fetch("https://thatsthespir.it/api");
        if (!response.ok) {
          throw new Error("Failed to fetch quote");
        }
        const json = await response.json();

        const picture = document.createElement("img");
        picture.src = json.photo;
        picture.classList.add("citation__photo");
        section.appendChild(picture);

        const quote = document.createElement("p");
        quote.textContent = json.quote;
        quote.classList.add("citation__quote");
        section.appendChild(quote);

        const author = document.createElement("p");
        author.textContent = json.author;
        author.classList.add("citation__author");
        section.appendChild(author);

        const fetchName = (name) => fetch("https://api.agify.io/?name=" + name);
        const name = json.author;
        const test = await fetchName(name);
        const text = await test.json();

        const age = document.createElement("p");
        age.classList.add("citation__age");
        if (text.age === null) {
          // Handle null age case
        } else {
          age.textContent = "Age potentiel " + text.age;
        }
        console.log(text.age);
        section.appendChild(age);

        const button = document.createElement("input");
        button.value = "Refresh";
        button.type = "button";
        button.classList.add("citation__button");
        section.appendChild(button);

        button.addEventListener("click", () => {
          location.reload();
        });

        loader.style.display = "none"; // Hide the loader
        content.style.display = "block"; // Show the content
      } catch (error) {
        console.error(error);
        // Show an error message to the user
        section.innerHTML = '<p class="citation__error">Failed to fetch quote. Please try again later.</p>';
        loader.style.display = "none"; // Hide the loader
        content.style.display = "block"; // Show the content with error message
      }
    }

    fetchQuote();

