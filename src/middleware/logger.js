export const log = () => {
  console.log('Hello, the application is running on port 8000..');
};

// middleware for logging request
export const logger = (req, res, next) => {
  console.log(`${new Date()} - ${req.method} Request to ${req.path}`);
  next();
};
