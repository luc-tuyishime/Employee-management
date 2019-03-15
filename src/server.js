import express from 'express';
import messageRouter from './routes/messages';
import userRouter from './routes/users';
import draftMessageRouter from './routes/draftMessage';
import groupRouter from './routes/group';
import Auth from './middleware/auth';

const app = express();

app.get('/', (req, res, next) => {
  res.send({ 'message': 'Welcome to the EPIC Email..'});
});


app.use('/api/v2/messages', Auth.verifyToken, messageRouter);
app.use('/api/v2/drafts', Auth.verifyToken, draftMessageRouter);
app.use('/api/v2/groups', Auth.verifyToken, groupRouter);
app.use('/api/v2/users', userRouter);


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
