const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const cors = require('cors')

const app = express();
const port = 3000;
app.use(express.json())
app.use(cors());


app.get('/boards', async (req, res) => {
    const boards = await prisma.kudoBoard.findMany()
    res.status(200).json(boards);
});

app.post('/boards', async (req, res) => {
    const { title, category, author, imgUrl} = req.body;
    try{
        const giphyResponse = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}`);
        const giphyData = await giphyResponse.json();
        const imageUrl = giphyData.data.images.original.url;

        const newBoard = await prisma.kudoBoard.create({
            data: {
              title,
              category,
              author,
              imgUrl:imageUrl
            }
    })
    res.status(201).json(newBoard);
    }
    catch (error) {
        console.error('Error fetching Giphy data:', error);
        res.status(500).json({ error: 'Failed to create board with Giphy image' });
    }
});

app.get('/boards', async (req, res) => {
    try {
        const boards = await prisma.kudoBoard.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            take: 5
        });
        res.status(200).json(boards);
    } catch (error) {
        console.error('Error fetching boards:', error);
        res.status(500).send('Error fetching boards');
    }
});

app.get('/boards/:id', async (req, res) => {
    const { id } = req.params
    const boards = await prisma.kudoBoard.findUnique(
        {
            where: { id: parseInt(id) },
        });
    res.status(200).json(boards);
});

app.get('/boards/category/:category', async (req, res) => {
    const { category } = req.params;

    try {
        const boards = await prisma.kudoBoard.findMany({
            where: {
                category: category
            }
        });
        res.status(200).json(boards);
    } catch (error) {
        console.error('Error fetching boards:', error);
        res.status(500).send('Error fetching boards');
    }
});
app.get('/boards/search/:title', async (req, res) => {
    const { title } = req.params;
    try {
        const boards = await prisma.kudoBoard.findMany({
            where: {
                title: {
                    contains: title,
                    mode: 'insensitive' // Case-insensitive search
                }
            }
        });
        res.status(200).json(boards);
    } catch (error) {
        console.error('Error searching for boards:', error);
        res.status(500).send('Error searching for boards');
    }
});

app.delete('/boards/:id', async (req, res) => {
    const { id } = req.params
    const deleteBoard = await prisma.kudoBoard.delete(
        {
             where: {id:(parseInt(id))},
        })

    res.status(200).json(deleteBoard);
})

app.post('/boards/:id/cards', async (req, res) => {
    const {id} = req.params;
    const {title, description, upvote,imgUrl, author} = req.body;
    console.log(req.body);
    try {
        const newCard = await prisma.kudoCard.create({
            data: {
                title,
                description,
                imgUrl,
                author,
                upvote,
                board: { connect: { id: parseInt(id) } },

            }
        });
        res.status(201).json(newCard);
    } catch (error) {
        console.error('Error creating card:', error);
        res.status(500).json({ error: 'Failed to create card' });
    }
});

app.get('/boards/:id/cards', async (req, res) => {
    const { id } = req.params;
    try {
        const cards = await prisma.kudoCard.findMany({
            where: { boardId: parseInt(id) },
        });
        res.status(200).json(cards);
    } catch (error) {
        console.error('Error fetching cards:', error);
        res.status(500).send('Error fetching cards');
    }
});

app.delete('/cards/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCard = await prisma.kudoCard.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json(deleteCard);
    } catch (err) {
        console.error('Error deleting card:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/cards/:id/upvote', async (req, res) => {
    const { id } = req.params;
    try {
      const updatedCard = await prisma.kudoCard.update({
        where: { id: parseInt(id) },
        data: {
          upvote: {
            increment: 1
          }
        }
      });
      res.status(200).json(updatedCard);
    } catch (error) {
      console.error('Error upvoting card:', error);
      res.status(500).json({ error: 'Failed to upvote card' });
    }
  });

app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`)
  })
