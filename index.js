const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var users = new Array();

app.get("/api/users/:id", (req, res) => {
    const userId = req.params.id;
    // req.query.abc;

    const numberUserId = parseInt(userId);
    if(isNaN(numberUserId)) {
        return res.status(400).json({message: "I am expecting an integer"});
    }

    if (!userId) {
        return res.status(400).json({message: "Please pass in a userId"});
    }

    for (var k = 0; k < users.length; k++) {
        const aUser = users[k];
        if (aUser.id == userId) {
            return res.status(200).json(aUser);
        }
    }

    return res.status(404).json({message: "User not found"});
});

app.post("/api/users", (req, res) => {
    const user = req.body;
    const bodyFirstname = user.firstname;
    const bodyLastname = user.lastname;
    const bodyEmail = user.email;
    const bodyPassword = user.password;

    var errors = [];
    if (!bodyFirstname) {
        errors.push({message: "Invalid firstname"});
        // return res.status(400).json({message: "Invalid firstname"});
    }

    if (!bodyEmail) {
        errors.push({message: "Invalid firstname"});
        // return res.status(400).json({message: "Invalid email"});
    }

    if (errors.length > 0) {
        return res.status(400).json({errorMessages: errors});
    }

    // Functional for loop
    // let foundUser = null;
    // users.forEach((aUser) => {
    //     if (aUser.email === bodyEmail) {
    //         foundUser = aUser;
    //     }
    // });
    // if (foundUser != null) {
    //     return res.status(400).json({message: "User exists with that email"});
    // }

    for (var k = 0; k < users.length; k++) {
        const aUser = users[k];
        if (aUser.email === bodyEmail) {
            return res.status(400).json({message: "User exists with that email"});
        }
    }

    var newUser = {
        id: users.length + 1,
        firstname: bodyFirstname,
        lastname: bodyLastname,
        email: bodyEmail,
        password: bodyPassword
    };

    users.push(newUser);
    res.json(newUser);
});

app.post("/api/auth", (req, res) => {
    res.send("POST Auth api");
});

const PropertyRouter = express.Router();
PropertyRouter.post("/api/properties", (req, res) => {
    res.send("POST Properties api");
});
app.use("/parent", PropertyRouter);
// POST /parent/api/properties

app.listen(3000, () => {
    console.log("Server is running");
});

// const callback = () => {
//     console.log("Server is running");
// };
// app.listen(3000, callback);

// const app2 = express();
// app2.listen(3001, () => console.log("Second server"));