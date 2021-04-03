
function init(app) {
    app.use((err, req, res, next) => {
        console.error(err);
        if (err.response) {
            res.statusCode = err.response.status;
            res.send({
                header:{
                    isSuccess: false,
                    type:'Error',
                    error:{
                        code: err.response.status,
                        title: err.response.message,
                        message: err.response.statusText
                    }
                },
                body:{

                }
            });
        }
        else {
            res.send({
                header:{
                    isSuccess: false,
                    type:'Error',
                    error:{
                        code: err.code,
                        title: 'Service Error',
                        message: err.message
                    }
                },
                body:{

                }
            });
        }
    });
}

module.exports = init;