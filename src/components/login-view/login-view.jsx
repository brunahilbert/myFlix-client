import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");

    const handleSubmit = (event) => {
        // this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();

        //     const data = {
        //       Username,
        //       Password
        //     };


        // var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");

        // var raw = JSON.stringify(data);

        // fetch("https://my-movie-box.herokuapp.com/login", {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: raw,
        //     redirect: 'follow'
        //   })
        //   .then((response) => {
        //     console.log(response.ok)
        //           if (response.ok) {
        //             onLoggedIn(Username);
        //           } else {
        //             alert("Login failed");
        //           }
        //         });

        const data = {
            Username: Username,
            Password: Password
        };

        fetch("https://my-movie-box.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    onLoggedIn(data.user, data.token);
                  } else {
                    alert("No such user");
                  }
            })
            .catch((e) => {
                alert("Something went wrong");
            });

    }
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    value={Username}
                    onChange={(e) => setUsername(e.target.value)}
                    minLength="5"
                    required
                />
            </label>
            <label>
                Password:
                <input
                    type="Password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};