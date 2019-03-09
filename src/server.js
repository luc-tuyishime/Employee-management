import express from 'express';
import contactRouter from './routes/contacts'

const app = express();

app.get('/', (req, res, next) => {
  res.send({ 'message': 'Welcome to the EPIC Email..'});
});


app.use('/api/v2/contacts', contactRouter);


app.use((req, res, next) => {
  const error = new Error('route not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 400);
  res.json({
    status: '400',
    error: error.message,
  });
});


app.listen(process.env.PORT || 8000, () => console.log('Server running on port 8000... '));

export default app;
