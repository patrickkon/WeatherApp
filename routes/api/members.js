const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const path = require('path')
// Gets all members:
router.get("/", (req, res) => {
    res.sendFile('src/mainWindow.html' , { root : "./"});
});

// Gets single member:
router.get("/:id", (req, res) => {
  const found = members.some(member => member.id == req.params.id);

  if (found) res.json(members.filter(member => member.id == req.params.id));
  else res.status(400).json({ msg: `No member with the id: ${req.params.id}` });
});

// POST request: Create Member
router.post("/", (req, res) => {
  // res.send(req.body); // resends the request message
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active"
  };
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ message: "Please input name and email!" });
  }
  // Here we insert newMember into database:
  // in this case, our database is simply an array in our script
  // in practice we would use mongoDB etc
  members.push(newMember);

  // return res.status(200); No need as default status code is 200
  return res.json(members); // refresh screen with all updated member list.
});

// Update existing Member:
router.put("/:id", (req, res) => {
  //const found = members.some(function(member){
  //   return member.id === parseInt(req.params.id);
  //});

  const found = members.some(member => member.id == req.params.id);

  if (found) {
    const updMember = req.body;
    members.forEach(member => {
      if (member.id == req.params.id) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;
        res.json({ message: "Member updated", member });
      }
    });
  } else
    res
      .status(400)
      .json({ message: `No member with the id of ${req.params.id}` });
});

// Delete existing member:
router.delete("/:id", (req, res) => {
  const found = members.some(member => member.id == req.params.id);

  if (found) {
    members.splice(
      members.findIndex(member => member.id == req.params.id),
      1
    );
    res.json({ message: "Member deleted", members: members });
  } else
    res
      .status(400)
      .json({ message: `No member with the id of ${req.params.id}` });
});

module.exports = router;
