import express from 'express';
import morgan from 'morgan';
import userRouter from './routes/users';
import Router from './routes/index';

const app = express();

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('development enabled...');
}

app.get('/', (req, res, next) => {
  res.send({ 'message': 'Welcome to the EPIC Email..'});
});

app.use('/api/v2', Router);

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
