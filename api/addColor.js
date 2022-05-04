// addColor.js
import { PSDB } from 'planetscale-node';

export default async function handler(req, res) {
  const conn = new PSDB('main', {namedPlaceholders: true});
  const { color, xCoorRatio, yCoorRatio, size } = req.query;
  var colorItem = {
    color: color,
    xCoorRatio: xCoorRatio,
    yCoorRatio: yCoorRatio,
    size: size,
  };

  const [dbResult] = await conn.execute(
    `INSERT INTO colors(color, xCoorRatio, yCoorRatio, size) VALUES( :color, :xCoorRatio, :yCoorRatio, :size)`,
    colorItem
  );

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
  
  colorItem.id = dbResult.insertId
  res.json(colorItem);
}