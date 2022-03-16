const fetchUser = async (number_of_users, hide_address) => {
    try {
        let fetch_data = "";
        if (hide_address) {
            fetch_data = await fetch(
                `https://randomuser.me/api/?inc=name,nat,picture,registered&results=${number_of_users}`
            );
        } else {
            fetch_data = await fetch(
                `https://randomuser.me/api/?inc=location,name,nat,picture,registered&results=${number_of_users}`
            );
        }
        const data = await fetch_data.json();
        return data.results;
    } catch (err) {
        console.log(err);
    }
};

const createUserContainer = ({
    nat,
    location: { street: { name: streetName, number }, city } = {
        street: { name: "***", number: "***" },
        city: "***",
    },
    name: { first, last },
    picture: { large },
    registered: { date },
}) => {
    const bodyDiv = document.querySelector("#body");
    const userContainerDiv = document.createElement("div");
    userContainerDiv.classList.add("userContainer");
    bodyDiv.appendChild(userContainerDiv);

    const userTopRowDiv = document.createElement("div");
    userTopRowDiv.classList.add("userTopRow");
    userContainerDiv.appendChild(userTopRowDiv);

    const img = document.createElement("img");
    img.classList.add("picture");
    img.src = large;
    userTopRowDiv.appendChild(img);

    const div = document.createElement("div");
    userTopRowDiv.appendChild(div);

    for (let i = 1; i <= 4; i += 1) {
        const dataContainerDiv = document.createElement("div");
        dataContainerDiv.classList.add("dataContainer");
        dataContainerDiv.id = `dataContainer_${i}`;
        div.appendChild(dataContainerDiv);

        const dataLabelDiv = document.createElement("label");
        dataLabelDiv.classList.add("dataLabel");

        const dataDiv = document.createElement("div");
        dataDiv.classList.add("data");

        if (i === 1) {
            dataLabelDiv.innerHTML = "Name: ";
            dataDiv.id = `name dataLabel_${i}`;
            dataDiv.innerHTML = `${first} ${last}`;
        }
        if (i === 2) {
            dataLabelDiv.innerHTML = "Nationality: ";
            dataDiv.id = `nat dataLabel_${i}`;
            dataDiv.innerHTML = nat;
        }
        if (i === 3) {
            dataLabelDiv.innerHTML = "Address: ";
            dataDiv.id = `address dataLabel_${i}`;
            dataDiv.innerHTML = `${city} ${streetName} ${number}`;
        }
        if (i === 4) {
            dataLabelDiv.innerHTML = "Registry date: ";
            dataDiv.id = `date dataLabel_${i}`;
            dataDiv.innerHTML = `${new Date(date).toLocaleString()}`;
        }

        dataContainerDiv.appendChild(dataLabelDiv);

        dataContainerDiv.appendChild(dataDiv);
    }
};

const getUser = async () => {
    const hide_address_checkbox = document.querySelector("#checkAddress");
    const users = await fetchUser(1, hide_address_checkbox.checked);

    if (document.querySelector(".userContainer")) {
        const userContainer = document.querySelector(".userContainer");
        userContainer.remove();
    }

    users.forEach((user) => {
        createUserContainer(user);
    });
};
