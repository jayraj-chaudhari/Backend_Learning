//Writable
//Readable
//Duplex
//Transform

const { createReadStream, createWriteStream } = require("fs");

const readStream = createReadStream("./docs/blog3.txt", {
  encoding: "utf8",
  highWaterMark: 90000,
}); //default 64kb chunk size for streams. You can change the chunk size by passing an options object to the createReadStream and createWriteStream methods. The options object can have a highWaterMark property that specifies the maximum number of bytes to store in the internal buffer before ceasing to read from the underlying resource. The default value is 64 * 1024 (64kb).
const writeStream = createWriteStream("./docs/blog4.txt");

readStream.on("data", (chunk) => {
  console.log("---New Chunk---");
  console.log(chunk);
  writeStream.write("\nNEW CHUNK\n");
  writeStream.write(chunk);
});

//Loads data in chunks, not all at once. This is useful for large files. Streams are event based. The 'data' event is emitted when a chunk of data is available to read. The 'end' event is emitted when there is no more data to read. The 'error' event is emitted when an error occurs while reading or writing data.
//default 64 kb chunk size for streams.
//HighWaterMark controls size.
//We can use events to listen for when data is available to read, when there is no more data to read, and when an error occurs while reading or writing data. This allows us to handle large files efficiently without loading the entire file into memory at once.
readStream.on("end", () => {
  console.log("Finished reading the file.");
  writeStream.end(); //close the write stream when done reading
});
readStream.on("error", (err) => {
  console.log("Error reading the file:", err);
});
writeStream.on("finish", () => {
  console.log("Finished writing to the file.");
});

//Hence directly sending big files as response to the client is not a good idea. Instead, we can use streams to send the file in chunks. This way, we can send the file in smaller pieces, which is more efficient and reduces the risk of running out of memory. We can also use streams to process large files, such as reading a large CSV file and processing each row as it is read, rather than loading the entire file into memory at once.

//ReadStream has a method called pipe() that can be used to pipe the data from the read stream to the write stream. This is a more efficient way to transfer data between streams, as it automatically handles the flow of data and backpressure. The pipe() method can also be used to pipe data from a readable stream to a writable stream, or from a readable stream to a transform stream, or from a transform stream to a writable stream.
readStream.pipe(writeStream);
