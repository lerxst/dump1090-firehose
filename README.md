# dump1090-firehose
A node utility to ingest local dump1090 --net data to Amazon Kinesis Firehose

### Config

Configuration needs to be mapped over from `config.template.json` to `config.json` with the appropriate values filled in.

### Usage

`node index.js`

### Output

Output is an array of dump1090 objects into Amazon Kinesis Firehose.

Example:
```
[{"hex":"ad6bdc","flight":"JBU1323","lat":40.227977,"lon":-74.41477,"altitude":18075,"track":248,"speed":362},{"hex":"ab272e","flight":"N818BA","lat":39.822784,"lon":-74.606542,"altitude":34975,"track":218,"speed":359},{"hex":"aa7864","flight":"FDX1901","lat":40.192657,"lon":-74.982178,"altitude":9750,"track":43,"speed":313},{"hex":"aafca8","flight":"JBU705","lat":39.561264,"lon":-74.853555,"altitude":30250,"track":218,"speed":385}]
[{"hex":"ad6bdc","flight":"JBU1323","lat":40.227977,"lon":-74.41477,"altitude":18075,"track":248,"speed":362},{"hex":"ab272e","flight":"N818BA","lat":39.822784,"lon":-74.606542,"altitude":34975,"track":218,"speed":359},{"hex":"aa7864","flight":"FDX1901","lat":40.192657,"lon":-74.982178,"altitude":9750,"track":43,"speed":313},{"hex":"aafca8","flight":"JBU705","lat":39.561264,"lon":-74.853555,"altitude":30250,"track":218,"speed":385}]
[{"hex":"ad6bdc","flight":"JBU1323","lat":40.226673,"lon":-74.418765,"altitude":18125,"track":248,"speed":363},{"hex":"ab272e","flight":"N818BA","lat":39.820691,"lon":-74.608582,"altitude":35000,"track":218,"speed":360},{"hex":"aa7864","flight":"FDX1901","lat":40.194273,"lon":-74.980191,"altitude":9725,"track":43,"speed":313},{"hex":"aafca8","flight":"JBU705","lat":39.559204,"lon":-74.855586,"altitude":30275,"track":218,"speed":385}]
[{"hex":"ad6bdc","flight":"JBU1323","lat":40.226673,"lon":-74.418765,"altitude":18125,"track":248,"speed":363},{"hex":"ab272e","flight":"N818BA","lat":39.820691,"lon":-74.608582,"altitude":35000,"track":218,"speed":360},{"hex":"aa7864","flight":"FDX1901","lat":40.194273,"lon":-74.980191,"altitude":9725,"track":43,"speed":313},{"hex":"aafca8","flight":"JBU705","lat":39.559204,"lon":-74.855586,"altitude":30275,"track":218,"speed":385}]
[{"hex":"ad6bdc","flight":"JBU1323","lat":40.226673,"lon":-74.418765,"altitude":18125,"track":248,"speed":363},{"hex":"ab272e","flight":"N818BA","lat":39.820691,"lon":-74.608582,"altitude":35000,"track":218,"speed":360},{"hex":"aa7864","flight":"FDX1901","lat":40.194273,"lon":-74.980191,"altitude":9725,"track":43,"speed":313},{"hex":"aafca8","flight":"JBU705","lat":39.559204,"lon":-74.855586,"altitude":30275,"track":218,"speed":385}]
[{"hex":"ad6bdc","flight":"JBU1323","lat":40.226673,"lon":-74.418765,"altitude":18125,"track":248,"speed":363},{"hex":"ab272e","flight":"N818BA","lat":39.820691,"lon":-74.608582,"altitude":35000,"track":218,"speed":360},{"hex":"aa7864","flight":"FDX1901","lat":40.194273,"lon":-74.980191,"altitude":9725,"track":43,"speed":313},{"hex":"aafca8","flight":"JBU705","lat":39.559204,"lon":-74.855586,"altitude":30275,"track":218,"speed":385}]
```

### License
MIT License
