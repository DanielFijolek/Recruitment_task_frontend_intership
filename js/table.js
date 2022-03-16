const fetchUser = async () => {
    try {
        const fetch_data = await fetch(
            `https://randomuser.me/api/?inc=name,nat,registered&results=10`
        );

        const data = await fetch_data.json();
        return data.results;
    } catch (err) {
        console.log(err);
    }
};

const addUserToTable = ({
    nat,
    name: { first, last },
    registered: { date },
}) => {
    const table = document.querySelector("table");
    const tr = document.createElement("tr");
    tr.classList.add("user");
    table.appendChild(tr);

    const tdFirst = document.createElement("td");
    tdFirst.innerHTML = first;
    tr.appendChild(tdFirst);

    const tdLast = document.createElement("td");
    tdLast.innerHTML = last;
    tr.appendChild(tdLast);

    const tdNat = document.createElement("td");
    tdNat.innerHTML = nat;
    tr.appendChild(tdNat);

    const tdDate = document.createElement("td");
    tdDate.innerHTML = new Date(date).toLocaleString();
    tr.appendChild(tdDate);
};

const sortByLastName = () => {
    const users = JSON.parse(localStorage.getItem("users"));
    users.sort((a, b) => {
        const lower_a = a.name.last.toLowerCase();
        const lower_b = b.name.last.toLowerCase();

        if (lower_a < lower_b) {
            return -1;
        }
        if (lower_a > lower_b) {
            return 1;
        }
        return 0;
    });
    const allUsers = document.querySelectorAll(".user");
    allUsers.forEach((e) => {
        e.remove();
    });
    users.forEach((user) => {
        addUserToTable(user);
    });
};

const sortByRegistrationDate = () => {
    const users = JSON.parse(localStorage.getItem("users"));
    users.sort((a, b) => {
        const da = new Date(a.registered.date).getTime();
        const db = new Date(b.registered.date).getTime();
        console.log(da);
        if (da < db) {
            return -1;
        }
        if (db > da) {
            return 1;
        }
        return 0;
    });
    const allUsers = document.querySelectorAll(".user");
    allUsers.forEach((e) => {
        e.remove();
    });
    users.forEach((user) => {
        addUserToTable(user);
    });
};

window.onload = async () => {
    let users = JSON.parse(localStorage.getItem("users"));
    if (!users) {
        users = await fetchUser(10);
        localStorage.setItem("users", JSON.stringify(users));
    }

    users.forEach((user) => {
        addUserToTable(user);
    });
};
