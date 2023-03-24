const express = require('express');
const app = express();
const cors = require('cors');
const turtleRouter = require("./routes/turtle");
const diaryRouter = require("./routes/diary");
const plantRouter = require("./routes/plant");
const userRouter = require("./routes/user");

app.use(cors());
app.use(express.json());
//server configuration
app.set('port', process.env.PORT || 8080);

app.use('/plant',plantRouter);
app.use('/turtle',turtleRouter);
app.use('/diary',diaryRouter);
app.use('/user',userRouter);
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
})