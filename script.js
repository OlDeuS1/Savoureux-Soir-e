// Get the menu content container
const menuContent = document.getElementById("menu-content");

// Fetch JSON data
fetch('menuData.json') // Replace 'menuData.json' with the actual path to your JSON file
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(menuData => {
        menuData.forEach(section => {
            // Create section container
            const sectionContainer = document.createElement("section");
            sectionContainer.classList.add("menu-section");
            sectionContainer.id = section.section.toLowerCase().replace(" ", "-");

            // Add section title
            const sectionTitle = document.createElement("h2");
            sectionTitle.textContent = section.section;
            sectionContainer.appendChild(sectionTitle);

            // Create menu items container
            const itemsContainer = document.createElement("div");
            itemsContainer.classList.add("menu-items");

            // Add items
            section.items.forEach(item => {
                const menuItem = document.createElement("div");
                menuItem.classList.add("menu-item");

                const itemImage = document.createElement("img");
                itemImage.src = item.image;
                itemImage.alt = item.name;

                const itemName = document.createElement("h3");
                itemName.textContent = item.name;

                const itemDescription = document.createElement("p");
                itemDescription.textContent = item.description;

                const itemPrice = document.createElement("span");
                itemPrice.textContent = item.price;

                menuItem.appendChild(itemImage); // Image comes first
                menuItem.appendChild(itemName); // Then the name
                menuItem.appendChild(itemDescription);
                menuItem.appendChild(itemPrice);

                itemsContainer.appendChild(menuItem);
            });

            // Add items container to section
            sectionContainer.appendChild(itemsContainer);

            // Add section to menu content
            menuContent.appendChild(sectionContainer);
        });
    })
    .catch(error => {
        console.error('Error fetching the menu data:', error);
    });

// Generalize smooth scrolling for all anchor links with href starting with "#"
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1); // Remove the '#'
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

