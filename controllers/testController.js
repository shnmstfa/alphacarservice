const {google} = require('googleapis');
module.exports.test = async function (req, res, next) {
    try {
        const youtube = google.youtube({
            version: 'v3',
            auth: process.env.GOOGLE_API_KEY
          });
          const resp = [];
          const str = 'https://youtube.com/watch?v=';
          await youtube.search.list({
              part: 'id,snippet',
              q: req.query.key,
          }).then(res => {
              console.log(res);
              res.data.items.forEach(element => {
                  var url = str.concat(element.id.videoId);
                  resp.push({
                    url:url
                  });
              });
          })
          .catch(error => {
              console.error(error);
          });;
          res.send({resp});
    }
    catch (error) {
        next(error);
    }
};