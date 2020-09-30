const fs = require('fs');

// class with tools to read header, body (from url path) and footer files
class ContentReader {

  constructor(response) {
    this.response = response;
  }

  /* promisification of fs.readFile, read flie from path and write it to response
  * @param path the path of the file to read
  * @ return a Promise that reads asynchronously the file at 'path'
  *              and resolves once response has been written or reject with the error
  */
  prepareFile(path) {
    return new Promise(
      (resolve, reject) =>
        fs.readFile(path, (error, content) => {
                                                if (error)
                                                  reject(error);
                                                else
                                                  this.response.write(content);
                                                  resolve();
                                              })
    );
  }

  /* end the response */
  end() {
    return Promise.resolve().then( this.response.end() )
  }
  /* handle the error when file not found  */
  error() {
    return this.prepareFile('data/error_html')
  }
}

module.exports = ContentReader;
