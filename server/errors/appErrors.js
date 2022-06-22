module.exports = app =>
    app.use((err, req, res, next) => {
        const { status, message } = err;
    
        // errors with status are custom errors
        // handling non custom errors
        if (!status) {
            console.log(err);
            
            return res
                .status(500)
                .json({ success: false, message: 'Something went wrong' });
    }
    
    res.status(status).json({ success: false, message });
  });
