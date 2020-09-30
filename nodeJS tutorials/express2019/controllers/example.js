/*
  example of file send
*/
module.exports.sendfile =
  (req,res) =>  {
    let options = {
                    root: 'public/',
                    headers: {
                      'x-timestamp': Date.now(),
                      'x-sent': true
                    }
                  };
     res.sendFile('test.txt', options);
 }

/*
  example of file download
*/
module.exports.download =
  (req,res) => res.download('./public/test.txt');
