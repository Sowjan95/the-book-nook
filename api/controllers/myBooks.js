const express = require("express");
const router = express.Router();
const passport = require("../middlewares/authentication");
const db = require("../models");
const { MyBook } = db; // after Book API is implemented

// get all mybooks (this can only work with Books not MyBooks)
router.get("/", (req, res) => {
    MyBook.findAll({}).then((allMyBooks) => res.json(allMyBooks));
});

//get all mybooks belonging to user
router.get("/allmybooks", passport.isAuthenticated(), (req, res) => {
  const user = req.user;
  user.getMyBooks().then((allMyBooks) => res.json(allMyBooks));
});

//get mybooks by title 
router.get("/title/:title", (req, res) => {
  const {title}  = req.params;
  MyBook.findAll({
    where:{
      title: title,
    }
  }).then((allMyBooks) => res.json(allMyBooks));
});

//get mybooks by author 
router.get("/author/:author", (req, res) => {
    const {author}  = req.params;
    MyBook.findAll({
      where:{
        author: author,
      }
    }).then((allMyBooks) => res.json(allMyBooks));
  });

//get all mybooks belonging to a category type
// router.get("/:type", async (req, res) => {
//   const {type}  = req.params;
//   let category = await Category.findOne({
//     where:{
//       type: type,
//     }
//   });
//   MyBook.findAll({
//     where:{
//       CategoryId: category.id,
//     }
//   }).then((allMyBooks) => res.json(allMyBooks));
// });


// post a new mybook
// this would have to be changed so that it takes in the information from Book api to populate it's information
// perhaps we would need something else to connect MyBook to the Book api book, such as a unique id
router.post("/", passport.isAuthenticated(),  async (req, res) => {
  let { title, author } = req.body;
  let userId = (req.user).id;

  MyBook.create({ title, author, UserId: userId })
    .then((newMyBook) => {
      (req.user).addMyBook(newMyBook);
      res.status(201).json(newMyBook);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// update mybook
// perhaps update my book can be dateStarted and dateRead, etc. which would need to be added to model
// perhaps shelves can also be it's own model [Read, Want To Read, and Currently Reading]
// router.put("/:id", passport.isAuthenticated(), async (req, res) => {
//     let { title, description, address, date, price, link, type } = req.body;
//     const { id } = req.params;
//     let category = await Category.findOne({
//       where:{
//         type: type,
//       }
//     })
//     MyBook.findByPk(id).then((mybook) => {
//       if (!mybook) {
//         return res.sendStatus(404);
//       }else if(mybook.UserId != (req.user).id){
//         return res.sendStatus(401);
//       }
//       mybook.title = title;
//       mybook.address = address;
//       mybook.description = description;
//       mybook.date = date;
//       mybook.price = price;
//       mybook.link = link;
//       mybook.CategoryId = category.id;
//       mybook
//         .save()
//         .then((updatedMyBook) => {
//           res.json(updatedMyBook);
//         })
//         .catch((err) => {
//           res.status(400).json(err);
//         });
//     });
//   });
  
// delete an mybook
router.delete("/:id", passport.isAuthenticated(), (req, res) => {
  const { id } = req.params;
  MyBook.findByPk(id).then((mybook) => {
    if (!mybook) {
      return res.sendStatus(404);
    }else if(mybook.UserId != (req.user).id){
      return res.sendStatus(401);
    }
    mybook.destroy();
    res.sendStatus(204);
  });
});
module.exports = router;