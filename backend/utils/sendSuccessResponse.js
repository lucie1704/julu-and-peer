module.exports = (data, res) => {
  const responseData = data || null;

  res.status(200).json({
    status: 'success',
    data: responseData
  });
}