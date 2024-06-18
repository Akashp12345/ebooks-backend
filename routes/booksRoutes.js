const {
      AllBooks,
      AddbookstoFavourite,
      MyFavourite,
      MarkasRead,
    } = require("../controller/booksController");
    
    const bookRoute = require("express").Router();
    
    /**
     * @swagger
     * /api/v1/books/searchbooks/{userid}:
     *   get:
     *     summary: Fetch all books
     *     tags: [Books]
     *     parameters:
     *       - in: path
     *         name: userid
     *         required: false
     *         schema:
     *           type: string
     *         description: The user ID
     *       - in: query
     *         name: search
     *         required: true
     *         schema:
     *           type: string
     *         description: Search query like title, author, or category
     *       - in: query
     *         name: pageNumber
     *         required: false
     *         schema:
     *           type: number
     *         description: Page number
     *     responses:
     *       200:
     *         description: Retrieve all books
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: string
     *                   title:
     *                     type: string
     *                   authors:
     *                     type: array
     *                     items:
     *                       type: string
     *                   category:
     *                     type: array
     *                     items:
     *                       type: string
     *                   publishedDate:
     *                     type: string
     *                   previewLink:
     *                     type: string
     *                   thumbnail:
     *                     type: string
     *                   favourite:
     *                     type: boolean
     *                   readstatus:
     *                     type: boolean
     *                   price:
     *                     type: number
     *                   rating:
     *                     type: number
     *       400:
     *         description: Bad request
     */
    bookRoute.get("/searchbooks/:userid", AllBooks);
    
    /**
     * @swagger
     * /api/v1/books/favourite/{userid}:
     *   post:
     *     summary: Add or remove a book from favourites
     *     tags: [Books]
     *     parameters:
     *       - in: path
     *         name: userid
     *         required: true
     *         schema:
     *           type: string
     *         description: The user ID
     *       - in: body
     *         name: book
     *         required: true
     *         description: The book to add or remove from favourites
     *         schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: string
     *                   title:
     *                     type: string
     *                   authors:
     *                     type: array
     *                     items:
     *                       type: string
     *                   category:
     *                     type: array
     *                     items:
     *                       type: string
     *                   publishedDate:
     *                     type: string
     *                   previewLink:
     *                     type: string
     *                   thumbnail:
     *                     type: string
     *                   favourite:
     *                     type: boolean
     *                   readstatus:
     *                     type: boolean
     *                   price:
     *                     type: number
     *                   rating:
     *                     type: number
     *     responses:
     *       200:
     *         description: Book favourite status updated
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: Book added to favourites
     *       400:
     *         description: Bad request
     */
    bookRoute.post("/favourite/:userid", AddbookstoFavourite);
    
    /**
     * @swagger
     * /api/v1/books/myfavourite/{userid}:
     *   get:
     *     summary: Fetch favourite book list
     *     tags: [Books]
     *     parameters:
     *       - in: path
     *         name: userid
     *         required: true
     *         schema:
     *           type: string
     *         description: The user ID
     *     responses:
     *       200:
     *         description: Retrieve favourite books
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: string
     *                   title:
     *                     type: string
     *                   authors:
     *                     type: array
     *                     items:
     *                       type: string
     *                   category:
     *                     type: array
     *                     items:
     *                       type: string
     *                   publishedDate:
     *                     type: string
     *                   previewLink:
     *                     type: string
     *                   thumbnail:
     *                     type: string
     *                   favourite:
     *                     type: boolean
     *                   readstatus:
     *                     type: boolean
     *                   price:
     *                     type: number
     *                   rating:
     *                     type: number
     *       400:
     *         description: Bad request
     */
    bookRoute.get("/myfavourite/:userid", MyFavourite);
    
    /**
     * @swagger
     * /api/v1/books/markasread/{userid}:
     *   post:
     *     summary: Mark a book as read or unread
     *     tags: [Books]
     *     parameters:
     *       - in: path
     *         name: userid
     *         required: true
     *         schema:
     *           type: string
     *         description: The user ID
     *       - in: body
     *         name: book
     *         required: true
     *         description: The book to mark as read or unread
     *         schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: string
     *                   title:
     *                     type: string
     *                   authors:
     *                     type: array
     *                     items:
     *                       type: string
     *                   category:
     *                     type: array
     *                     items:
     *                       type: string
     *                   publishedDate:
     *                     type: string
     *                   previewLink:
     *                     type: string
     *                   thumbnail:
     *                     type: string
     *                   favourite:
     *                     type: boolean
     *                   readstatus:
     *                     type: boolean
     *                   price:
     *                     type: number
     *                   rating:
     *                     type: number
     *     responses:
     *       200:
     *         description: Book read status updated
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: Book marked as read
     *       400:
     *         description: Bad request
     */
    bookRoute.post("/markasread/:userid", MarkasRead);
    
    module.exports = bookRoute;
    