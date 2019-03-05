export const apiGetUsers = (req, res, next) => {
  res.send({
    status: 200,
    data: [users]
  });
};
