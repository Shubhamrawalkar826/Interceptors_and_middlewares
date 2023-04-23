const express = require('express') //npm install express
const app = express()
const port = 80;
const cors = require("cors");
app.use(express.static('public'))

app.use(cors());
//app.use(bodyParser.json());

const authent = 9335998589

function authmiddleware(req ,res ,next)
{
	let headers = req.headers;
	if(headers.auth)
	{
		let auth = headers.auth;
		if(auth == authent)
		{
		next();
		}
	}
	res.status(401).json({ "Error" : {"errcode ":"401 - Unauthorized access","errormessage":"Login to access the requested resource" }})
}

app.get('/login', (req, res) => {
	console.log(req.query);
	res.send('Hello World!')
})

app.get('/getNumber', (req, res) => {
	console.log(req.query);
	res.send('9335998589')
})

app.get('/getName', authmiddleware, (req, res) => {
	console.log(req.query);
	res.send('Shubham')
})

app.listen(port, () => {
	console.log("server started")
})